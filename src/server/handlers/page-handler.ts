import { serveFile } from "../../utils/fileServer.ts";
import { templateConfig } from "../nunjucks/config.ts";

const PUBLIC_DIR = "./public";
const staticDirs = ["scripts", "styles"];

export async function handlePageRequest(
  url: URL,
  nunjucks: any
): Promise<Response> {
  const pageName = url.pathname.replace("/", "").replace(".html", "");

  // Serve static files from public directory
  if (staticDirs.some((dir) => url.pathname.startsWith(`/${dir}/`))) {
    return await serveFile(`${PUBLIC_DIR}${url.pathname}`);
  }

  // Render templates for pages
  try {
    const template = pageName || "index";
    const html = nunjucks.render(`${template}.njk`, {
      title: template.charAt(0).toUpperCase() + template.slice(1),
      currentPage: template,
      componentPath: templateConfig.componentPath,
    });

    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  } catch (e) {
    console.error(e);
    return new Response("Not Found", { status: 404 });
  }
}
