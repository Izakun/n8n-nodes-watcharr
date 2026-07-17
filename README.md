# n8n-nodes-watcharr

[![npm version](https://img.shields.io/npm/v/n8n-nodes-watcharr.svg)](https://www.npmjs.com/package/n8n-nodes-watcharr)

n8n community node for Watcharr (watchlist tracker) via its API

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-watcharr`.

## Usage example

List watched items:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Watched** (after login→token).
4. Execute the node — example output:

```json
{ "id": 10, "status": "FINISHED", "rating": 9, "content": { "title": "Arcane" } }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
