const express = require('express');
const Actor = require('../models/actor');

function list(req, res, next) {
    Actor.find().then(
        objs=>res.status(200).json({
            message: 'Lista de actores del sistema',
            obj: objs
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo consultar la informacion de los actores',
            obj: ex
        })
    );
}

function index(req, res, next) {
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(
        obj=>res.status(200).json({
            message: `Actores almacenado con Id ${id}`,
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo consultar la informacion del actores',
            obj: ex
        })
    );
}

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name:name,
        lastName:lastName
    });
    
    actor.save().then(
        obj=>res.status(200).json({
            message: 'Actor creado Correctamente',
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo',
            obj: ex
        })
    );
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name:name,
        _lastName:lastName
    });
    

    Actor.findOneAndUpdate({"_id":id}, actor).then(
        obj=>res.status(200).json({
            message: 'Actor reemplazado Correctamente',
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo modificar',
            obj: ex
        })
    );
}

function edit(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();
    if(name){
        actor._name = name;
    }
    if(lastName){
        actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id}, actor).then(
        obj=>res.status(200).json({
            message: 'Actor modificado Correctamente',
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo modificar',
            obj: ex
        })
    );
}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.remove({"_id":id}).then(
        obj=>res.status(200).json({
            message: 'Actor eliminado Correctamente',
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo eliminar',
            obj: ex
        })
    );
}

module.exports = {
    list,
    index,
    create,
    replace,
    edit,
    destroy
}
