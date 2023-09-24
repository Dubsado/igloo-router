<img src="https://github.com/Dubsado/igloo-router/blob/main/docs/igloo-logo-day.png" height="100" />

_This code is not "production ready," btw._

Create your project folder: `mkdir myProject`

Initialize bun: `bun init`

Install the Igloo-Router: `bun add igloo-router`

Copy this code to get basic routing installed:

```javascript
import { handler, addRoute, printRoutes } from 'igloo-router'
import { logRequest } from './middleware/log-request'

const healthHandler = (req: Request) => {
    return new Response('hello')
}
addRoute(['GET'], '/health', [logRequest], healthHandler)

const randomJsonHandler = (req: Request, params: { id: string }) => {
    return new Response(
        JSON.stringify({
            success: true,
            id: params.id,
        })
    )
}
addRoute(['GET'], '/random-json/:id', [logRequest], randomJsonHandler)
/**
 * Spark up this server.
 */
const server = Bun.serve({
    port: 3000,
    fetch: handler,
})

console.log(`
d8b        888                 
Y8P        888           http://localhost:${server.port}      
           888                 
888 .d88b. 888 .d88b.  .d88b.  
888d88P"88b888d88""88bd88""88b 
888888  888888888  888888  888 
888Y88b 888888Y88..88PY88..88P 
888 "Y88888888 "Y88P"  "Y88P"  
        888                    
   Y8b d88P                    
    "Y88P"                     
`)
printRoutes()
```

# Why

Because the other guys are slow and bulky! Our uncompressed code has 1.92KB of minified Javascript code.
