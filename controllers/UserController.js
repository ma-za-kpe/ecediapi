import UserFormSchema from "../models/User.js";

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await UserFormSchema.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserFormSchema.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId ", userId)
    const user = await UserFormSchema.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
    try {
    //   const email = req.params.generalInfo.email; 
    //   console.log("userEmail ", email)
    //   const user = await UserFormSchema.findOne({ email: email });
    const email = req.params.userEmail; // Assuming you've defined "userEmail" in your route
    console.log("userEmail ", email);
    const user = await UserFormSchema.findOne({ 'generalInfo.email': email });

  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user by email:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await UserFormSchema.findByIdAndUpdate(userId, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user by ID
// const updateUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const updatedUser = await UserFormSchema.updateOne({ _id: userId }, req.body);
//     if (updatedUser.nModified > 0) {
//       // Fetch the updated user after the update
//       const fetchedUser = await UserFormSchema.findById(userId);
//       res.json(fetchedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error updating user:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await UserFormSchema.findByIdAndDelete(userId);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser, getUserByEmail };
