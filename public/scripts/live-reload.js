export const initLiveReload = () => {
  let reconnectAttempts = 0
  const maxReconnectAttempts = 5
  const reconnectDelay = 3000
  const debug = true
  let socket = null

  // Capture and suppress Chrome runtime errors
  const originalOnError = window.onerror
  window.onerror = (message, source, lineno, colno, error) => {
    if (
      message.includes("runtime.lastError") ||
      message.includes("receiving end does not exist")
    ) {
      return true // Prevents the error from bubbling up
    }
    return originalOnError?.(message, source, lineno, colno, error)
  }

  function log(...args) {
    if (debug) console.log("[LiveReload]:", ...args)
  }

  function cleanupSocket() {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.close()
    }
    if (socket) {
      socket.removeEventListener("open", handleOpen)
      socket.removeEventListener("message", handleMessage)
      socket.removeEventListener("close", handleClose)
      socket.removeEventListener("error", handleError)
      socket = null
    }
  }

  function handleOpen() {
    log("Connected successfully")
    reconnectAttempts = 0
  }

  function handleMessage(event) {
    log("Received message:", event.data)
    if (event.data === "reload") {
      log("Reloading page...")
      window.location.reload()
    }
  }

  function handleClose() {
    log(
      `Connection closed. Attempt ${
        reconnectAttempts + 1
      } of ${maxReconnectAttempts}`,
    )
    cleanupSocket()

    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++
      setTimeout(connectWebSocket, reconnectDelay)
    } else {
      log("Max reconnection attempts reached")
    }
  }

  function handleError(error) {
    // Completely suppress all WebSocket errors
    error.preventDefault?.()
    error.stopPropagation?.()
    return true // Prevents error from propagating
  }

  function connectWebSocket() {
    if (window.location.hostname !== "localhost") {
      log("Live reload disabled: Not running on localhost")
      return
    }

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      const host = window.location.host
      const wsUrl = `${protocol}//${host}/live-reload`

      cleanupSocket()
      socket = new WebSocket(wsUrl)

      log("Attempting connection to:", wsUrl)

      socket.addEventListener("open", handleOpen)
      socket.addEventListener("message", handleMessage)
      socket.addEventListener("close", handleClose)
      socket.addEventListener("error", handleError, true) // Using capture phase
    } catch (err) {
      log("Failed to establish connection")
    }
  }

  connectWebSocket()

  // Cleanup on page unload
  window.addEventListener("unload", cleanupSocket)

  // Return cleanup function
  return () => {
    window.onerror = originalOnError
    cleanupSocket()
    window.removeEventListener("unload", cleanupSocket)
  }
}
