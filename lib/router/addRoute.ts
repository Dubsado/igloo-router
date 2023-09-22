import { Handler, Node, createNode, root } from '../node'

// Function to add a new route
export const addRoute = (
    path: string,
    middleware: Handler[],
    handler: Handler
): void => {
    let node: Node = root
    const segments = path.split('/').filter(Boolean)

    for (const segment of segments) {
        //Process this segment
        node = handleSegment(node, segment)
    }
    if (node.handler) {
        throw new Error(`This route has already been defined. Path::${path}`)
    }
    //Assign the handler to the final node
    node.handler = handler
    node.middleware = middleware
}

//Handles a single portion of the segment loop
function handleSegment(node: Node, segment: string) {
    //Dynamic route segment (e.g., ":userId")
    if (segment[0] === ':') {
        checkDynamicChildExists(node, segment)
        node.dynamicChild = node = createNode()
        //Store the parameter name without the ":"
        node.dynamicName = segment.slice(1)
    }
    //Static route segment (e.g., "users")
    else {
        //Use existing or create new
        node = node.staticChildren[segment] ??= createNode()
    }
    return node
}

//If there's already a dynamic child, throw and error with the segment data logged
function checkDynamicChildExists(node: Node, segment: string) {
    if (node.dynamicChild) {
        throw new Error(
            `Cannot have multiple of the same path. Segment:${segment}`
        )
    }
}
