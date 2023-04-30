const express = require('express')
const http = require('http')
const session = require('express-session')
const router = require('./router/index')

const app = express()
const server = http.createServer(app)
const port = 3000

app.use(express.json())
app.use(session({
    secret: 'session', 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 24 * 1000 * 7
    }
}))

router(app)

server.listen(port)
console.log('=> Server is running');
