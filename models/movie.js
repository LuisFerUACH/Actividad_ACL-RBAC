const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _director: {
        type: Map,
        of: String
    },
    _actors: [{type: mongoose.Schema.ObjectId, ref: 'Actor'}],
    _genre: String,
    _title: String
});

class Movie {

    constructor(director, actors, genre, title) {
        this._director = director;
        this._actors = actors;
        this._genre = genre;
        this._title = title;
    }

    get director() {
        return this._director;
    }
    set director(v) {
        this._director = v;
    }

    get actors() {
        return this._actors;
    }
    set actors(v) {
        this._actors = v;
    }
    
    get genre() {
        return this._genre;
    }
    set genre(v) {
        this._genre = v;
    }

    get title() {
        return this._title;
    }
    set title(v) {
        this._title = v;
    }

}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie', schema);
