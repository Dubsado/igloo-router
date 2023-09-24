import { HTTPMethods, Handler, addRoute } from '..'

const addRouteByMethod = (
    method: HTTPMethods,
    path: string,
    middleware: Handler[],
    handler: Handler
) => {
    addRoute([method], path, middleware, handler)
}

const methodWrapper = (METHOD: HTTPMethods) => {
    return (path: string, ...middleware: Handler[]) => {
        const handler = middleware.pop()
        addRouteByMethod(METHOD, path, middleware, handler!)
    }
}

export const router = {
    get: methodWrapper('GET'),
    post: methodWrapper('POST'),
    delete: methodWrapper('DELETE'),
    put: methodWrapper('PUT'),
}
