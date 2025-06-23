export function initMobilePopover() {
  const menu = document.getElementById("main-menu-popover")
  const toggle = document.getElementById("header-toggle")

  if (!menu || !toggle) {
    return
  }

  try {
    window.CSS.registerProperty({
      name: "--is-mobile",
      syntax: "<integer>",
      inherits: true,
      initialValue: "0",
    })
  } catch {
    // Do nothing. This will fail if the property is already registered
    // and that's fine.
  }

  const mediaQuery = window.matchMedia("(width >= 1024px)")

  function isPopover() {
    return menu.hasAttribute("popover")
  }

  function isPopoverOpen() {
    return menu.matches(":popover-open")
  }

  function openPopover() {
    menu.setAttribute("popover", "auto")
    menu.showPopover()
  }

  function closePopover() {
    if (isPopoverOpen()) menu.hidePopover()

    menu.removeAttribute("popover")
  }

  function applyPopover() {
    const isDesktop = mediaQuery.matches
    if (isDesktop && isPopover()) {
      closePopover()
      return
    }
    if (!isDesktop) {
      menu.setAttribute("popover", "auto")
      addClickListenerIfNeeded()
    }
  }

  function handleToggleClick() {
    if (isPopover() && isPopoverOpen()) {
      closePopover()
    } else {
      openPopover()
    }
  }

  function isElementVisible(element) {
    const styles = window.getComputedStyle(element)
    return styles.display !== "none" && styles.visibility !== "hidden" &&
      styles.opacity !== "0"
  }

  function addClickListenerIfNeeded() {
    if (
      isElementVisible(toggle) &&
      !toggle.hasAttribute("data-click-listener-added")
    ) {
      toggle.addEventListener("click", handleToggleClick)
      toggle.setAttribute("data-click-listener-added", "true")
    }
  }

  mediaQuery.addEventListener("change", applyPopover)

  applyPopover()
}
