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
      ]
    }

    paint(ctx, geom, properties) {
      const tileSize = parseInt(properties.get("--bytemare-tile-size")) || 20
      const gap = parseInt(properties.get("--bytemare-gap")) || 2
      const baseColor =
        properties.get("--bytemare-base-color").toString().trim() ||
        "rgb(115, 92, 221)"
      const animationProgress =
        parseFloat(properties.get("--animation-progress")) || 0
      const staggerDelay = parseFloat(properties.get("--stagger-delay")) || 0.02

      const geomTileWidth = Math.ceil(geom.width / tileSize)
      const geomTileHeight = Math.ceil(geom.height / tileSize)

      for (let y = 0; y < geomTileHeight; y++) {
        const yOffset = y * tileSize

        for (let x = 0; x < geomTileWidth + 1; x++) {
          const xOffset = x * tileSize - 16

          const delay = (x + y) * staggerDelay
          const progress = (((animationProgress - delay) % 1) + 1) % 1

          const xFactor = x / (geomTileWidth - 1)
          const yFactor = y / (geomTileHeight - 1)
          const darknessFactor = (xFactor + yFactor) / 2

          const opacity = progress
          const color = this.adjustColorBrightness(
            baseColor,
            1 - darknessFactor,
          )
          const rgbaColor = this.rgbToRgba(color, opacity)

          ctx.fillStyle = rgbaColor
          ctx.fillRect(
            xOffset + gap / 2,
            yOffset + gap / 2,
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
