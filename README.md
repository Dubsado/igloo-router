<img src="https://github.com/Dubsado/igloo-router/blob/main/docs/igloo-logo-day.png" height="100" />

> **Disclaimer:** _This code is not "production-ready"... btw._

## What is Igloo-Router?

Chill out, we've got you covered. Igloo-Router is a lightning-fast routing library for your server that's as cool as its name. With just **1.92KB** of minified JavaScript code, it's so lightweight, you'd think it was made of snowflakes. 🌨️

## Quick Start ❄️ 🚀

1.  **Create Your Igloo (Project Folder)**:

```
mkdir myProject
cd myProject
```

2.  **Initialize Bun**:

```
bun init
```

3.  **Install the Igloo-Router**:

```
bun add igloo-router
```

4.  **Copy one of the examples from below code into your project's index.ts then run it**

```
bun run index.ts
```

## Simple Routing Example

```javascript
import { handler, router } from 'igloo-router'
import { logRequest } from './middleware/log-request'

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
```

## Example: List Routes

```javascript
//additional dependency added here for print routes
import { handler, router, printRoutes, listRoutes } from 'igloo-router'
import { logRequest } from './middleware/log-request'

// ...include your routes as we have defined them above

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

//this is where we create the HTML for the landing '/' url
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
```

## Why Choose Igloo-Router?

-   **Lean**: Just 1.92KB of minified Javascript code.
-   **Quick**: Express functionality, without the performance hit.
-   **Transparency**: See your routes in action both on the console and the landing page. No more mysteries! 🕵️‍♀️

## Conclusion

Still not convinced? Fine, go use one of those other "heated" routers. But when you're sick of them melting under pressure, you know where to find us.

❄️ Stay frosty, developers! ❄️

Feel free to share feedback or report issues. We're as obsessed with our users as a snowman is with winter. 🌨️💙

👉 [Contribute on GitHub](https://github.com/Dubsado/igloo-router)
