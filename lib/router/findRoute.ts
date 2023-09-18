import { Handler, root } from '../node'

type Return = {
    handler: Handler
    middleware: Handler[]
    params: Record<string, string>
}

// Function to find a route and its handler
export const findRoute = (path: string): Return | null => {
    // 1. Start at the root node
    let node = root
    // 2. Split path into segments
    const segments = path.split('/').filter(Boolean)
    // Initialize params object
    const params: Record<string, string> = {}
    for (const segment of segments) {
        // 3. Loop through each segment
        // First try to match a static route
        if (node.staticChildren[segment]) {
            node = node.staticChildren[segment]
        } else if (node.dynamicChild) {
            // If no static route, try to match a dynamic route
            node = node.dynamicChild
            // 4. Capture the dynamic parameter
            params[node.dynamicName!] = segment
        } else {
            // 3. No matching route, exit
            return null
        }
    }
    // 5. Return result
    if (!node.handler) {
        return null
    }

    return {
        handler: node.handler,
        middleware: node.middleware,
        params,
    }
}
