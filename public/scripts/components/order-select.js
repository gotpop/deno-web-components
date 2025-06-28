function handleOrderChange(selectElement, viewTransitionManager) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  if (selectElement.value) {
    params.set(selectElement.name, selectElement.value)
  } else {
    params.delete(selectElement.name)
  }

  const newUrl = new URL(
    `${url.pathname}?${params.toString()}`,
    window.location.origin,
  )
  
  console.log("[order-select] Order select changed. Navigating to:", newUrl.href)

  if (viewTransitionManager && viewTransitionManager.navigate) {
    viewTransitionManager.navigate(newUrl)
  } else {
    window.location.href = newUrl.href
  }
}

export function initializeOrderSelect(viewTransitionManager) {
  const orderSelect = document.getElementById("order")

  if (orderSelect) {
    orderSelect.addEventListener("change", function () {
      handleOrderChange(this, viewTransitionManager)
    })
  } else {
    console.log("[order-select] Order select element not found on this page.")
  }
}
