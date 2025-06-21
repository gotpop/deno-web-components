export function initMobilePopover() {
  const menu = document.getElementById("main-menu-popover");
  const toggle = document.getElementById("header-toggle");
  if (!menu || !toggle) {
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
    if (!mediaQuery.matches) {
      menu.hidePopover();
      document.documentElement.style.setProperty("--is-mobile", "0");
      menu.removeAttribute("popover");
    }
  }
  
  toggle.addEventListener("click", () => {
    if (!menu.hasAttribute("popover")) {
      menu.setAttribute("popover", "auto");
    }

    if (mediaQuery.matches) {
      console.log('menu :', menu);
      console.log('toggle :', toggle);
      menu.showPopover();
      document.documentElement.style.setProperty("--is-mobile", "1");
    } else {
      menu.hidePopover();
      document.documentElement.style.setProperty("--is-mobile", "0");
      menu.removeAttribute("popover");
    }

  });

  mediaQuery.addEventListener("change", applyPopover);
  applyPopover(); // Ensure cleanup is executed on initialization if needed
}