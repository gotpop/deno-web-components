async function serveFile(filePath: string): Promise<Response> {
  try {
    const file = await Deno.readFile(filePath);
    const contentType = getContentType(filePath);

    return new Response(file, {
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return new Response("File not found", { status: 404 });
  }
}

function getContentType(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
  };
  return types[ext ?? ""] ?? "text/plain";
}

export { serveFile };
