import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Watcharr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Watcharr',
		name: 'watcharr',
		icon: { light: 'file:watcharr.svg', dark: 'file:watcharr.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Query a Watcharr watchlist tracker through its API',
		defaults: { name: 'Watcharr' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'watcharrApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Profile', value: 'getProfile', action: 'Get the user profile' },
					{ name: 'Get Watched', value: 'getWatched', action: 'Get the watched list' },
				],
				default: 'getWatched',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('watcharrApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;

				// Step 1: log in to obtain a JWT.
				const auth = (await this.helpers.httpRequest({
					method: 'POST' as IHttpRequestMethods,
					baseURL,
					url: '/api/auth/login',
					body: { username: credentials.username, password: credentials.password },
					json: true,
				} as IHttpRequestOptions)) as IDataObject;

				const jwt = auth.token as string;
				if (!jwt) {
					throw new NodeOperationError(this.getNode(), 'Watcharr login did not return a token', {
						itemIndex: i,
					});
				}

				const urlByOp: Record<string, string> = {
					getWatched: '/api/watched',
					getProfile: '/api/profile',
				};

				const response = await this.helpers.httpRequest({
					method: 'GET' as IHttpRequestMethods,
					baseURL,
					url: urlByOp[operation],
					headers: { Authorization: `Bearer ${jwt}` },
					json: true,
				} as IHttpRequestOptions);

				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
