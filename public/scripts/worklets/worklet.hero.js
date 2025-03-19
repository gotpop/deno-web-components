if (typeof registerPaint !== "undefined") {
  class i {
    static get inputProperties() {
      return [
        "--bytemare-tile-size",
        "--bytemare-gap",
        "--bytemare-base-color",
        "--animation-progress",
        "--stagger-delay",
      ]
    }
    paint(o, a, t) {
      let e = parseInt(t.get("--bytemare-tile-size")) || 20,
        r = parseInt(t.get("--bytemare-gap")) || 2,
        n = t.get("--bytemare-base-color").toString().trim() ||
          "rgb(115, 92, 221)",
        c = parseFloat(t.get("--animation-progress")) || 0,
        b = parseFloat(t.get("--stagger-delay")) || 0.02,
        l = Math.ceil(a.width / e),
        m = Math.ceil(a.height / e)
      for (let s = 0; s < m; s++) {
        let h = s * e
        for (let g = 0; g < l + 1; g++) {
          let u = g * e - 16,
            d = (g + s) * b,
            y = ((c - d) % 1 + 1) % 1,
            f = g / (l - 1),
            M = s / (m - 1),
            p = (f + M) / 2,
            $ = y,
            w = this.adjustColorBrightness(n, 1 - p),
            R = this.rgbToRgba(w, $)
          o.fillStyle = R, o.fillRect(u + r / 2, h + r / 2, e - r, e - r)
        }
      }
    }
    rgbToRgba(o, a) {
      let t = o.match(/\d+/g)
      if (t === null || t.length !== 3) {
        throw new Error("Invalid RGB color format")
      }
      let [e, r, n] = t.map(Number)
      return `rgba(${e}, ${r}, ${n}, ${a})`
    }
    adjustColorBrightness(o, a) {
      let t = o.match(/\d+/g)
      if (t === null || t.length !== 3) {
        throw new Error("Invalid RGB color format")
      }
      let [e, r, n] = t.map(Number)
      return e = Math.max(0, Math.min(255, Math.round(e * a))),
        r = Math.max(0, Math.min(255, Math.round(r * a))),
        n = Math.max(0, Math.min(255, Math.round(n * a))),
        `rgb(${e}, ${r}, ${n})`
    }
  }
  registerPaint("bytemare", i)
}
