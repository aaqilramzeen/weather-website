const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWFxaWxyYW16ZWVuIiwiYSI6ImNrZDQwcG0zYjFmb2EydXFtYm1rZWR1aXAifQ.ExonQm7dunZsT6ux-tYozA'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name 
            })
        }
    });
};

module.exports = geocode;























// Geocoding - Initial Code
// const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWFxaWxyYW16ZWVuIiwiYSI6ImNrZDQwcG0zYjFmb2EydXFtYm1rZWR1aXAifQ.ExonQm7dunZsT6ux-tYozA';

// request({url: geoURL, json: true}, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to server!');
//     } else if (response.body.message) {
//         console.log('Unable to find location!');
//     } else {
//         const coordinates = response.body.features[0].center;
//         const lng = coordinates[0];
//         const lat = coordinates[1];
    
//         console.log('Los Angeles: Longitude: ' + lng + ' Latitude: ' + lat); 
//     }
 
// });