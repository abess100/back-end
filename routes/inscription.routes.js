const express = require('express')
const router = express.Router()
const connection = require("../controller/bd")
const bcrypt =  require('bcryptjs')

router.post('/', (req,res)=>{
    const {nom, password} = req.body;

    if(nom && password){
        connection.query('SELECT * FROM admin WHERE nom =?', [nom], (error, data)=>{
            if(error){
                console.log(error);
            }
            if(data.length > 0){
                console.log(' l\'user existe ')
            } 
        })
        let hashedPassword = bcrypt.hash(password, 8)
        connection.query('INSERT INTO admin ( nom , password) VALUES (?,?)', [nom,password], (error, data) =>{
            if(error){
                console.log(error);
            }else{
                res.send('ajouté avec succé')
            }
        })
    }else(
        res.send('remplir le champs')
    )
})


module.exports =  router
    

