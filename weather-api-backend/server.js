const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;
const apiKey = 'b9a8702820d1632ce97ca8a0c21f4760';

mongoose.connect('mongodb://127.0.0.1:27017/weather-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  humidity: Number,
  windSpeed: Number,
  date: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    const { name, main, weather, wind } = data;
    const weatherData = {
      city: name,
      temperature: main.temp,
      description: weather[0].description,
      humidity: main.humidity,
      windSpeed: wind.speed
    };

    const newWeather = new Weather(weatherData);
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
