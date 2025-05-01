import { allFeatures } from "./features/index.ts"
export interface Feature {
  id: string
  title: string
  description: string
  slug: string
}

export const featuresData = {
  title: "Features",
  description: "Explore our features",
  features: allFeatures,
}
