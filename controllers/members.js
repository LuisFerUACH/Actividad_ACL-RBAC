const Member = require('../models/member');

function create(req, res, next) {
    const lastName = req.body.lastName;
    const name = req.body.name;
    const phone = req.body.phone;
    const status = req.body.status;

    const city = req.body.city;
    const country = req.body.country;
    const number = req.body.number;
    const state = req.body.state;
    const street = req.body.street;

    const address = new Object({
        _city: city,
        _country: country,
        _number: number,
        _state: state,
        _street: street
    });

    let member = new Member({
        address: address,
        lastName: lastName,
        name: name,
        phone: phone,
        status: status,
    });

    member.save().then(obj => res.status(200).json({
        message: 'Miembro creado correctamente',
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo almacenar el miembro',
        objs: err
    }));
}

function list(req, res, next) {
    Member.find().then(objs => res.status(200).json({
        message: 'Miembros del sistema',
        objs: objs
    })).catch(err => res.status(500).json({
        message: 'No se pudieron encontrar los miembros del sistema',
        objs: err
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Member.findOne({'_id':id}).then(obj => res.status(200).json({
        message: `Miembro del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo encontrar el miembro del sistema',
        objs: err
    }));    
}

async function edit(req, res, next) {
    const id = req.params.id;
    const member = await Member.findOne({'_id':id});

    const lastName = req.body.lastName;
    const name = req.body.name;
    const phone = req.body.phone;
    const status = req.body.status;

    const city = req.body.city;
    const country = req.body.country;
    const number = req.body.number;
    const state = req.body.state;
    const street = req.body.street;

    if(lastName){
        member._lastName = lastName;
    }
    
    if(name){
        member._name = name;
    }

    if(phone){
        member._phone = phone;
    }
    
    if(status){
        member._status = status;
    }

    if(city){
        member._address.set('_city', city);
    }

    if(country){
        member._address.set('_country', country);
    }

    if(number){
        member._address.set('_number', number);
    }

    if(state){
        member._address.set('_state', state);
    }

    if(street){
        member._address.set('_street', street);
    }

    member.save().then(obj => res.status(200).json({
        message: `Miembro del sistema con id ${id} se ha modificado`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: 'No se pudo modificar los atributos del miembro del sistema',
        objs: err
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    const lastName = req.body.lastName ? req.body.lastName : '';
    const name = req.body.name ? req.body.name : '';
    const phone = req.body.phone ? req.body.phone : ''; 
    const status = req.body.status ? req.body.status : object.status; 

    const city = req.body.city ? req.body.city : '';
    const country = req.body.country ? req.body.country : '';
    const number = req.body.number ? req.body.number : '';
    const state = req.body.state ? req.body.state : '';
    const street = req.body.street ? req.body.street : '';

    const address = new Object({
        _city: city,
        _country: country,
        _number: number,
        _state: state,
        _street: street
    });

    let member = new Object({
        _address: address,
        _lastName: lastName,
        _name: name,
        _phone: phone,
        _status: status,
    });
    Member.findOneAndReplace({'_id':id}, member).then(obj => res.status(200).json({
        message: `Se remplazo el miembro del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo reemplazar el miembro`,
        objs: err
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Member.remove({'_id':id}).then(obj => res.status(200).json({
        message: `Se elimino el miembro del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo eliminar el miembro`,
        objs: err
    })); 
}

module.exports = {
    create, list, index, edit, replace, destroy
}
