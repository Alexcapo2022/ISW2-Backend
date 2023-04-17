const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const {Alumno} = require("./dao")

const PUERTO = process.env.PORT || 4444

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true 
}))
app.use(cors()) // politica CORS (cualquier origen) <---- TODO: cuidado!!!
app.use(express.static("assets")) // <-- configuracion de contenido estatico

// MOSTRAR ALUMNOS
app.get("/alumnos",async (req,resp) =>{
    const listaAlumno = await Alumno.findAll()

    resp.send(listaAlumno)
})

app.listen(PUERTO, () => { 
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})
//LOGIN
app.post("/login",async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const AlumnoRegistrado = await Alumno.findAll({
        where: {
            CORREO : email,
            PASSWORD : password

        }
    })
    if (AlumnoRegistrado.length == 0){
        // No existe usuario
        res.send({
            verify: false
        })
    } else{
        res.send({
            verify: true
        })
    }
})