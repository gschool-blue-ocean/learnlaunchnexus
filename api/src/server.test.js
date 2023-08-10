const request = require('supertest');
const app = require('../server.js');
const server = require('../server.js');  

/*describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        id: 1,
        name: 'John Doe'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should fetch all users', async () => {
    const res = await request(app)
      .get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({
        name: 'Jane Doe'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Jane Doe');
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('id', 1);
  });
});
*/
describe('Student Routes', () => {
     it('should fetch all students', async () => {
        const res = await request(server).get('/students');
        expect(res.statusCode).toEqual(200);
    });
 
 });

describe('User Routes', () => {
     it('should create a new user', async () => {
        const res = await request(server)
            .post('/users')
            .send({ name: 'John Doe' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name', 'John Doe');
    });

 });

describe('Admin Routes', () => {
     it('should perform an admin task', async () => {
        const res = await request(server).get('/admins');
        expect(res.statusCode).toEqual(200);

    });

 });

afterAll(() => {
    server.close();
  });
  

module.imports = app;
