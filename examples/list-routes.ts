import { handler, addRoute } from '../lib/'
import { printRoutes } from '../lib/router/listRoutes'
import { logRequest } from './middleware/log-request'

const randomHandler = (req: Request, params: { id: string }) => {
    return new Response(
        JSON.stringify({
            url: req.url,
            success: true,
            id: params.id,
        })
    )
}

addRoute(['GET'], '/random/:id', [logRequest], randomHandler)
addRoute(['GET'], '/random/things/do/work', [logRequest], randomHandler)

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
