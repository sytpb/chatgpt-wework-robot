"use strict"

const types = {text: "TEXT", image: "IMAGE", voice: "AUDIO"};

export default class Chat {
    #type = null;
    constructor(name) {
        this.#type = types[name];
    }

    type() {
        return this.#type;
    }

    process(xml, res) {

    }

}