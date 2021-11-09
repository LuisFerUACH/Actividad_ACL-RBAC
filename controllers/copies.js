const Copy = require('../models/copy');

function create(req, res, next) {
    const {
        format,
        movie,
        number,
        status
    } = req.body;

    let copy = new Copy({
        format: format,
        movie: movie,
        number: number,
        status: status
    });

    copy.save().then(obj => res.status(200).json({
        message: 'copia creada bien bien',
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo almacenar la copia',
        objs: err
    }));
}

function list(req, res, next) {
    Copy.find().populate('_movie').then(objs => res.status(200).json({
        message: 'Copias del sistema',
        objs: objs
    })).catch(err => res.status(500).json({
        message: 'No se pudieron encontrar las copias del sistema',
        objs: err
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findOne({'_id':id}).populate('_movie').then(obj => res.status(200).json({
        message: `Copia del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo encontrar la copia del sistema',
        objs: err
    }));    
}

function edit(req, res, next) {
    const id = req.params.id;
    const copy = new Object();

    const {
        format,
        movie,
        number,
        status
    } = req.body;

    if(format){
        copy._format = format;
    }
    
    if(movie){
        copy._movie = movie;
    }

    if(number){
        copy._number = number;
    }

    if(status){
        copy._status = status;
    }
    

    Copy.findOneAndUpdate({"_id":id}, copy).then(
        obj=>res.status(200).json({
            message: 'Copia modificada Correctamente',
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo modificar',
            obj: ex
        })
    );
}

function replace(req, res, next) {
    const id = req.params.id;
    const {
        format,
        movie,
        number,
        status
    } = req.body;

    let copy = new Object({
        _format: format,
        _movie: movie,
        _number: number,
        _status: status
    });

    Copy.findOneAndReplace({'_id':id}, copy).then(obj => res.status(200).json({
        message: `Se remplazo la copia del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo reemplazar la copia`,
        objs: err
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.remove({'_id':id}).then(obj => res.status(200).json({
        message: `Se elimino la copia del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo copia la peli`,
        objs: err
    })); 
}

module.exports = {
    create, list, index, edit, replace, destroy
}
