const {getServices, getTicket, putServices, deleteServices, getServedClient, getNextClient, getCounters, getCountersServices} = require('./API.js');

describe("Retrieve the list of services", () => {
    test("getServices - should return the list of services", async () => {
        const response = await getServices()
        expect(response.data).toHaveLength(3);
    });
});

describe("Retrieve the ticket", () => {
    
    test("getTicket - should return the number of the ticket of the client", async () => {
        const response = await getTicket(2)
        expect(typeof response.data).toBe("number");
    });
    test("getTicket - should return the number of the ticket of the client", async () => {
        try{
            await getTicket(11);
        }
        catch(error){
            expect(error.message).toBe("No counter was found with the service id 11");
        }
    });
});

describe("Retrieve the list of counters", () => {
    test("getCounters - should return the list of services", async () => {
        const response = await getCounters()
        expect(response.data).toHaveLength(3);
    });
});

