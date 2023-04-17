const { Sequelize, DataTypes } = require("sequelize");

// postgres://<USUARIO>:<PASSWORD>@<URL_HOST_BD>:<PUERTO_BD>/<NOMBRE_BD>

const CADENA_CONEXION = 
    process.env.DATABASE_URL || "postgresql://Alex:euler2020@localhost:5432/Estudiando.pe"
    const sequelize = new Sequelize(CADENA_CONEXION)

const Alumno = sequelize.define("Alumno",{
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    DNI:{
        type : DataTypes.NUMERIC(8),
        allowNull : false,
    },
    ID_COLEGIO :{
        type: DataTypes.STRING(30),
        allowNull : true,
    },
    NOMBRE_COLEGIO : {
        type :DataTypes.STRING (200),
        allowNull : false,
    },
    NOMBRE : {
        type :DataTypes.STRING (200),
        allowNull : false,
    },
    EDAD:{
        type : DataTypes.NUMERIC(3),
        allowNull : false,
    },
    GRADO : {
        type :DataTypes.STRING (50),
        allowNull : false,
    },
    PASSWORD : {
        type :DataTypes.STRING (50),
        allowNull : false,
    },
    TELEFONO:{
        type : DataTypes.NUMERIC(9),
        allowNull : false,
    },
    CORREO:{
        type :DataTypes.STRING (200),
        allowNull : false,
    }
}, {
    timestamps : false,
    freezeTableName : true
})


module.exports = {
    Alumno
}