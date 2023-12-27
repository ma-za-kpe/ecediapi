import express from 'express';
import ignitiaController from '../controllers/IgnitiaController.js';
const router = express.Router();

// Define a route for getting the weather
router.post('/v1/get-weather', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const weather = await ignitiaController.getWeather(latitude, longitude);
    res.json({ weather });
  } catch (error) {
    console.error('Error getting weather:', error);
    res.status(error.status || 500).json({ error: 'Failed to get weather', message: error.message });
  }
});  

router.get("/", function (req, res, next) {
  res.send("Ignitia!");
});

export default router;
