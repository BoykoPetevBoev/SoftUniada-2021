const supertest = require('supertest');
const expressConfig = require('../config/express');
const UserSchema = require('../database/models/Users');
const setupDB = require('./test-setup');

setupDB('Server-Post-User-Tests');

const app = expressConfig();
const user = {
    email: 'test',
    username: 'testServer',
    password: 'testServer'
}

describe('Server-Post-User-Tests', () => {

    test('/register', async () => {
        const resValid = await supertest(app).post('/user/register').send(user);
        const savedUser = await UserSchema.findOne({ email: user.email });

        expect(resValid.statusCode).toEqual(200);
        expect(savedUser.username).toBe(user.username);
        expect(savedUser.email).toBe(user.email);
        expect(savedUser.password.length).toBe(60);
        expect(savedUser.friends.length).toBe(0);
        expect(savedUser.rooms.length).toBe(0);

        const resInvalid = await supertest(app).post('/user/register').send(undefined);
        expect(resInvalid.statusCode).toEqual(401);

        const resRegistered = await supertest(app).post('/user/register').send(user);
        expect(resRegistered.statusCode).toEqual(401);
    })

    test('/login', async () => {
        // const resNotRegistered = await supertest(app).post('/user/login').send(user);
        // expect(resNotRegistered.statusCode).toEqual(401);
        const resInvalid = await supertest(app).post('/user/login').send(undefined);
        expect(resInvalid.statusCode).toEqual(401);

        // await new UserSchema(user).save();
        const resValid = await supertest(app).post('/user/login').send(user);
        expect(resValid.statusCode).toEqual(200);
    })

    test('/404', async () => {
        const res = await supertest(app).get('/404');
        expect(res.statusCode).toEqual(404);
    })
})