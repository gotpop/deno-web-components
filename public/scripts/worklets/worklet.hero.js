/* bytemare.js */
if (typeof registerPaint !== "undefined") {
  class BytemarePainter {
    static get inputProperties() {
      return [
        "--bytemare-tile-size",
        "--bytemare-gap",
        "--bytemare-base-color",
        "--animation-progress",
        "--stagger-delay",
        "--bytemare-offset-x",
      ]
    }

    paint(ctx, geom, properties) {
      const tileSize = parseInt(properties.get("--bytemare-tile-size")) || 16
      const gap = parseInt(properties.get("--bytemare-gap")) || 1
      const baseColor =
        properties.get("--bytemare-base-color").toString().trim() ||
        "rgb(115, 92, 221)"
      const animationProgress =
        parseFloat(properties.get("--animation-progress")) || 0
      const staggerDelay = parseFloat(properties.get("--stagger-delay")) || 0.02
      // Get optional x offset or default to 8px for grid alignment
      const offsetX = parseInt(properties.get("--bytemare-offset-x")) || 8

      // Calculate number of tiles needed to cover the canvas with overflow
      const geomTileWidth = Math.ceil(geom.width / tileSize) + 4 // More tiles for overflow
      const geomTileHeight = Math.ceil(geom.height / tileSize) + 4 // More tiles for overflow

      // Calculate start positions to center the pattern with offset for grid alignment
      const startX = -tileSize + (geom.width - (geomTileWidth * tileSize)) / 2 +
        offsetX
      const startY = -tileSize // Start above the canvas

      for (let y = 0; y < geomTileHeight; y++) {
        for (let x = 0; x < geomTileWidth; x++) {
          const currentX = startX + (x * tileSize)
          const currentY = startY + (y * tileSize)

          const delay = (x + y) * staggerDelay
          const progress = (((animationProgress - delay) % 1) + 1) % 1

          // Ensure we don't divide by zero for the first tile
          const xFactor = geomTileWidth === 1 ? 0 : x / (geomTileWidth - 1)
          const yFactor = geomTileHeight === 1 ? 0 : y / (geomTileHeight - 1)
          const darknessFactor = (xFactor + yFactor) / 2

          // Ensure minimum opacity so first square is always visible
          const opacity = Math.max(0.1, progress)
          const color = this.adjustColorBrightness(
            baseColor,
            1 - darknessFactor,
          )
          const rgbaColor = this.rgbToRgba(color, opacity)

          ctx.fillStyle = rgbaColor
          ctx.fillRect(
            currentX + gap / 2,
            currentY + gap / 2,
            tileSize - gap,
            tileSize - gap,
          )
        }
      }
    }
    rgbToRgba(rgb, alpha) {
      const rgbValues = rgb.match(/\d+/g)

      if (rgbValues === null || rgbValues.length !== 3) {
        throw new Error("Invalid RGB color format")
      }

      const [r, g, b] = rgbValues.map(Number)

      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    adjustColorBrightness(rgb, factor) {
      const rgbValues = rgb.match(/\d+/g)

      if (rgbValues === null || rgbValues.length !== 3) {
        throw new Error("Invalid RGB color format")
      }

      let [r, g, b] = rgbValues.map(Number)
      r = Math.max(0, Math.min(255, Math.round(r * factor)))
      g = Math.max(0, Math.min(255, Math.round(g * factor)))
      b = Math.max(0, Math.min(255, Math.round(b * factor)))

      return `rgb(${r}, ${g}, ${b})`
    }
  }

  registerPaint("bytemare", BytemarePainter)
}
