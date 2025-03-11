import { configure } from "https://esm.sh/nunjucks@3.2.4"
import { serveFile } from "../utils/fileServer.ts"

export const PUBLIC_DIR = "./public"
const connections = new Set<WebSocket>()
const nunjucks = configure("templates", { autoescape: true })

export const createHandler = ({ componentPath }: { componentPath: string }) => {
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url)

    if (url.pathname === "/live-reload") {
      const { socket, response } = Deno.upgradeWebSocket(req)
      connections.add(socket)
      socket.onclose = () => connections.delete(socket)
      return response
    }

    const staticDirs = ["scripts", "styles"]
    const pageName = url.pathname.replace("/", "").replace(".html", "")

    // Serve static files from public directory
    if (staticDirs.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
      return await serveFile(`${PUBLIC_DIR}${url.pathname}`)
    }

    // Render templates for pages
    try {
      const template = pageName || "index"
      const html = nunjucks.render(`${template}.njk`, {
        title: template.charAt(0).toUpperCase() + template.slice(1),
        currentPage: template,
        componentPath,
      })

      return new Response(html, {
        headers: { "content-type": "text/html" },
      })
    } catch (e) {
      console.error(e)
      return new Response("Not Found", { status: 404 })
    }
  }
}
