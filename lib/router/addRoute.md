# addRoute Function Explanation

The `addRoute` function serves to insert a new route into the trie data structure. This function operates in the following manner:

## Steps

1. **Initialize the Node**

    - Starts with a `root` node passed as an argument. This node acts as the entry point for all routes.

2. **Path Segmentation**

    - Splits the path passed to `addRoute` (e.g., `/users/:id`) into its individual segments, like ["users", ":id"].

3. **Traversing Nodes**

    - Iterates over each segment and performs the following checks:
        - If the segment is dynamic (starts with `:`), the function either moves to the existing dynamic child node or creates a new one.
        - If the segment is static, the function moves to that node if it exists or creates a new one otherwise.

4. **Storing the Handler**
    - Once it reaches the last segment, the function assigns the `handler` to that node. This handler will be responsible for serving requests that match this path.
