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
    this.root = this.attachShadow({ mode: "closed" });
    this.root.innerHTML = /* html */ `
      <style>
        button {
          padding: 0.5em 1em;
          border: 1px solid var(--bg-color, #08c);
          border-radius: var(--radius, 0.25em);
          font-size: var(--size, 1.5em);
          color: var(--color, #fff);
          background-color: var(--bg-color, #08c);
        }
        [aria-live] {
          font-size: var(--msg-size, 1.3125em);
          font-style: var(--msg-style, normal);
          font-weight: var(--msg-weight, normal);
          color: var(--msg-color, inherit);
        }
      </style>
      <p><button type="button"><slot>Roll Dice</slot></button></p>
      <div aria-live="polite"></div>
    `;
  }

  #handleClick = () => {
    const liveRegion = this.root.querySelector("[aria-live]");
    if (!liveRegion) return;

    const [roll] = RollDice.#shuffle(RollDice.#die);
    liveRegion.textContent = `You rolled a ${roll}`;
  };

  connectedCallback() {
    const btn = this.root.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    const btn = this.root.querySelector("button");
    if (!btn) return;
    btn.removeEventListener("click", this.#handleClick);
  }
}
