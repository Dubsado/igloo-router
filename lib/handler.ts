import { HTTPMethods } from '.'
import { findRoute } from '../lib/router/findRoute'

export const handler = async (req: Request) => {
    // URL to parse
    const myURL = new URL(req.url)
    const route = findRoute(myURL.pathname, req.method as HTTPMethods)
    if (!route) {
        return new Response(
            `Path: '${myURL.pathname}' not found in the Igloo Router`,
            {
                status: 404,
                statusText: 'Not Found',
            }
        )
    }
    if (typeof route.handler === 'function') {
        for (const middleware of route.middleware) {
            if (typeof middleware === 'function') {
                await middleware(req)
            }
        }
        return route.handler(req, route.params)
    }
    return new Response(
        JSON.stringify({
            pathname: myURL.pathname,
            route,
        })
    )
}
