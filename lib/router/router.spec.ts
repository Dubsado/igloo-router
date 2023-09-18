import { addRoute, findRoute } from '../'
import { expect, test, describe } from 'bun:test'

describe('Router', () => {
    test('should add static route and find handler', () => {
        addRoute('/static', [], 'staticHandler')
        const result = findRoute('/static')
        expect(result).toEqual({
            handler: 'staticHandler',
            middleware: [],
            params: {},
        })
    })

    test('should add dynamic route and find handler', () => {
        addRoute('/dynamic/:dynamic', [], 'dynamicHandler')
        const result = findRoute('/dynamic/12345')
        expect(result).toEqual({
            handler: 'dynamicHandler',
            middleware: [],
            params: { dynamic: '12345' },
        })
    })

    test('should return null for an unknown route', () => {
        const result = findRoute('/unknown')
        expect(result).toBeNull()
    })
})
