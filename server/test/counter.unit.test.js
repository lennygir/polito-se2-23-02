const express = require('express');
const request = require('supertest');
const handler= require('../src/routes.js');

const app = express();

//Ensures that each test can define its specific mock functions without worrying about what was done by the tests before
beforeEach(() => {
    jest.clearAllMocks();
})
// Mock the dataService
const dataServiceMock = {
    data: {
      counters: [
        {
          id: 1,
          services: [2],
          clients: [1, 2, 3],
          servedClient: null,
        },
        {
          id: 2,
          services: [],
          clients: [],
          servedClient: null,
        },
        {
          id: 3,
          services: [1, 3],
          clients: [],
          servedClient: null,
        },
      ],
    },
  };
  
  // Mock dataService to use the dataServiceMock
  jest.mock('../src/dataService', () => {
    return dataServiceMock;
  });

app.use('/api', handler);

describe('callNextClient', () => {
    it('should return the served client', async () => {

        const result = await request(app).get('/api/counter/1/callNextClient'); // Use the correct path
    
        // Check the response status
        expect(result.status).toBe(200);
    
        // Check the response body
        expect(result.body.data).toBe(1);
      });

    it('should return a 404 response for a non-existing counter', async() => {
        const result = await request(app).get('/api/counter/4/callNextClient'); // Use the correct path
    
        // Check the response status
        expect(result.status).toBe(404);
    
  });

    it('should return a 204 response if the counter has no clients', async() => {
        const result = await request(app).get('/api/counter/2/callNextClient'); // Use the correct path
    
        // Check the response status
        expect(result.status).toBe(204);
   
  });

  
});

