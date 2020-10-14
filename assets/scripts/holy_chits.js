"use strict";

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
	return Math.ceil(Math.random() * this.sides);
    }

    toString() {
	return "d" + this.sides.toString();
    }
}
