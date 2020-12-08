
// packages imports
const express = require('express')
const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')


exports.signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed!')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    bcrypt.hash(password, 12)
    .then(hashpass =>{
        const user = new user({
            name: name,
            email: email,
            password: hashpass,
        })
        return user.save()
    }).then(result =>{
        res.statusCode(201).json({message: 'User Created Successfylly!', userId: result._id})
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.login = (req, res, next) =>{
    const email = req.body.email
    const pasword = req.body.pasword
    User.findOne({email: email})
    .then(user =>{
        if(!user){
            const error = new Error('A use with this email could not found!')
        }
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}