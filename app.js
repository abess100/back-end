let port = 3500;

const express = require("express")
const bodyParser = require('body-parser')
const session = require("express-session")
const cors =require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret:"azerty1234567890",
}))


app.use('/admin', require('./routes/admin.routes.js'));
app.use('/apprenant', require('./routes/apprenant.routes'));
app.use('/connexion', require('./routes/connexion.routes.js'))
app.use('/inscription', require('./routes/inscription.routes.js'))

app.listen(port, () =>{
    console.log('votre serveur est lancé au port : '+ port);
})