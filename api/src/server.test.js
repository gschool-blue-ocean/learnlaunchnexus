import request from 'supertest';
import server from './server';


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
  

  export default server;
