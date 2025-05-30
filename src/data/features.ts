import { allFeatures } from "./features/index.ts"
export interface Link {
  label: string
  link: string
  type: string
}

export interface BodyMarkup {
  tag: string
  content?: string
  id?: string
  language?: string
  code?: string
  items?: string[]
}

export interface Feature {
  id?: string // Making id optional as it might be part of the [featureName]Feature structure
  title: string
  blurb?: string
  description: string | string[]
  slug: string
  bodyMarkupData?: BodyMarkup[]
  links?: Link[]
  tags?: string[]
  type?: string
  spec?: string
  experimental?: boolean
  status?: string
  // Ensure all properties from individual feature files are covered
  // It seems 'code' (for code examples directly in feature) was missed, adding it.
  code?: string
}

export const featuresData = {
  title: "Features",
  description: "Explore our features",
  features: allFeatures,
}
