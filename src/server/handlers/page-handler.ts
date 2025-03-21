import {
  getPageData,
  handleFeatureTemplate,
  handlePaths,
} from "./page-handler-logic.ts"

import { serveFile } from "../../utils/fileServer.ts"
import { templateConfig } from "../nunjucks/config.ts"

const PUBLIC_DIR = "./public"
const staticDirs = ["scripts", "styles"]

interface PageContext {
  title: string
  currentPage: string
  componentPath: string
}

type FeatureData = {
  slug: string
  [key: string]: unknown
}

export type PageData = {
  features?: FeatureData[]
  [key: string]: unknown
}

type NunjucksRenderer = {
  render: (template: string, context: PageContext & PageData) => string
}

export async function handlePageRequest(
  url: URL,
  nunjucks: NunjucksRenderer,
): Promise<Response> {
  const { pageName, subPage } = handlePaths(url)

  if (staticDirs.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
    return await serveFile(`${PUBLIC_DIR}${url.pathname}`)
  }

  const validPages = ["about", "contact", "features", "index", "success"]
  const isInvalidPage = pageName && !validPages.includes(pageName)

  if (isInvalidPage) {
    return new Response("Not Found", { status: 404 })
  }

  try {
    const template = pageName || "index"
    let pageData: PageData = {}
    let templateFile = `${template}.njk`

    if (template === "features") {
      try {
        const { pageData: featureData, templateFile: featureTemplate } =
          handleFeatureTemplate(subPage)

        pageData = featureData
        templateFile = featureTemplate
      } catch (_error) {
        return new Response("Not Found", { status: 404 })
      }
    } else {
      pageData = getPageData(template)
      // console.log("pageData :", pageData)
    }

    const context = {
      title: template.charAt(0).toUpperCase() + template.slice(1),
      currentPage: template,
      componentPath: templateConfig.componentPath,
      ...pageData,
    }

    const html = nunjucks.render(templateFile, context)

    return new Response(html, {
      headers: { "content-type": "text/html" },
    })
  } catch (e) {
    console.error(e)
    return new Response("Not Found", { status: 404 })
  }
}
