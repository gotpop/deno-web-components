import { serveFile } from "./utils/fileServer.ts";

const PORT = 8000;
const PUBLIC_DIR = "./public";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let filePath: string;

  if (url.pathname === "/" || url.pathname === "/index.html") {
    filePath = `${PUBLIC_DIR}/index.html`;
  } else if (
    url.pathname.startsWith("/scripts/") ||
    url.pathname.startsWith("/styles/")
  ) {
    filePath = `${PUBLIC_DIR}${url.pathname}`;
  } else {
    return new Response("Not Found", { status: 404 });
  }

  return await serveFile(filePath);
}

await Deno.serve({ port: PORT }, handler);
console.log(`Server running on http://localhost:${PORT}`);
