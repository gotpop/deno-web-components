import {
  handleWebSocketConnection,
  setupFileWatcher,
} from "./live-reload/websocket.ts";

import { handlePageRequest } from "./handlers/page-handler.ts";
import { setupNunjucks } from "./nunjucks/config.ts";

const PORT = 8000;
const PUBLIC_DIR = "./public";

// Setup Nunjucks with filters
const nunjucks = setupNunjucks();

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // Handle WebSocket connections for live-reload
  if (url.pathname === "/live-reload") {
    return handleWebSocketConnection(req);
  }

  // Handle page requests and static files
  return await handlePageRequest(url, nunjucks);
};

const server = Deno.serve({ port: PORT }, handler);
console.log(`Server running on http://localhost:${PORT}`);

// Setup file watcher for live-reload - now watching both directories
setupFileWatcher(["./public", "./src"]);

// Handle server shutdown
await server;
