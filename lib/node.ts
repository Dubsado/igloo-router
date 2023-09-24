export type Handler = string | null | Function

export type HTTPMethods = 'GET' | 'PUT' | 'DELETE' | 'OPTIONS' | 'POST'

export type HandlerMap = {
    [K in HTTPMethods]: Handler
}

export interface Node {
    middleware: Handler[]
    staticChildren: Record<string, Node>
    handler: HandlerMap
    dynamicChild?: Node
    dynamicName?: string
}

// Function to create a new node
export const createNode = (): Node => ({
    //@ts-ignore
    handler: {},
    middleware: [],
    staticChildren: {},
})

export const root = createNode()
