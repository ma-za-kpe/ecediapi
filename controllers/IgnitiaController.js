import axios from 'axios';

// must protect api key
// add key to .env file

// Retrieve the API key from the environment variables
const apiKey = process.env.IGNITIA_API_KEY;
const authKey = process.env.AUTH_KEY

// Construct the external API URL using the apiKey
const externalApiUrl = `https://b2b.ignitia.se/api/iskaplusbr-mvp/forecast?Content-Type=application/json&auth-key=${apiKey}`;

async function getWeather(latitude, longitude) {
  const today = getCurrentDate();
  const sevenDaysFromNow = getDateSevenDaysFromNow();
  
  console.log('Today:', today);
  console.log('Date 7 days from now:', sevenDaysFromNow);
  try {
    const headers = {
      'auth-key': authKey,
    };

    const data = {
      lat: latitude,
      lon: longitude,
      date_interval: {
        start: today,
        end: sevenDaysFromNow
      }
    };

    const response = await axios.post(`${externalApiUrl}`, data, {headers});

    return response.data;
  } catch (error) {
    console.error('Error getting weather data:', error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to get weather data',
      status: error.response.status,
      message: error.response.data,
    };
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

