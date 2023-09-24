import { root, Node } from '../node'

type Route = {
    method: string
    path: string
}

//Loop through all of the routes and return them in an array
export const listRoutes = (node: Node, pathSoFar: string = ''): Route[] => {
    let routes: Route[] = []

    // Traverse static children
    const staticChildrenKeys = Object.keys(node.staticChildren).sort()
    for (const key of staticChildrenKeys) {
        routes = routes.concat(
            listRoutes(node.staticChildren[key], `${pathSoFar}/${key}`)
        )
    }
    // Traverse dynamic child if exists
    if (node.dynamicChild) {
        const dynamicName = node.dynamicChild.dynamicName!
        routes = routes.concat(
            listRoutes(node.dynamicChild, `${pathSoFar}/:${dynamicName}`)
        )
    }
    // Add current node's handlers
    const methods = Object.keys(node.handler).sort() as string[]
    routes = routes.concat(
        methods.map((method) => ({ method, path: pathSoFar || '/' }))
    )

    return routes
}

//Print all routes to console
export const printRoutes = () => {
    const routes = listRoutes(root)
    for (const route of routes) {
        console.log(`${route.method} ${route.path}`)
    }
}
