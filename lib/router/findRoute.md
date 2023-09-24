# findRoute Function Documentation

## Overview

The `findRoute` function is a critical component of the routing system, designed to locate a specific route within a given route tree of `Node` objects. It not only returns the handler associated with the route but also gathers any middleware and URL parameters.

## Function Signature

```typescript
export const findRoute = (
  path: string,
  method: HTTPMethods
): Return | null
```

## Parameters

-   `path`: A string representing the URL path you want to find within the route tree (e.g., "/api/user/:id").
-   `method`: An HTTP method (such as `GET`, `POST`, `PUT`, etc.) representing the type of the request.

## Return Value

Returns an object of type `Return` or `null` if the route is not found. The `Return` type contains:

-   `handler`: The main function to handle the route request.
-   `middleware`: An array of middleware functions that should be executed before the main handler.
-   `params`: A `Record` of URL parameters, if any.

## Example Usage

```typescript
const result = findRoute('/api/user/1', 'GET')

if (result) {
    const { handler, middleware, params } = result
    // ... execute middleware and handler
}
```

## Error Handling

If no route is found that matches the provided `path` and `method`, the function returns `null`.

## Internal Functions

### loopSegments

Traverses each segment of the `path`, starting from the root, and attempts to find a corresponding node.

### handleSegment

Invoked for each segment of the path to find the corresponding node based on static or dynamic segments.

## Note

To use this function properly, make sure to import `findRoute` and the required types like `HTTPMethods`, `Handler`, and `Node`. Also, ensure that your route tree (`root`) is appropriately initialized and populated using `addRoute` or similar functions.
