const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('Should respond with 200 status', (done) => {
        request(server)
          .get('/')
          .expect(200);
        done();
      });
      it('Should respond content type: text/html', (done) => {
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/);
        done();
      });
    });
  });
});
