import { handler, router, root } from '../lib/'
import { printRoutes, listRoutes } from '../lib/utils/listRoutes'
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

router.get('/random/:id', logRequest, randomHandler)
router.get('/random/things/do/work', logRequest, randomHandler)
router.get('/', logRequest, () => {
    return new Response(
        `
    <html>
        <p>Hello, Bonjour, Hola, Привет, こんにちは, Olá</p>
        <p>This example will show you the power of being able to see what 
            dang routes you actually have on the server</p>
        ${Routes()}
    </html>
    `,
        {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        }
    )
})

const routes = listRoutes(root)
const Routes = () => {
    const inner = routes
        .map((route) => {
            if (
                route.method === 'GET' &&
                !route.isDynamic &&
                route.path !== '/'
            ) {
                return `<li>${route.method} - <a href="${route.path}">${route.path}</a></li>`
            }
            return `<li>${route.method} - ${route.path}</li>`
        })
        .join('')
    return `
        <ul>
            ${inner}
        </ul>
    `
}

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

console.log('')
console.log('Logs: ', new Date().toLocaleString())
