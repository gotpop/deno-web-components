import {
  aboutData,
  contactData,
  featuresData,
  featuresIndexData,
  homeData,
} from "../../data/index.ts"

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
  const pathParts = url.pathname.replace("/", "").replace(".html", "").split(
    "/",
  )
  const pageName = pathParts[0]
  const subPage = pathParts[1]

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

  // List of valid pages
  const validPages = ["index", "about", "contact", "features"]

  // Check if the page is valid, but allow subpages for features
  if (pageName && !validPages.includes(pageName) && pageName !== "features") {
    return new Response("Not Found", { status: 404 })
  }

  // Render templates for pages
  try {
    const template = pageName || "index"
    let pageData = {}
    let templateFile = `${template}.njk`

    // Handle features pages
    if (template === "features") {
      if (subPage) {
        const feature = featuresData.features.find((f) => f.slug === subPage)
        if (!feature) return new Response("Not Found", { status: 404 })

        pageData = {
          ...featuresData,
          currentFeature: feature,
        }
        templateFile = "features/single.njk"
      } else {
        pageData = featuresData
      }
    } else {
      // Handle other pages as before
      pageData = template === "contact"
        ? contactData
        : template === "about"
        ? aboutData
        : template === "index"
        ? homeData
        : template === "features"
        ? featuresData
        : {}
    }

    const html = nunjucks.render(templateFile, {
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
