"use strict"

const types = {text: "TEXT", image: "IMAGE", voice: "AUDIO"};

export default class Chat {
  
    constructor(name) {
        this.#type = types[name];
    }

    type() {
        return this.#type;
    }

    process(req, res) {

    }

}