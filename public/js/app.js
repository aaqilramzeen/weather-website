// Client side JavaScript

// fetch is a browser side API. Its not accessible in Node.js

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weather = document.getElementById('weather-form');
const button = document.getElementById('button');
const input = document.getElementById('input');

const messageOne = document.getElementById('location');
const messageTwo = document.getElementById('forecast');

weather.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = input.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        });
    });
});


