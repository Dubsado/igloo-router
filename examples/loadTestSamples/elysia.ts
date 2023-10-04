import { Elysia } from 'elysia'

new Elysia()
    .get('/id/:id', ({ params: { id } }) => {
        return {
            success: true,
            id,
        }
    })
    .listen(8080)
