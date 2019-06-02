import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ServiceHistory } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, serviceHistory

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  serviceHistory = await ServiceHistory.create({ user })
})

test('POST /service-history 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, service_type: 'test', frequency: 'test', reminder: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.service_type).toEqual('test')
  expect(body.frequency).toEqual('test')
  expect(body.reminder).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /service-history 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /service-history 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /service-history 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /service-history/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${serviceHistory.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(serviceHistory.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /service-history/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${serviceHistory.id}`)
  expect(status).toBe(401)
})

test('GET /service-history/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /service-history/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${serviceHistory.id}`)
    .send({ access_token: userSession, service_type: 'test', frequency: 'test', reminder: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(serviceHistory.id)
  expect(body.service_type).toEqual('test')
  expect(body.frequency).toEqual('test')
  expect(body.reminder).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /service-history/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${serviceHistory.id}`)
    .send({ access_token: anotherSession, service_type: 'test', frequency: 'test', reminder: 'test' })
  expect(status).toBe(401)
})

test('PUT /service-history/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${serviceHistory.id}`)
  expect(status).toBe(401)
})

test('PUT /service-history/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, service_type: 'test', frequency: 'test', reminder: 'test' })
  expect(status).toBe(404)
})

test('DELETE /service-history/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${serviceHistory.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /service-history/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${serviceHistory.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /service-history/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${serviceHistory.id}`)
  expect(status).toBe(401)
})

test('DELETE /service-history/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
