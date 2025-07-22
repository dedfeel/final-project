let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let pool = require('../config/db')
let {JWT_SECRET} = require('../config/env')

exports.users = async(req,res)=>{
    try{
    
            let product = await pool.query('SELECT * FROM users')
    
            product.rows.length > 0 ? res.status(200).json(product.rows) : res.status(404).json({message:"The products not found"})
    
        }catch(err){
            console.log(err);
        }
}

exports.register = async(req,res)=>{
    let {username, email, password} = req.body
            
    if(!username || !email || !password){
        res.status(400).json({message: 'Jiberilgen aqparat tolyq emes'})
    }else{
        try{
            let hashedPassword = await bcrypt.hash(password, 10)

            if(hashedPassword){
                let result = await pool.query('insert into users (username, email, password) values ($1, $2, $3) returning * ', [username, email, hashedPassword])
                result.rows.length > 0 ? res.status(201).json(result.rows) : res.status(400).json({message: "qate"})
            }else{
                res.status(400).json({message: "Qupia sozdi hashtaw kezinde qate tuyndady"})
            }

        }catch(err){
            console.log("DB men bailanysu mumkin bolmady");
            
        }
    }
}

exports.login = async(req,res)=>{
    let {email, password} = req.body

    if(!email || !password){
        res.status(400).json({message:"Jiberilgen aqparat tolaq emes"})
    }else{
        try{
            let result = await pool.query('select * from users where email= $1',[email])
            if(result.rows.length ==0){res.status(404).json({message: "User not found"})}

            let isMatch = await bcrypt.compare(password, result.rows[0].password)

            if(isMatch){
                let token = jwt.sign({userID: result.rows[0].id},JWT_SECRET, {expiresIn: '10min'})
                res.status(200).json({message: "Login successfully!",  userName: result.rows[0].username,token})
            }else{
                res.status(400).json({message: "Qupia soz saikes kelmedi"})
            }

        }catch(err){
            console.log('DB-men bailanysu mumkin bolmady!',err);
            
        }
    }
}

