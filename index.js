const http = require('http')
const express = require('express')
const morgan = require("morgan")
const helmet = require("helmet")
const logger = morgan("tiny")

const app = express()
const server = http.createServer(app)

app.use(logger)
app.use(helmet())

const port = 3000
const host = 'localhost'

app.use(express.static("public"))

// Needed for Templates 
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


// Needed for templates rendering
app.get('/', (req, res) => {
    res.render('home',{
        locals : {

        },
        partials: {
            header: './partials/header',
            footer: './partials/footer'
        }
    })
})

app.get('/orders', (req, res) => {
    res.render('orders', {
        locals : {

        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer'
        }
    })
})

app.get('/orders/:kind', (req, res) => {
    res.render('coffee', {
        locals : {

        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer'
        }
    })
})

//catch all if website doesn't
app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

server.listen(port, host, () => {
    console.log(`Running on ${host}: ${port}`)
})
