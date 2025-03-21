type Layout = {
  columns: number
  rows: number
  "feature-start": number
  "feature-end": number
}

type Link = {
  label: string
  link: string
  type: "spec" | "docs" | "github"
}

export type Feature = {
  layout: Layout
  title: string
  description: string
  slug: string
  links: Link[]
  label?: string
}
