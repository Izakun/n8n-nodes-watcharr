import { ICredentialType, INodeProperties } from 'n8n-workflow';

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
}
