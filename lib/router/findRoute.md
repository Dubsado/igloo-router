# findRoute Function Explanation

The `findRoute` function is designed to search for a handler that can service a given URL path. While doing so, it also captures any dynamic parameters. Here's a detailed breakdown:

## Steps

1. **Initialize Node and Parameters**

    - The function begins at the `root` node and initializes an empty `params` object.

2. **Path Segmentation**

    - Like `addRoute`, the function splits the URL path into segments.

3. **Tree Traversal**

    - For each segment, the function checks:
        - First for a matching static route in `staticChildren`.
        - If not found, then for a dynamic route in `dynamicChild`.
    - If neither is found, it exits the loop and returns `null`.

4. **Capture Parameters**

    - While traversing, if a dynamic node is reached, the function captures the dynamic segment value and stores it in the `params` object.

5. **Return Handler and Parameters**
    - Finally, if a handler is found, the function returns both the handler and any captured `params`. If not, it returns `null`.
