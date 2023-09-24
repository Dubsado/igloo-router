import { handler, router } from '../lib/'

//let's define some middleware
export const logRequest = (req: Request) => {
    console.log(req.method + ' - ' + req.url)
}

router.get('/health', logRequest, (req: Request) => {
    return new Response('hello')
})

router.get(
    '/random-json/:id',
    logRequest,
    (req: Request, params: { id: string }) => {
        return new Response(
            JSON.stringify({
                success: true,
                id: params.id,
            })
        )
    }
)

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

console.log('')
console.log('Logs: ', new Date().toLocaleString())
