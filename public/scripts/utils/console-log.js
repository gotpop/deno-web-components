export const log = {
  success: (message) =>
    console.log("%c" + message, "color: #00ff00; font-weight: bold;"),
  error: (message) =>
    console.log("%c" + message, "color: #ff0000; font-weight: bold;"),
  warning: (message) =>
    console.log("%c" + message, "color: #ffa500; font-weight: bold;"),
  info: (message) =>
    console.log("%c" + message, "color: #00bfff; font-weight: bold;"),
  debug: (message) =>
    console.log("%c" + message, "color: #9932cc; font-weight: bold;"),
}
