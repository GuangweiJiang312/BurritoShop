const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Order = require('../models/order');

//Testing /api/burrito Endpoint
describe('/api/burrito', () => {
    it('should return a list of burritos', async () => {
        const res = await request(app).get('/api/burrito');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        
    });
});

// Testing /api/orders Endpoint
describe('/api/orders', () => {

    let createdOrderId;

    // Setup: Run before each test in this block
    beforeEach(async () => {
        
    });

    // Teardown: Run after each test in this block
    afterEach(async () => {
        
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
        const orderId = '65a76d285082865064333e5f'; 
        const res = await request(app)
            .get(`/api/orders/${orderId}`)
            .set('x-api-key', 'mysecretapikey');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', orderId);
        
    });
});

// Clean up after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});
