// Feature ordering based on the allFeatures array from features/index.ts
const FEATURE_ORDER = [
  "css-anchor-position-1",
  "css-mixins",
  "css-paint-api",
  "css-properties-values-api",
  "css-typed-om",
  "css-values-5",
  "custom-elements",
  "css-view-transitions-2",
  "popover-api",
]

export function extractPageIndexFromPath(pathname) {
  // Handle main pages with a base index
  if (pathname === "/" || pathname === "/index") return 0
  if (pathname === "/about") return 100
  if (pathname === "/contact") return 200
  if (pathname === "/features") return 300
  if (pathname === "/test") return 350

  // Handle individual feature pages
  const featureMatch = pathname.match(/^\/features\/(.+)$/)
  if (featureMatch) {
    const featureSlug = featureMatch[1]
    const featureIndex = FEATURE_ORDER.indexOf(featureSlug)
    // Features start at index 400 to avoid conflicts with main pages
    return featureIndex !== -1 ? 400 + featureIndex : 999
  }

  return 999 // Unknown pages get highest index
}

export { FEATURE_ORDER }
