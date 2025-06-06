import { tetrisLayout } from "./shared.js"

if (typeof registerPaint !== "undefined") {
  class TetrisGridPainter {
    static get inputProperties() {
      return [
        "--square-color",
        "--square-position-x",
        "--square-position-y",
      ]
    }

    static get inputArguments() {
      return [
        "<length>", // blockSize
      ]
    }

    paint(ctx, geom, properties, args) {
      // Get the base color or use a default
      const baseColor = properties.get("--square-color").toString().trim() ||
        "rgba(115, 92, 221, 0.12)"

      // Get position properties or default to top left (0,0)
      const posX = parseInt(properties.get("--square-position-x").toString()) ||
        0
      const posY = parseInt(properties.get("--square-position-y").toString()) ||
        0

      // Block size for our Tetris grid - using argument or default to 32px
      const blockSize = args && args[0] ? parseInt(args[0].toString()) : 32

      // Define Tetris shapes as relative coordinates
      const tetrisShapes = [
        // I shape
        {
          blocks: [[0, 0], [1, 0], [2, 0], [3, 0]],
          color: "rgba(0, 240, 240, 0.12)",
        },
        // O shape
        {
          blocks: [[0, 0], [1, 0], [0, 1], [1, 1]],
          color: "rgba(240, 240, 0, 0.12)",
        },
        // T shape
        {
          blocks: [[0, 0], [1, 0], [2, 0], [1, 1]],
          color: "rgba(160, 0, 240, 0.12)",
        },
        // L shape
        {
          blocks: [[0, 0], [0, 1], [0, 2], [1, 2]],
          color: "rgba(240, 160, 0, 0.12)",
        },
        // J shape
        {
          blocks: [[1, 0], [1, 1], [1, 2], [0, 2]],
          color: "rgba(0, 0, 240, 0.12)",
        },
        // S shape
        {
          blocks: [[1, 0], [2, 0], [0, 1], [1, 1]],
          color: "rgba(0, 240, 0, 0.12)",
        },
        // Z shape
        {
          blocks: [[0, 0], [1, 0], [1, 1], [2, 1]],
          color: "rgba(240, 0, 0, 0.12)",
        },
      ]

      // Function to apply rotation to blocks
      function rotateBlock(x, y, rotation) {
        switch (rotation) {
          case 0: // 0 degrees
            return [x, y]
          case 1: // 90 degrees
            return [y, -x]
          case 2: // 180 degrees
            return [-x, -y]
          case 3: // 270 degrees
            return [-y, x]
          default:
            return [x, y]
        }
      }

      // Draw the Tetris layout
      for (const piece of tetrisLayout) {
        const shape = tetrisShapes[piece.shape]
        ctx.fillStyle = shape.color

        // Get max dimensions of the shape to calculate offset for rotation
        let maxX = 0, maxY = 0
        for (const [x, y] of shape.blocks) {
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        }

        // Draw each block in the shape
        for (const [blockX, blockY] of shape.blocks) {
          // Apply rotation
          let [rotX, rotY] = rotateBlock(blockX, blockY, piece.rotation)

          // Apply offset based on rotation to keep piece roughly in the same area
          if (piece.rotation === 1) { // 90 degrees
            rotX += maxY
          } else if (piece.rotation === 2) { // 180 degrees
            rotX += maxX
            rotY += maxY
          } else if (piece.rotation === 3) { // 270 degrees
            rotY += maxX
          }

          ctx.fillRect(
            posX + (piece.x + rotX) * blockSize,
            posY + (piece.y + rotY) * blockSize,
            blockSize,
            blockSize,
          )
        }
      }
    }
  }

  registerPaint("tetris-grid", TetrisGridPainter)
}
