# 21st.dev connection

Codex has a global MCP server named `21st` at `https://21st.dev/api/mcp`, available to the AmplifyIQ workspace and website folder.

The connection reads its bearer token from `API_KEY_21ST`, saved in the current Windows user's environment. The key is not included in the website or repository. Fully quit and reopen Codex after changing this variable so its process inherits the current value.

`codex mcp get 21st` verifies configuration. An authenticated MCP initialization returned HTTP 200 and server name `21st` on 25 September 2026. The former project-scoped `twentyfirst` entries were removed to avoid duplicate connections.

Use the integration for component discovery and design references when requested. The website uses plain HTML/CSS/JavaScript; adapt selected components to this architecture or discuss a migration when a requested component needs React. Connecting does not itself change the website or request paid generation.
