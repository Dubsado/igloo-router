export type Handler = string | null | Function

export interface Node {
    handler: Handler
    middleware: Handler[]
    staticChildren: Record<string, Node>
    dynamicChild: Node | null
    dynamicName: string | null
}

// Function to create a new node
export const createNode = (): Node => ({
    handler: null,
    middleware: [],
    staticChildren: {},
    dynamicChild: null,
    dynamicName: null,
})

export const root = createNode()
