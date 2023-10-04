import express, { Request, Response } from 'express'

// Initialize the Express app
const app = express()

// Route to handle GET with path parameter, e.g., /api/items/1
app.get('/api/items/:id', (req: Request, res: Response) => {
    const { id } = req.params
    // Your logic here, e.g., database fetching based on id
    res.json({ success: true, id })
})

// Start the server
const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
