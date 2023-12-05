import express from "express";
import Bid from "../models/bidModel.js";
const router = express.Router();

router.get('/', (req, res, next) => {
    Bid.find({})
        .then(users => {
            res.json(users);
        })
        .catch(error => next(error));
});

// post the bid to the database
router.post('/', (req, res, next) => {
    Bid.create(req.body)
        .then(user => {
            res.json(user);
        })
        .catch(error => next(error));
});

export default router;
