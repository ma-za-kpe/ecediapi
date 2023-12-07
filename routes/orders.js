import express from "express";
import Order from "../models/orderModel.js";
const router = express.Router();

router.get('/', (req, res, next) => {
    Order.find({})
        .then(order => {
            res.json(order);
        })
        .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    Order.findById(id)
        .then(order => {
            res.json(order);
        })
        .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    const order = new Order(req.body);

    order
        .save()
        .then(savedOrder => {
            res.json(savedOrder);
        })
        .catch(error => next(error));
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const order = req.body;

    Order.findByIdAndUpdate(id, order, { new: true })
        .then(updatedOrder => {
            res.json(updatedOrder);
        })
        .catch(error => next(error));
});

export default router;