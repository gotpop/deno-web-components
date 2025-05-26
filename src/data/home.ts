import { allFeatures } from "./features/index.ts"

const filteredFeaturesBrowserApi = allFeatures.filter((feature) =>
  feature.tags.includes("browser-api")
)

const filteredFeaturesCss = allFeatures.filter((feature) =>
  feature.tags.includes("css")
)

const filteredFeaturesCssom = allFeatures.filter((feature) =>
  feature.tags.includes("cssom")
)

export const homeData = {
  features: {
    browserApiFeatures: filteredFeaturesBrowserApi,
    cssFeatures: filteredFeaturesCss,
    cssomFeatures: filteredFeaturesCssom,
  },
}
