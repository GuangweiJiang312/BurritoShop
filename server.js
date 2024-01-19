const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Burrito Shop API');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://my-mongo:27017/burrito_shop')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware for API key authentication
function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'mysecretapikey') {
        next();
    } else {
        res.status(401).send('Access denied. Invalid API key.');
    }
}

const Burrito = require('./models/burrito');
const OrderItem = require('./models/orderItem');
const Order = require('./models/order');

// `/api/burrito` Endpoint
// GET request to list all burritos
app.get('/api/burrito', async (req, res) => {
    try {
        const burritos = await Burrito.find();
        res.send(burritos);
    } catch (error) {
        res.status(500).send("Error fetching burritos: " + error.message);
    }
});

// `/api/orders` Endpoint
// GET request to list all orders
app.get('/api/orders', authenticateApiKey, async (req, res) => {
    try {
        const orders = await Order.find().populate('items');
        res.send(orders);
    } catch (error) {
        res.status(500).send("Error fetching orders: " + error.message);
    }
});

// POST request to submit a new order
app.post('/api/orders', authenticateApiKey, async (req, res) => {
    try {
        let order = new Order({
            items: req.body.items,
            totalCost: req.body.totalCost 
        });

        order = await order.save();
        res.send(order);
    } catch (error) {
        res.status(500).send("Error creating order: " + error.message);
    }
});

// `/api/orders/:id` Endpoint
// GET request to get details of an individual order
app.get('/api/orders/:id', authenticateApiKey, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items');

        if (!order) return res.status(404).send('Order not found');
        res.send(order);
    } catch (error) {
        res.status(500).send("Error fetching order: " + error.message);
    }
});

module.exports = app;
