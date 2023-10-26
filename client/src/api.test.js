const {getServices,getTicket} = require('./API.js');

describe("Retrieve the list of services", () => {
    test("getServices - should return the list of services", async () => {
        const data = await getServices()
        
        expect(data.data).toHaveLength(3);
    });
});