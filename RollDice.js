class RollDice extends HTMLElement {
  constructor() {
    super();
    const btnText = this.textContent.trim();
    this.innerHTML = /* html */ `
      <p><button type="button">${btnText || "Roll Dice"}</button></p>
      <div aria-live="polite"></div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("roll-dice", RollDice);
}
