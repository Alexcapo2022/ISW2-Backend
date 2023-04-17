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


//POST PARA REGISTRO USUARIO
app.post("/registro", async (req, res) => {
    const email = req.body.email
    console.log(email)
    const usuarioExistente = await Alumno.findAll({
        where : {
            CORREO: email
        }
    })
    console.log(usuarioExistente);
    console.log(usuarioExistente.length)
    if (usuarioExistente.length == 0){
        try {
            const nuevoAlumno = await Alumno.create({
                
                DNI : req.body.dni,
                Apellido: req.body.lastName,
                NOMBRE_COLEGIO : req.body.nombre_colegio,
                NOMBRE: req.body.name,
                EDAD : req.body.edad,
                GRADO : req.body.grado,
                PASSWORD : req.body.password,
                TELEFONO : req.body.telefono,
                CORREO: email,
            });
            console.log(nuevoAlumno);
            res.send({
                verify: true
            })
            return      
        } catch (error) {
            res.send({
                error : `ERROR. ${error}`
            })
            return
        }  
    }else{res.send({
        verify: false,
    })}
    console.log(res.json().verify)
})



app.listen(PUERTO, () => { 
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})