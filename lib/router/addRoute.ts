import { Handler, Node, createNode, root } from '../node'
// Function to add a new route
export function addRoute(
    methods: string[],
    path: string,
    middleware: Handler[],
    handler: Handler
) {
    let node: Node = root
    const segments = path.split('/').filter(Boolean)

    for (const segment of segments) {
        //Process this segment
        node = handleSegment(node, segment)
    }
    //Assign the handler to the final node
    for (const method of methods) {
        checkHandlerExists(node, method, path)
        //@ts-ignore
        node.handler[method] = handler
    }
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

//If there's already a dynamic child, throw and error with the segment data logged
function checkHandlerExists(node: Node, method: string, path: string) {
    //@ts-ignore
    if (node.handler[method]) {
        throw new Error(`Cannot have multiple of the same path. Path:${path}`)
    }
}
