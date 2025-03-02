import { configure } from "https://esm.sh/nunjucks@3.2.4";
import { serveFile } from "./utils/fileServer.ts";

const PORT = 8000;
const PUBLIC_DIR = "./public";
const TEMPLATES_DIR = "./templates";
const connections = new Set<WebSocket>();

// Configure Nunjucks
const nunjucks = configure(TEMPLATES_DIR, {
  autoescape: true,
  noCache: true, // Disable cache for development
});

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (url.pathname === "/live-reload") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    connections.add(socket);
    socket.onclose = () => connections.delete(socket);
    return response;
  }

  const staticDirs = ["scripts", "styles"];
  const pageName = url.pathname.replace("/", "").replace(".html", "");

  // Serve static files from public directory
  if (staticDirs.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
    return await serveFile(`${PUBLIC_DIR}${url.pathname}`);
  }

  // Render templates for pages
  try {
    const template = pageName || "index";
    const html = nunjucks.render(`${template}.njk`, {
      title: template.charAt(0).toUpperCase() + template.slice(1),
      currentPage: template,
    });

    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  } catch (e) {
    console.error(e);
    return new Response("Not Found", { status: 404 });
  }
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
