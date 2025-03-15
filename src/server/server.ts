import { handlePageRequest } from "./handlers/page-handler.ts";
import { setupFileWatcher } from "./live-reload/websocket.ts";
import { setupNunjucks } from "./nunjucks/config.ts";

const PORT = 8000;

const nunjucks = setupNunjucks();

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // if (
  //   url.pathname === "/live-reload" &&
  //   Deno.env.get("ENVIRONMENT") === "development"
  // ) {
  //   return handleWebSocketConnection(req);
  // }

  return await handlePageRequest(url, nunjucks);
};

const server = Deno.serve({ port: PORT }, handler);
console.log(`Server running on http://localhost:${PORT}`);

// setupFileWatcher(["./public", "./src"]);

// Handle server shutdown
await server;
