export function initMobilePopover() {
  const menu = document.getElementById("main-menu-popover");
  if (!menu) {
    return;
  }

  try {
    window.CSS.registerProperty({
      name: "--is-mobile",
      syntax: "<integer>",
      inherits: true,
      initialValue: "0",
    });
  } catch {
    // Do nothing. This will fail if the property is already registered
    // and that's fine.
  }

  const mediaQuery = window.matchMedia("(max-width: 767px)");

  function applyPopover() {
    if (mediaQuery.matches) {
      menu.setAttribute("popover", "auto");
      document.documentElement.style.setProperty("--is-mobile", "1");
    } else {
      menu.removeAttribute("popover");
      document.documentElement.style.setProperty("--is-mobile", "0");
    }
  }

  applyPopover();
  mediaQuery.addEventListener("change", applyPopover);
}