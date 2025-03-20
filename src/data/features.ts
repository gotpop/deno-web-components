import { baseFeatures } from "./baseFeatures.ts"
export interface Feature {
  id: string
  title: string
  description: string
  slug: string
}

export const featuresData = {
  title: "Features",
  description: "Explore our features",
  features: baseFeatures,
}

export const featuresDataW3 = {
  title: "Features",
  description: "Explore our features",
  features: [
    {
      title: "CSS Container Queries",
      slug: "container-queries",
      cssFeature: "properties/container", // This should match MDN's API path
      description: "Responsive design at the component level",
    },
  ],
}

// css-contain-3/
