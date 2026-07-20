import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WatcharrApi implements ICredentialType {
	name = 'watcharrApi';

	displayName = 'Watcharr API';

	icon = 'file:watcharrApi.svg' as const;

	documentationUrl = 'https://watcharr.app/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://watcharr:3080',
			required: true,
			description: 'Base URL of the Watcharr instance (e.g. http://watcharr:3080). No trailing slash.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/auth/login',
			body: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
		},
	};

	// No transport auth to inject here (handled inside the node); this block
	// lets the node use httpRequestWithAuthentication.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};
}
