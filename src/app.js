const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Defining paths of Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // to set up handlebars
app.set('views', viewsPath); // Changing the path of templates from views folder to templates
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectory)); // app.use is a way to customize your server


app.get('', (req, res) => { // This is a route // req - request / res - response
    res.render('index', { // File in the views folder is the template
        title: 'Weather App',
        name: 'Aaqil Ramzeen'
    }); // Helps to render a view
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Aaqil Ramzeen'
    });
});


app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help',
        message: 'What is the issue you are facing?',
        name: 'Aaqil Ramzeen'
    });
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({
            error: 'Please enter a valid address'
        });
    } else {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });

            })
        });
    }   
});


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }


    console.log(req.query.search);
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Aaqil Ramzeen'
    });
});


app.get('*', (req, res) => { // Whole code block is called a route handler
    res.render('404', {
        title: '404',
        message: 'Page Not Found',
        name: 'Aaqil Ramzeen'
    });
});


app.listen(3000, () => {
    console.log('Server is up in port 3000');
});