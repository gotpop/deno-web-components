export class Hero extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log("Hero component mounted")
  }
}
