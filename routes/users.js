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

router.post('/', (req, res, next) => {
  const user = new User(JSON.parse(req.body.user));

  user
    .save()
    .then(savedUser => {
      res.json(savedUser);
    })
    .catch(error => next(error));
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { firstName: 'Jane' }, { new: true })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(error => next(error));
});

export default router;
