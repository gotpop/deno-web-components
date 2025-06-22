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
  
  const mediaQuery = window.matchMedia("(width >= 768px)");
  const isDesktop = mediaQuery.matches;
  
  function applyPopover() {
    if (isDesktop) {
      if (menu.hasAttribute("popover")) {
        if (menu.matches(':popover-open')) {
          menu.hidePopover();
        }
        menu.removeAttribute("popover");
      }
    } else {
      menu.setAttribute("popover", "auto");
    }
  }
  
  toggle.addEventListener("click", () => {
    if (menu.hasAttribute("popover") && menu.matches(':popover-open')) {
      menu.hidePopover();
      menu.removeAttribute("popover");
    } else {
      menu.setAttribute("popover", "auto");
      menu.showPopover();
    }
  });


  mediaQuery.addEventListener("change", applyPopover);

  applyPopover(); 
}