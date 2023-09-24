import { expect, test, describe } from 'bun:test'
import { server } from './basic-server'

describe('API Tests', () => {
    test('should return a 200 OK for /health', async () => {
        const res = await server.fetch('/health')
        expect(res.status).toBe(200)
    })
    test('an undefined route should have 404 status: /random-bla-bla', async () => {
        const res = await server.fetch('/random-bla-bla')
        expect(res.status).toBe(404)
    })
    test('should return JSON payload for /random-json/:id', async () => {
        const res = await server.fetch('/random-json/1')
        //@ts-ignore
        const reader = res.body.getReader()
        const { done, value } = await reader.read()
        const decoder = new TextDecoder()
        const str = decoder.decode(value)

        expect(res.status).toBe(200)
        expect(JSON.parse(str)).toEqual({
            success: true,
            id: '1',
        })
    })
})
