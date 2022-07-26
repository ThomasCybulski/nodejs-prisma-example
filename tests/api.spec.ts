import request from 'supertest';
import App from '../src/app';

// let rms: App;
let expressApp: Express.Application;
beforeEach(() => {
  // prismaMock.$connect();
  // rms = new App(routes);
  // expressApp = rms.app;
});
// afterEach(() => {
//   rms.shutdown();
// });

describe('GET /api', () => {
  it('given the express server was started when calling /api then return http status code 200', async () => {
    const response = await request(App).get('/api');
    expect(response.statusCode).toEqual(200);
  });
});

describe('GET /unknown-url', () => {
  it('given the express server was started when calling an unknown url then return http status code 404', async () => {
    const response = await request(App).get('/unknown-url');
    expect(response.statusCode).toEqual(404);
  });
});
