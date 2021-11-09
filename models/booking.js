const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _copy: {type: mongoose.Schema.ObjectId, ref: 'Copy'},
    _member: {type: mongoose.Schema.ObjectId, ref: 'Member'},
    _date: Date
});

class Booking {

    constructor(copy, member, date) {
        this._copy = copy;
        this._member = member;
        this._date = date;
    }

    get copy() {
        return this._copy;
    _}
    set copy(v) {
        this._copy = v;
    }

    get member() {
        return this._member;
    }
    set member(v) {
        this._member = v;
    }
    
    get date() {
        return this._date;
    }
    set date(v) {
        this._date = v;
    }

}

schema.loadClass(Booking);
module.exports = mongoose.model('Booking', schema);