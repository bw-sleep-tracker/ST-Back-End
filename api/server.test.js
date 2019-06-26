const request = require("supertest");

const server = require("./server.js");

describe("TS1: Testing Server.js", () => {
  it("TC1.1: Testing the environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("TC1.2: Test the default GET request. Should return 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  it("TC1.3: Test the response type to be application/json", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  it("TC1.4: Test the message in the response to be - The sleep tracker api is up!", async () => {
    const res = await request(server).get("/");
    const { message } = res.body;
    expect(message).toBe("The sleep tracker api is up!");
  });
});
