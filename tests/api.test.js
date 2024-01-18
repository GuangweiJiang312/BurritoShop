const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Import your Express app
const Order = require('../models/order');

//Testing /api/burrito Endpoint
describe('/api/burrito', () => {
    it('should return a list of burritos', async () => {
        const res = await request(app).get('/api/burrito');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        // Add more assertions as necessary
    });
});

// Testing /api/orders Endpoint
describe('/api/orders', () => {

    let createdOrderId;

    // Setup: Run before each test in this block
    beforeEach(async () => {
        // Setup logic (if needed)
    });

    // Teardown: Run after each test in this block
    afterEach(async () => {
        // Cleanup logic (if needed)
        if (createdOrderId) {
            await Order.findByIdAndDelete(createdOrderId);
        }
    });

    it('should return a list of orders', async () => {
        const res = await request(app)
            .get('/api/orders')
            .set('x-api-key', 'mysecretapikey');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        // Additional assertions can be added here
    });

    it('should create a new order', async () => {
        const newOrder = {
            items: ['65a76c635082865064333e50'],
            totalCost: 6
        };

        const res = await request(app)
            .post('/api/orders')
            .set('x-api-key', 'mysecretapikey').
            send(newOrder);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        // Additional assertions for order properties

        // Save created order ID for cleanup
        createdOrderId = res.body._id;

        // Database State Verification
        const orderInDb = await Order.findById(res.body._id);
        expect(orderInDb).toBeTruthy();
        expect(orderInDb.totalCost).toEqual(newOrder.totalCost);
    });

});

//Testing /api/orders/:id Endpoint
describe('/api/orders/:id', () => {
    it('should return details of a specific order', async () => {
        const orderId = '65a76d285082865064333e5f'; // Replace with an actual order ID
        const res = await request(app)
            .get(`/api/orders/${orderId}`)
            .set('x-api-key', 'mysecretapikey');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', orderId);
        // Replace '{orderId}' with an actual order ID
        // Additional assertions as needed
    });
});

// Clean up after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});
