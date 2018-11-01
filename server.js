const express = require('express')
const hbs = require('express-handlebars')

// server 
const server = express()


// middleware
server.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({
    extended: true
}))

// routes
const memberRoutes = require('./routes/memberRoutes')
const listingRoutes = require('./routes/listingRoutes')
const loanRoutes = require('./routes/loanRoutes')

server.use('/listings', listingRoutes)
server.use('/members', memberRoutes)
server.use('/loans', loanRoutes)
server.use('/', listingRoutes)




// export server
module.exports = server 