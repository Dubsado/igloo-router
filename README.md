# igloo

Basic routing example:

```javascript
import { handler, addRoute } from '../lib/'

addRoute('/health', [], (req: Request) => {
    return new Response('hello')
})

addRoute('/random-json/:id', [], (req: Request, params: { id: string }) => {
    return new Response(
        JSON.stringify({
            success: true,
            id: params.id,
        })
    )
})
/**
 * Spark up this server.
 */
const server = Bun.serve({
    port: 3000,
    fetch: handler,
})

console.log(`Basic routing examples on http://localhost:${server.port}`)
```
