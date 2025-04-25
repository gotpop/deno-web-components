export function isActive(pageName: string, currentPage: string) {
  return pageName === currentPage ? "data-active" : null
}
