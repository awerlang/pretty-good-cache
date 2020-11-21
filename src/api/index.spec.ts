import supertest from 'supertest'
import { Cache } from '../service/cache'

import { app } from './index'

test('GET non-existing key', async () => {
    const cache = new Cache(new Map())
    await supertest(app(cache))
        .get('/key1')
        .expect(404)
})

test('GET existing key', async () => {
    const cache = new Cache(new Map([
        ['key1', 'value']
    ]))
    await supertest(app(cache))
        .get('/key1')
        .expect(200, 'value')
})

test('POST non-existing key', async () => {
    const cache = new Cache(new Map())
    jest.spyOn(cache, 'add')
    const api = app(cache)
    await supertest(api)
        .post('/key1')
        .set('Content-Type', 'text/plain')
        .send('VALUE')
        .expect(201)

    expect(cache.add).toHaveBeenCalledWith('key1', 'VALUE')
    expect(cache.size).toBe(1)
})

test('POST existing key', async () => {
    const cache = new Cache(new Map([
        ['key1', 'value']
    ]))
    const api = app(cache)
    await supertest(api)
        .post('/key1')
        .set('Content-Type', 'text/plain')
        .send('VALUE')
        .expect(409)

    expect(cache.size).toBe(1)
})

test('PUT non-existing key', async () => {
    const cache = new Cache(new Map())
    jest.spyOn(cache, 'update')
    const api = app(cache)
    await supertest(api)
        .put('/key1')
        .set('Content-Type', 'text/plain')
        .send('VALUE')
        .expect(204)

    expect(cache.update).toHaveBeenCalledWith('key1', 'VALUE')
    expect(cache.size).toBe(1)
})

test('PUT existing key', async () => {
    const cache = new Cache(new Map([
        ['key1', 'value']
    ]))
    jest.spyOn(cache, 'update')
    const api = app(cache)
    await supertest(api)
        .put('/key1')
        .set('Content-Type', 'text/plain')
        .send('VALUE')
        .expect(204)

    expect(cache.update).toHaveBeenCalledWith('key1', 'VALUE')
    expect(cache.size).toBe(1)
})
