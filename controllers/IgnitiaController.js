import axios from 'axios';
import CropModel from '../models/Crop.js';

// must protect api key
// add key to .env file

// Retrieve the API key from the environment variables
const apiKey = process.env.IGNITIA_API_KEY;
const authKey = process.env.AUTH_KEY

// Construct the external API URL using the apiKey
const externalApiUrl = `https://b2b.ignitia.se/api/iskaplusbr-mvp/forecast?Content-Type=application/json&auth-key=${apiKey}`;

async function getWeather(latitude, longitude, crop) {
  try {
    // Get today's date and date 7 days from now
    const today = getCurrentDate();
    const sevenDaysFromNow = getDateSevenDaysFromNow();

    console.log('Today:', today);
    console.log('Date 7 days from now:', sevenDaysFromNow);

    // Set headers and data for the API request
    const headers = {
      'auth-key': authKey,
    };

    const data = {
      lat: latitude,
      lon: longitude,
      date_interval: {
        start: today,
        end: sevenDaysFromNow,
      },
    };

    // Make the API request to get weather data
    const response = await axios.post(`${externalApiUrl}`, data, { headers });
    // console.log('response:', response);

    const fcatValue = response.data[today]?.daily?.fcat;
    const sunshine = response.data[today]?.daily?.sunshine;
    const windSpeed = response.data[today]?.daily?.pwindgust;
    const maxtemp = response.data[today]?.daily?.maxtemp;
    console.log('fcatValue:', fcatValue);
    console.log('sunshine:', sunshine);
    console.log('windSpeed:', windSpeed);

    // Check if the crops table is empty
    const count = await CropModel.countDocuments();
    if (count === 0) {
      return {
        message: 'Crops table is empty.',
        fcatValue: fcatValue,
      };
    } else {
      // Check if the crop exists by name
      const existingCrop = await CropModel.findOne({ name: crop });
      if (existingCrop) {
        const fcatOneCategories = existingCrop.categories.filter(category => category.fcat === fcatValue);
        // Log or return the result
        return {
          message: `Crop '${crop}'`,
          fcatValue: fcatValue,
          sunshine: sunshine,
          windSpeed: windSpeed,
          maxtemp: maxtemp,
          advise: fcatOneCategories[0].advise,
        };
      } else {
        return {
          message: `Crop '${crop}' does not exist.`,
          fcatValue: fcatValue,
        };
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Error getting weather data:', error.response.status, 'message', error.response.data);
      return {
        error: 'Failed to get weather data',
        status: error.response.status,
        message: error.response.data,
      };
    } else {
      // Handle other types of errors
      console.error('Unexpected error:', error);
      return {
        error: 'Unexpected error occurred',
        message: error.message
      };
    }
  }
}

// Function to format a date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to get the current date in "YYYY-MM-DD" format
function getCurrentDate() {
  const currentDate = new Date();
  return formatDate(currentDate);
}

// Function to get the date 7 days from now in "YYYY-MM-DD" format
function getDateSevenDaysFromNow() {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 5));
  return formatDate(futureDate);
}

export default {
  getWeather
};

