class RollDice extends HTMLElement {
  static #dice = {
    d2: [1, 2],
    d4: [1, 2, 3, 4],
    d6: [1, 2, 3, 4, 5, 6],
    d8: [1, 2, 3, 4, 5, 6, 7, 8],
    d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    d20: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
  };

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

  #die;

  constructor() {
    super();

    const size = this.getAttribute("size");
    const btnText = this.textContent.trim();

    this.#die = RollDice.#dice[size];
    this.innerHTML = /* html */ `
      <p><button type="button">${btnText || "Roll Dice"}</button></p>
      <div aria-live="polite"></div>
    `;
  }

  #handleClick = () => {
    const liveRegion = this.querySelector("[aria-live]");
    if (!liveRegion) return;

    const [roll] = RollDice.#shuffle(this.#die ?? RollDice.#dice.d6);
    liveRegion.textContent = `You rolled: ${roll}`;
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

if ("customElements" in window) {
  customElements.define("roll-dice", RollDice);
}
