
const express = require('express')
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"#Abess1000",
    database:"apprenant241"
})

connection.connect((error) =>{
    if(error){
        throw error
    }else{
        console.log('connexion établie');
    }
})


module.exports = connection