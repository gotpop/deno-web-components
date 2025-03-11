export function isActive(pageName: string, currentPage: string) {
  return pageName === currentPage ? "active" : null
}
