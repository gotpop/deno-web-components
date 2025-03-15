if (location.hostname === "localhost") {
  const connectWebSocket = () => {
    const ws = new WebSocket(`ws://${location.host}/live-reload`)

    ws.onmessage = () => location.reload()

    ws.onerror = (error) => {
      console.warn("WebSocket error:", error)
    }

    ws.onclose = () => {
      console.log("WebSocket closed, attempting to reconnect...")
      setTimeout(connectWebSocket, 1000)
    }
  }

  connectWebSocket()
}
