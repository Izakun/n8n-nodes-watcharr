<img src="nodes/Watcharr/watcharr.svg" width="90" align="right" alt="Watcharr" />

# n8n-nodes-watcharr

[![npm version](https://img.shields.io/npm/v/n8n-nodes-watcharr.svg)](https://www.npmjs.com/package/n8n-nodes-watcharr)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-watcharr.svg)](https://www.npmjs.com/package/n8n-nodes-watcharr)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-watcharr.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **Watcharr**. It lets you automate
Watcharr directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**Watcharr**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-watcharr`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Get Profile** | Get the user profile |
| **Get Watched** | Get the watched list |

## Authentication

This node uses the **Watcharr API** credential. In n8n, go to **Credentials → New**, pick
**Watcharr API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://watcharr:3080` (no trailing slash).
- **Username** — your account username.
- **Password** — your account password.

The node signs in with your username/password automatically on each run.

**Where to find it:** See the service documentation: https://watcharr.app/

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Watcharr** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Watcharr API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Watcharr](https://watcharr.app/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
