import { handler, addRoute } from '../lib/'
import { logRequest } from './middleware/log-request'

const healthHandler = (req: Request) => {
    return new Response('hello')
}
addRoute('/health', [logRequest], healthHandler)

const randomJsonHandler = (req: Request, params: { id: string }) => {
    return new Response(
        JSON.stringify({
            success: true,
            id: params.id,
        })
    )
}
addRoute('/random-json/:id', [logRequest], randomJsonHandler)
/**
 * Spark up this server.
 */
const server = Bun.serve({
    port: 3000,
    fetch: handler,
})

console.log(`Basic routing examples on http://localhost:${server.port}`)
