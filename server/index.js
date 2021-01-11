const express = require('express')
const server = express()
const cors = require('cors')
const { Technology } = require('../models')

// Sirve para que todo lo que viaje como request sea tratado como JSON
server.use(express.json())
// Sirve para poder acceder al contenido de este carpeta sin necesidad de crear una ruta, se hace sólo para la carpeta public, se pone una diagonal al principio
server.use(express.static(__dirname + '/../public'))
//  Los cors permiten que los request de otros servicios sean bloqueados, son permisos que se le dan
server.use(cors())

// Rutas
server.get('/api/technologies', async (req, res) => {
    let technologies = await Technology.find()
    // Necesitamos agregar la ruta completa para poder acceder a la imágenes guardadas en la carpeta public
    technologies = technologies.map((technology) => {
        //                      http       ://  localhost:3000  /img/   nombreLogo.svg
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`
        // Si no se pone un return, la función retorna por defecto un undefined
        return technology
    })
    return res.send({error: false, data: technologies})
})

server.get('/api/technology/:id', async (req, res) => {
    const { id } = req.params
    let technology = await Technology.findById(id)

    technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`
    return res.send({error: false, data: technology})
})

server.get('/api/technology/search/:name', async (req, res) => {
    const { name } = req.params
    let technologies = await Technology.find({name: { $regex: new RegExp(name,'i')}})

    technologies = technologies.map((technology) => {
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`
        return technology
    })
    return res.send({error: false, data: technologies})
})

module.exports = server