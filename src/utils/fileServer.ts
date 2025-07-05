async function serveFile(filePath: string): Promise<Response> {
  try {
    const file = await Deno.readFile(filePath)
    const contentType = getContentType(filePath)

    return new Response(file, {
      headers: {
        "content-type": contentType,
      },
    })
  } catch (error) {
    // Add error logging
    console.error(`Error serving file: ${filePath}`, error)
    return new Response("File not found", { status: 404 })
  }
}

function getContentType(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase()
  ext === ".woff2" && console.log("ext :", ext)

  const types: Record<string, string> = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    woff: "font/woff",
    woff2: "font/woff2",
  }

  return types[ext ?? ""] ?? "text/plain"
}

export { serveFile }
