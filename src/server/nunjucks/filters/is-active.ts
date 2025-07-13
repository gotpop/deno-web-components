export function isActive(pageName: string, currentPage: string) {
  return `state=${pageName === currentPage ? "active" : "inactive"}`;
}
