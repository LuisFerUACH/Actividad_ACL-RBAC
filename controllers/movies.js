const Movie = require('../models/movie');

function create(req, res, next) {
    const {
        genre,
        tilte,
        directorName,
        directorLastName,
        actors
    } = req.body;

    const director = new Object({
        _name: directorName,
        _lastName: directorLastName
    });

    let movie = new Movie({
        genre: genre,
        tilte: tilte,
        director: director,
        actors: actors
    });

    movie.save().then(obj => res.status(200).json({
        message: 'Pelicula creado correctamente',
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo almacenar la pelicula',
        objs: err
    }));
}

function list(req, res, next) {
    Movie.find().populate('_actors').then(objs => res.status(200).json({
        message: 'Peliculas del sistema',
        objs: objs
    })).catch(err => res.status(500).json({
        message: 'No se pudieron encontrar las peliculas del sistema',
        objs: err
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findOne({'_id':id}).populate('_actors').then(obj => res.status(200).json({
        message: `Pelicula del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo encontrar la pelicula del sistema',
        objs: err
    }));    
}

async function edit(req, res, next) {
    const id = req.params.id;
    const movie = await Movie.findOne({'_id':id});

    const {
        genre,
        title,
        directorName,
        directorLastName,
        actors,
    } = req.body;

    if(genre){
        movie._genre = genre;
    }
    
    if(title){
        movie._title = title;
    }

    if(directorName){
        movie._director.set('_name', directorName);
    }
    
    if(directorLastName){
        movie._director.set('_lastName', directorLastName);
    }

    if(actors){
        movie._actors = actors;
    }
    

    movie.save().then(obj => res.status(200).json({
        message: `Miembro del sistema con id ${id} se ha modificado`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo modificar los atributos del miembro del sistema',
        objs: err
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    const {
        genre,
        title,
        directorName,
        directorLastName,
        actors,
    } = req.body;

    const director = new Object({
        _name: directorName,
        _lastName: directorLastName
    });

    let movie = new Object({
        _genre: genre,
        _title: title,
        _director: director,
        _actors: actors
    });

    Movie.findOneAndReplace({'_id':id}, movie).then(obj => res.status(200).json({
        message: `Se remplazo el miembro del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo reemplazar el miembro`,
        objs: err
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.remove({'_id':id}).then(obj => res.status(200).json({
        message: `Se elimino la peli del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo eliminar la peli`,
        objs: err
    })); 
}

module.exports = {
    create, list, index, edit, replace, destroy
}
