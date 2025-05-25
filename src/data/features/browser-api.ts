import { Feature } from "./data-types.ts"
import { cssViewTransitions2Feature } from "./css-view-transitions-2.ts"
import { customElementsFeature } from "./custom-elements.ts"
import { popoverApiFeature } from "./popover-api.ts"

export const browserApiFeaturesMap = new Map()

browserApiFeaturesMap.set("custom-elements", customElementsFeature)
browserApiFeaturesMap.set("popover api", popoverApiFeature)
browserApiFeaturesMap.set("css-view-transitions-2", cssViewTransitions2Feature)

export const browserApiFeatures: Feature[] = Array.from(
  browserApiFeaturesMap.values(),
)
