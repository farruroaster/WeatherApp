const express = require('express');
const axios = require('axios'); // Ensure axios is required at the top
const app = express();
const port = process.env.PORT || 3000; // Use environment port for Heroku or 3000 locally

// Your WeatherAPI.com API key
const API_KEY = 'a81872aa67d64257b43172845251003';

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle weather API requests
app.get('/weather', (req, res) => {
    const city = req.query.city;

    // Validate that a city has been provided
    if (!city) {
        return res.status(400).send({ message: 'City parameter is required' });
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    axios.get(url)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            if (error.response) {
                // The API responded with a status outside the 2xx range
                res.status(error.response.status).send({
                    message: error.response.data.error.message
                });
            } else if (error.request) {
                // The request was made but no response was received
                res.status(500).send({ message: 'No response received from the weather service' });
            } else {
                // Something happened in setting up the request
                res.status(500).send({ message: 'Error setting up request to the weather service' });
            }
        });
});

// Route to handle 5-day forecast API requests
app.get('/forecast', (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ message: 'City parameter is required' });
    }
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`;

    axios.get(url)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            if (error.response) {
                res.status(error.response.status).send({
                    message: error.response.data.error.message
                });
            } else if (error.request) {
                res.status(500).send({ message: 'No response received from the weather service' });
            } else {
                res.status(500).send({ message: 'Error setting up request to the weather service' });
            }
        });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
