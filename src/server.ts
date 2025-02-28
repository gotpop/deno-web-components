import { serveFile } from "./utils/fileServer.ts";

const PORT = 8000;
const PUBLIC_DIR = "./public";
const connections = new Set<WebSocket>();

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (url.pathname === "/live-reload") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    connections.add(socket);
    socket.onclose = () => connections.delete(socket);
    return response;
  }

  let filePath: string;

  const staticPages = ["", "index", "about", "contact"];
  const staticDirs = ["scripts", "styles"];

  const pageName = url.pathname.replace("/", "").replace(".html", "");

  if (staticPages.includes(pageName)) {
    filePath = `${PUBLIC_DIR}/${pageName || "index"}.html`;
  } else if (staticDirs.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
    filePath = `${PUBLIC_DIR}${url.pathname}`;
  } else {
    return new Response("Not Found", { status: 404 });
  }

  return await serveFile(filePath);
}

const server = Deno.serve({ port: PORT }, handler);
console.log(`Server running on http://localhost:${PORT}`);

// Watch for file changes - removed conditional to always watch in development
const watcher = Deno.watchFs("./public");
(async () => {
  for await (const event of watcher) {
    if (event.kind === "modify") {
      console.log(`File ${event.paths[0]} modified, reloading clients...`);
      for (const socket of connections) {
        socket.send("reload");
      }
    }
  }
})();

// Handle server shutdown
await server;
