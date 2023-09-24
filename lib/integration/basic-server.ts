import { handler, router } from '..'

router.get('/health', (req: Request) => {
    return new Response('hello')
})

router.get('/random-json/:id', (req: Request, params: { id: string }) => {
    return new Response(
        JSON.stringify({
            success: true,
            id: params.id,
        })
    )
})

export const server = Bun.serve({
    port: 3000,
    fetch: handler,
})
