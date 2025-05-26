import { browserApiFeatures } from "./browser-api.ts"
import { cssFeaturesMap } from "./css.ts"
import { cssomFeatures } from "./css-object-model.ts"

export * from "./browser-api.ts"
export * from "./css.ts"
export * from "./css-object-model.ts"

export const allFeatures = [
  ...browserApiFeatures,
  ...Array.from(cssFeaturesMap.values()),
  ...cssomFeatures,
]
