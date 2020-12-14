// packages imports
const bcryt = require('bcryptjs')
const validator = require('validator')

// local imports
const User = require('../models/user')

module.exports = {
    createUser: async function ({userInput}, req){
        // const email = args.userInput.email
        const errors = []
        if(!validator.isEmail(userInput.email)){
            errors.push({message: 'E-mail is invalid'})
        }
        if(validator.isEmpty(userInput.password) || !validator.isLengty(userInput.password, {min: 5})) {
            error.push({message: 'Password too short!'})
        }
        if(errors.length > 0) {
            const error = new Error('Invalid Input')
            error.data = errors
            error.code = 422
            throw error
        }
        const existingUser = await User.findOne({email: userInput.email})
        if(existingUser){
            const error = new Error('User already exists!')
            throw error
        }
        const hashedPw = await bcryt.hash(userInput.password, 12)
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw,
        })
        const createdUser = await user.save()
        return { ...createdUser._doc, _id: createdUser._id.toString() }
    },

    login: async function({email, password}) {
        const user = await User.findOne({email: email})
        if(!user){
            const error = new Error('User not found!')
            error.code = 401
            throw error
        }
    }
}