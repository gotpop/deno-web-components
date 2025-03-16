import { aboutData, contactData, homeData } from "../../data/index.ts"

import { green } from "https://deno.land/std@0.220.1/fmt/colors.ts"
import { serveFile } from "../../utils/fileServer.ts"
import { templateConfig } from "../nunjucks/config.ts"

const PUBLIC_DIR = "./public"
const staticDirs = ["scripts", "styles"]

interface PageContext {
  title: string
  currentPage: string
  componentPath: string
}

export async function handlePageRequest(
  url: URL,
  nunjucks: {
    render: (template: string, context: PageContext) => string
  },
): Promise<Response> {
  const pageName = url.pathname.replace("/", "").replace(".html", "")

  // TODO: Check ensure HMR is not used in production
  // TODO: See if there's a way to get rid of this special case
  // Handle Chrome DevTools special requests
  if (url.pathname.startsWith("/.well-known/")) {
    return new Response("Not Found", { status: 404 })
  }

  // Serve static files from public directory
  if (staticDirs.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
    return await serveFile(`${PUBLIC_DIR}${url.pathname}`)
  }

  // Render templates for pages
  try {
    const template = pageName || "index"
    const pageData = template === "contact"
      ? contactData
      : template === "about"
      ? aboutData
      : template === "index"
      ? homeData
      : {}

    const html = nunjucks.render(`${template}.njk`, {
      title: template.charAt(0).toUpperCase() + template.slice(1),
      currentPage: template,
      componentPath: templateConfig.componentPath,
      ...pageData,
    })

    return new Response(html, {
      headers: { "content-type": "text/html" },
    })
  } catch (e) {
    console.error(e)
    return new Response("Not Found", { status: 404 })
  }
}
