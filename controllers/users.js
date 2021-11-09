const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');


const User = require('../models/user');
const userAblility = require('../models/userAbility');
const adminAbility = require('../models/adminAbility')
const Profile = require('../models/profile');
const Permission = require('../models/permission');
const { forEach } = require('mongoose/lib/helpers/specialProperties');



async function list(req, res, next) {
  let id = req.body.id;
  let user = await User.findOne({"_id":id});
  let profilePermissions;
  let allow = false;
  user = JSON.parse(JSON.stringify(user))
  user._profiles.forEach(async(profileId) => {
      profilePermissions = await Profile.findOne({"_id":profileId});
      profilePermissions = JSON.parse(JSON.stringify(profilePermissions))._permissions;
      console.log(profilePermissions)
      profilePermissions.forEach(async(permissionId) => {
          let read = await Permission.findOne({"_id":permissionId});
          read = JSON.parse(JSON.stringify(read))._type;
          console.log(read);
          if(read == "READ"){
              User.find().then(
                  objs=>res.status(200).json({
                      message: 'Lista de actores del sistema',
                      obj: objs
                  })
              )
          }
      })
  })}


function index(req, res, next) {
    const id = req.params.id;
    User.findOne({"_id":id}).then(
        obj=>res.status(200).json({
            message: `user almacenado con Id ${id}`,
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo consultar la informacion del usuarios',
            obj: ex
        })
    );
}

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const profiles = req.body.profiles;

    async.parallel({
        salt: (callback) => {
            bcrypt.genSalt(10, callback);
        }
    }, (error, result) => {
        bcrypt.hash(password, result.salt,(err, hash) => {
            let user = new User({
                name:name,
                lastName:lastName,
                email:email,
                profiles:profiles,
                password:hash,
                salt: result.salt
            });

            user.save().then(
                obj=>res.status(200).json({
                    message: 'User creado Correctamente',
                    obj: obj
                })
            ).catch(
                ex=>res.status(500).json({
                    message: 'Error no se puedo procesar su peticion',
                    obj: ex
                })
            );
        });
    });
}

function replace(req, res, next) {
    res.send(`Reemplazo un usuario con id ${req.params.id} por otro`);
}

function edit(req, res, next) {
    res.send(`Edito un usuario con id ${req.params.id}`);
}

function destroy(req, res, next) {
    const id = req.params.id;
    User.remove({'_id':id}).then(obj => res.status(200).json({
        message: `Se elimino al usuario del sistema con id ${id}`,
        objs: obj
    })).catch(err => res.status(500).json({
        message: `No se pudo eliminar el usuario`,
        objs: err
    }));
}

module.exports = {
    list,
    index,
    create,
    replace,
    edit,
    destroy
}
