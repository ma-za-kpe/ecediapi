import CollectiveModel from '../models/Collective.js';

const registerCollective = async (req, res) => {
  try {
    const { name, location } = req.body;
     // Generate API Token
     const apiToken = generateToken(collectiveData._id);

     // Create a new Collective with the generated token
     const newCollective = await CollectiveModel.create({
       name: name,
       location: location,
       apiToken,
     });
     res.status(201).json(newCollective);
  } catch (error) {
    console.error('Error registering collective:', error);
    res.status(500).json({ 
        error: 'Failed to register collectivee',
        message: error.message
     });
  }
};

const loginCollective = (req, res) => {
  // Use Passport.js authentication middleware to issue tokens
  // Assuming you have an authentication middleware named 'authenticateCollective'
  passport.authenticate('bearer', { session: false }, (err, collective) => {
    if (err || !collective) {
      return res.status(401).json({ error: 'Invalid API Key/Token' });
    }
    // Optionally, you can generate and return a JWT or any other token here
    return res.json({ message: 'Login successful', collective });
  })(req, res);
};

// Function to generate Token during Registration
const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  };

export default {
    registerCollective,
    loginCollective
};
