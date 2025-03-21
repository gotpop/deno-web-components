import {
  handleWebSocketConnection,
  setupFileWatcher,
} from "./live-reload/websocket.ts"

import { green } from "https://deno.land/std@0.220.1/fmt/colors.ts"
import { handlePageRequest } from "./handlers/page-handler.ts"
import { setupNunjucks } from "./nunjucks/config.ts"

const PORT = 8000

const nunjucks = setupNunjucks()

async function handleContact(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const formData = await req.formData()
    const contact = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    console.log("Form submission:", contact)
    console.log("Redirecting to success page...")

    // Add more explicit redirect with better debugging
    const response = new Response(null, {
      status: 303,
      headers: {
        "Location": "/success",
        "Content-Type": "text/html; charset=utf-8",
      },
    })

    console.log("Response headers:", response.headers)
    return response
  } catch (err) {
    console.error("Error:", err)
    return new Response(null, {
      status: 303,
      headers: {
        "Location": "/contact?error=true",
      },
    })
  }
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url)

  if (url.pathname === "/api/contact") {
    return handleContact(req)
  }

  if (
    url.pathname === "/live-reload" &&
    Deno.env.get("ENVIRONMENT") === "development"
  ) {
    return handleWebSocketConnection(req)
  }

  return await handlePageRequest(url, nunjucks)
}

const server = Deno.serve({ port: PORT }, handler)
console.log(green("\nServer running on"), `http://localhost:${PORT}\n`)

// Only setup file watcher in development
if (Deno.env.get("ENVIRONMENT") === "development") {
  setupFileWatcher(["./public", "./src"])

  console.log("Live reload enabled - watching for file changes")
}

// Handle server shutdown
await server
