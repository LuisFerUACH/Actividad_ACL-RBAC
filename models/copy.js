const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _movie: {type: mongoose.Schema.ObjectId, ref: 'Movie'},
    _format: String,
    _number: Number,
    _status: Boolean
});

class Copy {

    constructor(format, movie, number, status) {
        this._format = format;
        this._movie = movie;
        this._number = number;
        this._status = status;
    }

    get format() {
        return this._format;
    }
    set format(v) {
        this._format = v;
    }

    get movie() {
        return this._movie;
    }
    set movie(v) {
        this._movie = v;
    }
    
    get number() {
        return this._number;
    }
    set number(v) {
        this._number = v;
    }

    get status() {
        return this._status;
    }
    set status(v) {
        this._status = v;
    }

}

schema.loadClass(Copy);
module.exports = mongoose.model('Copy', schema);
