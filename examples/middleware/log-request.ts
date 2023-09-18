export const logRequest = (req: Request) => {
    console.log(req.method + ' - ' + req.url)
}
