"use strict";

class RNG {
    /* Return [0,max).
     */
    static between(max) {
	return Math.floor(Math.random() * max);
    }

    /* Return [min,max].
     */
    static betweenInclusively(min, max) {
	return RNG.between(max) + min;
    }
}

Array.prototype.sample = function() {
    return this[RNG.between(this.length)];
};

class Die {
    static d100 = new Die(100);
    static  d20 = new Die(20);
    static  d12 = new Die(12);
    static  d10 = new Die(10);
    static   d8 = new Die(8);
    static   d6 = new Die(6);
    static   d4 = new Die(4);

    constructor(sides) {
	this.sides = sides;
    }

    roll() {
	return RNG.between(this.sides) + 1;
    }

    toString() {
	return "d" + this.sides.toString();
    }

    render(templateElement) {
	var node = templateElement.content.cloneNode(true);
	node.querySelector(".roll").textContent = this.roll();
	return node;
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    const rollElement = document.querySelector("#rolls");
    const rollTemplate = document.querySelector("#roll-template");

    const U = new URL(document.URL);
    var p = new URLSearchParams(U.search);
    var d = new Die(p.has("d") ? p.get("d") : 20);

    for (let i = 0; i < 200; i++) {
	rollElement.appendChild(d.render(rollTemplate));
    }
});

document.getElementById("die-selector").addEventListener("change", (event) => {
    const rollElement = document.querySelector("#rolls");
    const rollTemplate = document.querySelector("#roll-template");
    let die = new Die(event.target.value);

    Array.from(rollElement.children).forEach(roll => {
	roll.remove();
    });

    for (let i = 0; i < 200; i++) {
	rollElement.appendChild(die.render(rollTemplate));
    }
});
