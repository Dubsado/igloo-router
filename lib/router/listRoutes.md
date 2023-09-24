# ListRoutes Function Documentation

## Overview

The `listRoutes` function is designed to traverse the route tree made of `Node` objects and list all available routes. The function performs a depth-first traversal, ensuring that routes are listed in alpha-numeric order. This is crucial for understanding what endpoints are available and how they are structured.

## Function Signature

```typescript
export const ListRoutes = (node: Node, pathSoFar: string = ""): Route[]
```

## Parameters

-   `node`: The starting node for the traversal, usually the root node of the route tree.
-   `pathSoFar`: An optional string parameter that keeps track of the path for the current traversal, defaulting to an empty string.

## Return Value

Returns an array of `Route` objects where each `Route` object contains:

-   `method`: A string representing the HTTP method (`GET`, `POST`, etc.)
-   `path`: A string representing the URL path of the route

## Example Usage

```typescript
const root = createNode()
const routes = listRoutes(root)
for (const route of routes) {
    console.log(`${route.method} ${route.path}`)
}
```

## Traversal Logic

The function employs depth-first search (DFS) to:

1. Traverse all static child nodes, sorted by their keys.
2. Traverse the dynamic child node, if available.
3. Collect HTTP methods associated with each node.

This ensures that the routes are listed in alpha-numeric order.

## Note

Be sure to import `listRoutes` and use it only after importing the required `Node` and `Route` types as well as any other required types or nodes.
