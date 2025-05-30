import {
  getPageData,
  handleFeatureTemplate,
  handlePaths,
} from "./page-handler-logic.ts"

import type { Feature } from "../../data/features.ts"
import { loadSiteData } from "./page-handler-logic.ts"
import { serveFile } from "../../utils/fileServer.ts"
import { templateConfig } from "../nunjucks/config.ts"

const PUBLIC_DIR = "./public"
const STATIC_DIRS = ["fonts", "images", "scripts", "styles"]

interface PageContext {
  title: string
  currentPage: string
  componentPath: string
}

type FeatureData = Feature & {
  slug: string
  tags: string[]
  [key: string]: unknown
}

export type PageData = {
  features?: FeatureData[]
  [key: string]: unknown
}

type NunjucksRenderer = {
  render: (template: string, context: PageContext & PageData) => string
}

const { siteData, navigationData } = await loadSiteData()

export async function handlePageRequest(
  url: URL,
  nunjucks: NunjucksRenderer,
): Promise<Response> {
  const { pageName, subPage } = handlePaths(url)

  if (STATIC_DIRS.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
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
        const filter = url.searchParams.get("filter")
        const orderParam = url.searchParams.get("order") // Get the order parameter from URL
        const currentOrder = orderParam || "asc" // Default to "asc" if orderParam is null/empty

        const {
          pageData: featureDataFromHandler,
          templateFile: featureTemplateFile,
        } = await handleFeatureTemplate(subPage)

        let featuresToDisplay = featureDataFromHandler.features

        if (filter) {
          featuresToDisplay = featuresToDisplay?.filter((feature) => {
            return feature.tags.includes(filter)
          })
        }

        // Sort features based on currentOrder
        if (featuresToDisplay) {
          featuresToDisplay.sort((a, b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()

            if (currentOrder === "asc") {
              if (titleA < titleB) return -1
              if (titleA > titleB) return 1
            } else { // currentOrder must be "desc"
              if (titleA > titleB) return -1
              if (titleA < titleB) return 1
            }
            return 0
          })
        }

        pageData = {
          ...featureDataFromHandler,
          features: featuresToDisplay,
          orderQuery: currentOrder, // Pass the defaulted currentOrder to the template
        }
        templateFile = featureTemplateFile
      } catch (_error) {
        console.error(`Error handling /features route: ${_error}`)
        return new Response("Not Found", { status: 404 })
      }
    } else {
      pageData = getPageData(template)
    }

    const context = {
      title: template.charAt(0).toUpperCase() + template.slice(1),
      currentPage: template,
      componentPath: templateConfig.componentPath,
      ...pageData,
      siteData,
      navigationData,
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
