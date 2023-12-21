const express = require('express')
const router = express.Router()

const connection = require("../controller/bd")

router.get("/",(req,res) =>{
    console.log('bonjour');
})

router.post('/', (req,res) =>{
    let  { nom, password} = req.body;

    if(nom && password){
        connection.query('SELECT * FROM admin WHERE nom =? AND password =?', [nom,password], (error,data) =>{
            if(data.length > 0){
                req.session.loggedin = true;
                req.session.nom = nom;
                for(let i = 0; i < data.length ; i++){
                    if(data[i].password === password ){
                        console.log('donnée correct ');

                    }else{
                        console.log('donnée incorrect');
                        
                    }
                }
            } else{
                // console.log("saisir les données");
                res.send('nom d\'utilisateur et incorrect')
            } 
        })
    }else{
        console.log('veillez saisir des données dans le champs');
        res.send("saisir les données")
    }

})

module.exports = router;


