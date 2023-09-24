import { addRoute, findRoute } from '../'
import { expect, test, describe } from 'bun:test'

describe('Router', () => {
    test('should add static route and find handler', () => {
        addRoute(['GET'], '/static', [], 'staticHandler')
        const result = findRoute('/static', 'GET')
        expect(result).toEqual({
            handler: 'staticHandler',
            middleware: [],
            params: {},
        })
    })

    test('should add dynamic route and find handler', () => {
        addRoute(['GET'], '/dynamic/:dynamic', [], 'dynamicHandler')
        const result = findRoute('/dynamic/12345', 'GET')
        expect(result).toEqual({
            handler: 'dynamicHandler',
            middleware: [],
            params: { dynamic: '12345' },
        })
    })

    test('adding multiple routes at the same dynamic path should fail', () => {
        addRoute(['GET'], '/dynamic2/:dynamic', [], 'dynamicHandler')
        expect(() => {
            addRoute(['GET'], '/dynamic2/:dynamic2', [], 'dynamicHandler2')
        }).toThrow()
    })

    test('adding multiple routes at the same exact path should fail', () => {
        addRoute(['GET'], '/static/path', [], () => {})
        expect(() => {
            addRoute(['GET'], '/static/path', [], () => {})
        }).toThrow()
    })

    test('should return null for an unknown route', () => {
        const result = findRoute('/unknown', 'GET')
        expect(result).toBeNull()
    })
})
