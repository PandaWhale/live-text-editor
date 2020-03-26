const userController = require('../server/controllers/userController');

jest.mock('pg');
xdescribe('userController', () => {
  describe('Create user', () => {
    const query = jest.fn().mockImplementation(() => {
      const data = {
        rows: [{
          id: 1,
          firstname: 'Frodo',
          lastname: 'Baggins',
          username: 'lotr',
          password: 'password',
          roomId: 1
        }]
      };
      return data;
    });
    const next = jest.fn();
    const req = { body: { username: 'lotr', password: 'password' } };
    const res = { locals: {} };
    it('Should call db.query twice', async (done) => {
      const db = { query };
      await userController.createUser(req, res, next);
      expect(db.query).toHaveBeenCalledTimes(2);
      done();
    });
  });
});
