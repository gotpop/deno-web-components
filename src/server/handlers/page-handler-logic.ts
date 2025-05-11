import {
  aboutData,
  contactData,
  featuresData,
  homeData,
} from "../../data/index.ts"

import type { PageData } from "./page-handler.ts"

export const getPageData = (template: string) =>
  template === "contact"
    ? contactData
    : template === "about"
    ? aboutData
    : template === "index"
    ? homeData
    : template === "features"
    ? featuresData
    : {}

export function handlePaths(url: URL) {
  const pathParts = url.pathname.replace("/", "").replace(".html", "").split(
    "/",
  )
  const pageName = pathParts[0]
  const subPage = pathParts[1]

  return { pageName, subPage }
}

export function handleFeatureTemplate(
  subPage: string | null,
): { pageData: PageData; templateFile: string } {
  if (!subPage) {
    return {
      pageData: featuresData,
      templateFile: "features.njk",
    }
  }

  const feature = featuresData.features.find((feature) =>
    feature.slug === subPage
  )

  if (!feature) {
    throw new Error("Feature not found")
  }

  return {
    pageData: {
      ...featuresData,
      currentFeature: feature,
    },
    templateFile: "feature.njk",
  }
}

export async function loadSiteData() {
  const siteDataPromise = Deno.readTextFile("./src/data/site-data.json")
  const navigationDataPromise = Deno.readTextFile("./src/data/navigation.json")

  const [siteData, navigationData] = await Promise.all([
    siteDataPromise,
    navigationDataPromise,
  ])

  const parsedSiteData = JSON.parse(siteData)
  const parsedNavigationData = JSON.parse(navigationData)

  return {
    siteData: parsedSiteData,
    navigationData: parsedNavigationData,
  }
}
