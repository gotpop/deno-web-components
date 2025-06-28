/**
 * Calculate and set scrollbar width CSS custom property
 */
export function setScrollbarWidth() {
  const scrollbarWidth = window.innerWidth -
    document.documentElement.clientWidth
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`,
  )
}
