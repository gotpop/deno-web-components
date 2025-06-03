export async function waitForStylesheets(doc) {
  const links = [...doc.getElementsByTagName("link")]
  const stylesheets = links.filter((link) =>
    link.rel === "stylesheet" ||
    (link.rel === "preload" && link.as === "style")
  )

  await Promise.all(
    stylesheets.map((link) => {
      if (link.rel === "preload") {
        link.rel = "stylesheet"
      }
      return link.sheet ? Promise.resolve() : new Promise((resolve) => {
        link.onload = resolve
        link.onerror = resolve // Continue even if style fails
      })
    }),
  )
}
