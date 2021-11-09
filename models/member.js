const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _address: {
        type: Map,
        of: String
    },
    _lastName: String,
    _name: String,
    _phone: String,
    _status: Boolean,
});

class Member {

    constructor(address, lastName, name, phone, status) {
        this._address = address;
        this._lastName = lastName;
        this._name = name;
        this._phone = phone;
        this._status = status;
    }

    get address() {
        return this._address;
    }
    set address(v) {
        this._address = v;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(v) {
        this._lastName = v;
    }
    
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }

    get phone() {
        return this._phone;
    }
    set phone(v) {
        this._phone = v;
    }

    get status() {
        return this._status;
    }
    set status(v) {
        this._status = v;
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Member', schema);
