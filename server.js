const express = require('express')
const hbs = require('express-handlebars')
// const cookieSession = require('express-session')

// server 
const server = express()


// middleware
server.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

server.set('view engine', 'hbs')
// server.use(cookieSession({
//     name: 'session',
//     keys: ['lenda.eda.nz']
// }))
server.use(express.static('public'))
server.use(express.urlencoded({
    extended: true
}))

// routes
const memberRoutes = require('./routes/memberRoutes').membersRouter
const listingRoutes = require('./routes/listingRoutes').listingsRouter
const loanRoutes = require('./routes/loanRoutes').loansRouter
const homeRoutes = require('./routes/homeRoutes').homeRouter



server.use('/listings', listingRoutes)
server.use('/members', memberRoutes)
server.use('/loans', loanRoutes)
server.use('/', homeRoutes)





// export server
module.exports = server 
