const connections = new Set<WebSocket>();

export function handleWebSocketConnection(req: Request): Response {
  const { socket, response } = Deno.upgradeWebSocket(req);
  connections.add(socket);
  socket.onclose = () => connections.delete(socket);
  return response;
}

export function notifyClients(message: string = "reload") {
  for (const socket of connections) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }
}

export function setupFileWatcher(directories: string | string[]) {
  const dirs = Array.isArray(directories) ? directories : [directories];

  dirs.forEach((dir) => {
    const watcher = Deno.watchFs(dir);

    (async () => {
      for await (const event of watcher) {
        if (event.kind === "modify") {
          console.log(`File ${event.paths[0]} modified, reloading clients...`);
          notifyClients();
        }
      }
    })();
  });
}
