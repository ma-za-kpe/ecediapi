import express from "express";
import multer from 'multer';
import Order from "../models/orderModel.js";
const router = express.Router();

// Multer middleware for handling file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

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

// Route to handle order creation with an order image
router.post('/create', upload.single('orderImage'), async (req, res) => {
    try {
      const {
        user,
        cropName,
        quantity,
        qualityRequirements,
        deliveryLocation,
        deliveryTimeframe,
        price,
        paymentTerms,
        description,
        packagingPreferences,
        certifications,
        email,
        phone,
        minCreditScore,
        additionalRequirements,
      } = req.body;
  
      const orderImage = {
        data: req.file.buffer, // Image binary data
        contentType: req.file.mimetype, // Image MIME type
      };
  
      const newOrder = new Order({
        user,
        cropName,
        quantity,
        qualityRequirements,
        deliveryLocation,
        deliveryTimeframe,
        price,
        paymentTerms,
        description,
        packagingPreferences,
        certifications,
        email,
        phone,
        minCreditScore,
        orderImage,
        additionalRequirements,
      });
  
      await newOrder.save();
  
      res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});  

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log("order id ", id)
    const order = req.body;

    Order.findByIdAndUpdate(id, order, { new: true })
        .then(updatedOrder => {
            res.json(updatedOrder);
        })
        .catch(error => next(error));
});

// Route to delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("order id ", id)
        // Find the order by ID and delete it
        const deletedOrder = await Order.findByIdAndDelete(id);
        console.log("deletedOrder ", deletedOrder)
        if (deletedOrder) {
            return res.json({ message: 'Order deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // Delete all orders
// router.delete('/delete-all', async (req, res) => {
//     try {
//       const result = await Order.deleteMany({});
//       res.json({ message: `Deleted ${result.deletedCount} orders` });
//     } catch (error) {
//       console.error('Error deleting orders:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

export default router;