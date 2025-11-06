class BigBangComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  // Runs automatically when <big-bang> is added to the DOM
  connectedCallback() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .main-container {
          padding: 20px;
          background-color: black;
          color: white;
          margin: 20px;
          position: relative;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .character {
          position: absolute;
          z-index: 10;
          top: -8rem;
          left: 0;
          font-size: 8rem;
          line-height: 1;
          color: hsla(60, 50%, 80%, 0.25);
          user-select: none;
        }
      </style>
      <div class="main-container">
        <h1>Big Bang Theory</h1>
        <p>It all started with...</p>
      </div>
    `;
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);

    // Render attributes that might already exist in HTML
    if (this.hasAttribute("character")) {
      this.updateCharacter(this.getAttribute("character"));
    }
    if (this.hasAttribute("color")) {
      this.updateColor(this.getAttribute("color"));
    }
  }

  // Declare which attributes to observe
  static get observedAttributes() {
    return ["character", "color"];
  }

  // Attribute → Property Sync
  get character() {
    return this.getAttribute("character");
  }
  set character(value) {
    this.setAttribute("character", value);
  }

  get color() {
    return this.getAttribute("color");
  }
  set color(value) {
    this.setAttribute("color", value);
  }

  // Runs automatically when attributes change
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "character") this.updateCharacter(newVal);
    if (attrName === "color") this.updateColor(newVal);
  }

  // Update Character Overlay
  updateCharacter(value) {
    const div = this.root.querySelector(".main-container");
    let p = div.querySelector(".character");
    if (!p) {
      p = document.createElement("p");
      p.className = "character";
      div.appendChild(p);
    }
    p.textContent = value;
  }

  // Update Color Styling
  updateColor(value) {
    const div = this.root.querySelector(".main-container");
    div.style.backgroundColor = value; // you can change this to text color if you prefer
  }
}

customElements.define("big-bang", BigBangComponent);