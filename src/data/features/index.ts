import { browserApiFeatures } from "./browser-api.ts"
import { cssFeatures } from "./css.ts"
import { cssomFeatures } from "./css-object-model.ts"

export * from "./browser-api.ts"
export * from "./css.ts"
export * from "./css-object-model.ts"

export const allFeatures = [
  ...browserApiFeatures,
  ...cssFeatures,
  ...cssomFeatures,
]
