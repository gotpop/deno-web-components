export function initMobilePopover() {
  const menu = document.getElementById("main-menu-popover");
  if (!menu) {
    return;
  }

  const mediaQuery = window.matchMedia("(max-width: 767px)");

  function applyPopover() {
    if (mediaQuery.matches) {
      menu.setAttribute("popover", "auto");
    } else {
      menu.removeAttribute("popover");
    }
  }

  applyPopover();
  mediaQuery.addEventListener("change", applyPopover);
}