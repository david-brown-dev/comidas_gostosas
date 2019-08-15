const express = require('express')
const path = require('path')
const pino = require('express-pino-logger')()

const recipesRoutes = require('./routes/recipes')
const cookTimesRoutes = require('./routes/cookTimes')
const seasonsRoutes = require('./routes/seasons')
const categoriesRoutes = require('./routes/categories')
const ingredientsRoutes = require('./routes/ingredients')
const measurementsRoutes = require('./routes/measurements')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(pino)
server.use(express.static(path.join(__dirname, '../public')))
server.use('/api/recipes', recipesRoutes)
server.use('/api/cooktimes', cookTimesRoutes)
server.use('/api/seasons', seasonsRoutes)
server.use('/api/categories', categoriesRoutes)
server.use('/api/ingredients', ingredientsRoutes)
server.use('/api/measurements', measurementsRoutes)

server.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
