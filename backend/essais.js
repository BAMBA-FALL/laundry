const express = require ('express')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validateResult, check} = require('express-validator')
const isAuthenticated = require ('./middleware/auth')
const userModel = require('./model/userModel')

const router = express.Router();


router.post('/register', [], async(req, res)=>{

})

