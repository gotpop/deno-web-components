export const initLiveReload = () => {
  let reconnectAttempts = 0
  const maxReconnectAttempts = 5

  function connectWebSocket() {
    if (window.location.hostname !== "localhost") return

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      const host = window.location.host
      const socket = new WebSocket(`${protocol}//${host}/live-reload`)

      socket.addEventListener("open", () => {
        reconnectAttempts = 0
      })

      socket.addEventListener("message", (event) => {
        if (event.data === "reload") {
          window.location.reload()
        }
      })

      socket.addEventListener("close", () => {
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++
          setTimeout(connectWebSocket, 3000)
        }
      })

      socket.addEventListener("error", () => {
        // Silent error handling
      })
    } catch (err) {
      // Silent error handling
    }
  }

  connectWebSocket()
}
