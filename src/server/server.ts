import {
  handleWebSocketConnection,
  setupFileWatcher,
} from "./live-reload/websocket.ts";

import { green } from "https://deno.land/std@0.220.1/fmt/colors.ts";
import { handlePageRequest } from "./handlers/page-handler.ts";
import { setupNunjucks } from "./nunjucks/config.ts";

const PORT = 8000;

const nunjucks = setupNunjucks();

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  if (
    url.pathname === "/live-reload" &&
    Deno.env.get("ENVIRONMENT") === "development"
  ) {
    return handleWebSocketConnection(req);
  }

  return await handlePageRequest(url, nunjucks);
};

const server = Deno.serve({ port: PORT }, handler);
console.log(green("\nServer running on"), `http://localhost:${PORT}\n`);

// Only setup file watcher in development
if (Deno.env.get("ENVIRONMENT") === "development") {
  setupFileWatcher(["./public", "./src"]);

  console.log("Live reload enabled - watching for file changes");
}

// Handle server shutdown
await server;
