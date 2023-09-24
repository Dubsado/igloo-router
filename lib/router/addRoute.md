# addRoute Function Documentation

## Overview

The `addRoute` function serves as a way to add new routes to a route tree. This tree is made up of `Node` objects which represent segments of the routes. The function takes care of both static and dynamic segments while registering a new route, allowing for great flexibility and control over the routing process.

## Function Signature

```typescript
function addRoute(
    methods: string[],
    path: string,
    middleware: Handler[],
    handler: Handler
): void
```

## Parameters

-   `methods`: An array of HTTP methods (`GET`, `POST`, `PUT`, etc.) that the route will respond to.
-   `path`: A string representing the URL path for the route (e.g., "/api/user/:id").
-   `middleware`: An array of middleware functions that will be executed before the main handler when the route is accessed.
-   `handler`: The main function that will handle the route request.

## Example Usage

```typescript
addRoute(['GET'], '/api/user/:id', [authMiddleware], getUserHandler)
```

## Error Handling

1. **Dynamic Child Exists**: If a dynamic segment (e.g., ":userId") already exists for the same parent node, an error will be thrown.

    ```
    Cannot have multiple of the same path. Segment: :userId
    ```

2. **Handler Exists**: If a handler for a specific HTTP method already exists for the same path, an error will be thrown.

    ```
    Cannot have multiple of the same path. Path: /api/user/:id
    ```

## Internal Functions

### handleSegment

Handles a single segment of the path while traversing the route tree.

### checkDynamicChildExists

Checks if a dynamic child already exists for a given node and throws an error if it does.

### checkHandlerExists

Checks if a handler already exists for a given HTTP method and path and throws an error if it does.

## Note

Make sure to import this function and use it only after importing the `Node`, `Handler`, and other required types and the root node from your Node module.

Hope this version works better for you!
