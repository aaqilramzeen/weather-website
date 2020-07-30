const request = require('postman-request');


const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e7111d1a40ca50aa9c552d6b5c164c53&query=' + latitude + ',' + longitude;

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees.'    
            );
        }
    });
}

module.exports = forecast;




















// Initial code
//
// const url = 'http://api.weatherstack.com/current?access_key=e7111d1a40ca50aa9c552d6b5c164c53&query=37.8267,-122.4233&units=m';
// // const url = 'http://api.weatherstack.com/current?access_key=e7111d1a40ca50aa9c552d6b5c164c53&query=Colombo';

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to Weather Service!');
//     } else if (response.body.error) {
//         console.log('Unable to find location!');
//     } else {

//         const currentTemp = response.body.current.temperature;
//         const feelTemp = response.body.current.feelslike;
//         const weatherForecast = response.body.current.weather_descriptions[0];

//         console.log('It is ' + weatherForecast + ' and currently ' + currentTemp + ' degrees out. It feels like ' + feelTemp + ' degrees out.');
//     }
// });