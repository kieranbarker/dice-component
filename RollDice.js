export default class RollDice extends HTMLElement {
  static #die = [1, 2, 3, 4, 5, 6];

  /**
   * Randomly shuffle an array.
   * https://stackoverflow.com/a/2450976/1293256
   * @param {any[]} array The array to shuffle.
   * @returns {any[]} The shuffled array.
   */
  static #shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  constructor() {
    super();
    const btnText = this.textContent.trim();
    this.innerHTML = /* html */ `
      <p><button type="button">${btnText || "Roll Dice"}</button></p>
      <div aria-live="polite"></div>
    `;
  }

  #handleClick = () => {
    const liveRegion = this.querySelector("[aria-live]");
    if (!liveRegion) return;

    const [roll] = RollDice.#shuffle(RollDice.#die);
    liveRegion.textContent = `You rolled a ${roll}`;
  };

  connectedCallback() {
    const btn = this.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    const btn = this.querySelector("button");
    if (!btn) return;
    btn.removeEventListener("click", this.#handleClick);
  }
}
