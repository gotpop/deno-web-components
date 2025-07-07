const clients = new Set<WebSocket>()

export function handleWebSocketConnection(req: Request): Response {
  const { socket, response } = Deno.upgradeWebSocket(req)

  socket.onopen = () => {
    clients.add(socket)
    console.log("Client connected to live reload")
  }

  socket.onclose = () => {
    clients.delete(socket)
    console.log("Client disconnected from live reload")
  }

  socket.onerror = (e) => {
    console.error("WebSocket error:", e)
    clients.delete(socket)
  }

  return response
}

export async function setupFileWatcher(paths: string[]) {
  const watcher = Deno.watchFs(paths)

  for await (const event of watcher) {
    if (event.kind !== "access") {
      console.log(`File change detected: ${event.paths.join(", ")}`)
      notifyClients()
    }
  }
}

function notifyClients() {
  clients.forEach((socket) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("reload")
    }
  })
}
