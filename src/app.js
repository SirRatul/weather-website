const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000
 
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

/* app.get('', (req, res) => {
    res.render('index')
}) */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Samsul Islam'
    })
})

/* app.get('/about', (req, res) => {
    res.render('about')
}) */

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Samsul Islam'
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Samsul Islam'
    })
}) 

/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) */

/* app.get('/help', (req, res) => {
    res.send('Help page')
}) */

/* app.get('/help', (req, res) => {
    res.send({
        name: 'Ratul',
        age: 20
    })
}) */

/* app.get('/help', (req, res) => {
    res.send([{
        name: 'Ratul',
    }, {
        name: 'Jahid',
    }])
}) */

/* app.get('/about', (req, res) => {
    res.send('About')
}) */

/* app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
}) */

/* app.get('/weather', (req, res) => {
    res.send('Your weather')
}) */

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location: location,
                forecastData: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

/* app.get('/help/*', (req, res) => {
    res.send('Help article not found')
}) */

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ratul',
        errorMessage: 'Help article not found'
    })
})

/* app.get('*', (req, res) => {
    res.send('My 404 page')
}) */

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ratul',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => { 
    console.log('Server is up on port '+port)
})

// app.com
// app.com/help
// app.com/about