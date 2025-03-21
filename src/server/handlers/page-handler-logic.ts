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
    templateFile: "features/single.njk",
  }
}
