const Booking = require('../models/booking');

function create(req, res, next) {
    const {
        copy,
        member,
        date
    } = req.body;

    let booking = new Booking({
        copy: copy,
        member: member,
        date: date
    });

    booking.save().then(obj => res.status(200).json({
        message: 'boooking creada bien bien',
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo almacenar el booking',
        objs: err
    }));
}

function list(req, res, next) {
    Booking.find().populate('_member _copy').then(objs => res.status(200).json({
        message: 'Bookings del sistema',
        objs: objs
    })).catch(err => res.status(500).json({
        message: 'No se pudieron encontrar los bookings del sistema',
        objs: err
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Booking.findOne({'_id':id}).populate('_member _copy').then(obj => res.status(200).json({
        message: `Booking del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo encontrar el booking del sistema',
        objs: err
    }));    
}

function edit(req, res, next) {
    const id = req.params.id;
    const booking = new Object();

    const {
        copy,
        member,
        date
    } = req.body;

    if(copy){
        booking._copy = copy;
    }
    
    if(member){
        booking._member = member;
    }

    if(date){
        booking._date = date;
    }

    Booking.findOneAndUpdate({"_id":id}, booking).then(
        obj=>res.status(200).json({
            message: 'booking modificado Correctamente',
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
        copy,
        member,
        date
    } = req.body;

    let booking = new Object({
        _copy: copy,
        _member: member,
        _date: date
    });

    Booking.findOneAndReplace({'_id':id}, booking).then(obj => res.status(200).json({
        message: `Se remplazo el booking del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo reemplazar el booking`,
        objs: err
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Booking.remove({'_id':id}).then(obj => res.status(200).json({
        message: `Se elimino el booking del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo encontrar el booking`,
        objs: err
    })); 
}

module.exports = {
    create, list, index, edit, replace, destroy
}
