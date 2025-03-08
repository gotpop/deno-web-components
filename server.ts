// Import dependencies
import * as nunjucks from "https://esm.sh/nunjucks@3.2.4";

import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

// Configure Nunjucks
const viewsPath = "./templates";
const env = nunjucks.configure(viewsPath, {
  autoescape: true,
});

// Add a custom filter to import CSS files
env.addFilter("importCss", function (cssFilePath: string) {
  try {
    // Handle relative paths
    const fullPath = cssFilePath.startsWith("/")
      ? cssFilePath
      : join(Deno.cwd(), cssFilePath);

    const css = Deno.readTextFileSync(fullPath);
    return css;
  } catch (error) {
    console.error(`Error importing CSS file ${cssFilePath}:`, error);
    return "/* CSS import failed */";
  }
});

function handler(req: Request): Response {
  const url = new URL(req.url);
  let template = "index.html";

  if (url.pathname !== "/") {
    template = url.pathname.substring(1) + ".html";
  }

  try {
    const html = env.render(template, {
      title: "Deno Web Components",
    });

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Page not found", { status: 404 });
  }
}

console.log("Server starting at http://localhost:8000");
await Deno.serve({ port: 8000 }, handler);
