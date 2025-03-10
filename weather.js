const axios = require('axios');

const API_KEY = 'your_new_valid_api_key_here'; // Replace with your new API key

function getWeatherByCity(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

  axios.get(url)
    .then(response => {
      console.log('Weather data:', response.data);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    });
}

// Example to test the function
getWeatherByCity('Bengaluru'); // Now testing for Bengaluru, India
