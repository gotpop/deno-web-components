import { AppShell } from "./components/app-shell/app-shell.js";
import { Footer } from "./components/footer/footer.js";
import { GridItem } from "./components/item/item.js";
import { Header } from "./components/header/header.js";
import { Hero } from "./components/hero/hero.js";
import { MainContent } from "./components/main-content/main-content.js";
import { NavItem } from "./components/nav-item/nav-item.js";
import { NavList } from "./components/nav-list/nav-list.js";

const components = [
  ["app-shell", AppShell],
  ["site-header", Header],
  ["nav-list", NavList],
  ["nav-item", NavItem],
  ["site-hero", Hero],
  ["main-content", MainContent],
  ["grid-item", GridItem],
  ["site-footer", Footer],
];

// Register all components
for (const [name, constructor] of components) {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  }
}

if (location.hostname === "localhost") {
  const ws = new WebSocket(`ws://${location.host}/live-reload`);
  ws.onmessage = () => location.reload();
}
