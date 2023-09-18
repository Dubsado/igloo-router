import { Handler, Node, createNode, root } from '../node'

// Function to add a new route
export const addRoute = (
    path: string,
    middleware: Handler[],
    handler: Handler
): void => {
    // 1. Start at the root node
    let node: Node = root
    // 2. Split path into segments
    const segments = path.split('/').filter(Boolean)

    // Loop through each segment of the path
    for (const segment of segments) {
        // Dynamic route segment
        if (segment[0] === ':') {
            // Use existing or create new
            node = node.dynamicChild ??= createNode()
            // Store the parameter name without the ":"
            node.dynamicName = segment.slice(1)
        } else {
            // Static route segment (e.g., "users")
            // Use existing or create new
            node = node.staticChildren[segment] ??= createNode()
        }
    }
    // 4. Assign the handler to the final node
    node.handler = handler
    node.middleware = middleware
}
