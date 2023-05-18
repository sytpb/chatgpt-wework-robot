
export default class Session {
    
    static session = null;
    static _cache = null;
    
    static {
        this.session = new Map();
        this._cache = new this();
    }
    /*singleton*/
    constructor() {
        return this.constructor._cache;
    }

    invoke() {};

    static push(id, item) {

        const list = this.session.get(id);
        if(!list) {
            this.session.set(id, [item]);
        } else {
            list.push(item);
        }
    }

    static shift(id) {

        const list = this.session.get(id);
        if(list.length === 4) {
            list.shift();
        }
    }

    static update(id, item) {

        this.push(id, item);
        this.shift(id);
        return this.session.get(id);
    }

    static get(id) {

        return this.session.get(id);
    }
}