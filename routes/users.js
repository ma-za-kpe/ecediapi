import express from "express";
import User from "../models/userModel.js";
const router = express.Router();

router.get('/', (req, res, next) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(error => next(error));
});

export default router;
