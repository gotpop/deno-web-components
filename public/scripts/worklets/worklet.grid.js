if (typeof registerPaint !== "undefined") {
  class J {
    static get inputProperties() {
      return [
        "--root-grid-size",
        "--grid-gap",
        "--grid-base-color",
        "--animation-progress",
        "--stagger-delay",
        "--even-odd",
      ]
    }
    paint(k, q, E) {
      let I = E.get("--grid-base-color").toString().trim() ||
          "rgba(115, 92, 221, 0.4)",
        B = parseInt(E.get("--root-grid-size").toString()) || 16,
        F = q.width % B / 2,
        M = E.get("--even-odd").toString().trim() || "even",
        K = Math.floor((q.width - 2 * F) / B) + 1,
        N = M === "odd" ? 1 : 0
      if (K % 2 !== N) F -= B / 2, K = Math.floor((q.width - 2 * F) / B) + 1
      for (let H = F; H <= q.width; H += B) {
        k.beginPath(),
          k.moveTo(H, 0),
          k.lineTo(H, q.height),
          k.strokeStyle = I,
          k.stroke()
      }
      for (let H = 0; H <= q.height; H += B) {
        k.beginPath(),
          k.moveTo(0, H),
          k.lineTo(q.width, H),
          k.strokeStyle = I,
          k.stroke()
      }
    }
    rgbToRgba(k, q) {
      let E = k.match(/\d+/g)
      if (E === null || E.length !== 3) {
        throw new Error("Invalid RGB color format")
      }
      let [I, B, F] = E.map(Number)
      return `rgba(${I}, ${B}, ${F}, ${q})`
    }
    adjustColorBrightness(k, q) {
      let E = k.match(/\d+/g)
      if (E === null || E.length !== 3) {
        throw new Error("Invalid RGB color format")
      }
      let [I, B, F] = E.map(Number)
      return I = Math.max(0, Math.min(255, Math.round(I * q))),
        B = Math.max(0, Math.min(255, Math.round(B * q))),
        F = Math.max(0, Math.min(255, Math.round(F * q))),
        `rgb(${I}, ${B}, ${F})`
    }
  }
  registerPaint("grid", J)
}
