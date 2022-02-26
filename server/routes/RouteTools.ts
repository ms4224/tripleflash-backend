
export class RouteTools {

    public static genericSuccessResponse(res: any, payload?: any) {
        console.log('done updating.')
        res.status(200);
        res.send(payload ? payload : {message: 'done updating'});
    }
    
    public static genericErrorResponse(res: any, err?: any) {
        console.log('there was an error!', err)
        res.status(400);
        res.send(err ? err : {message: 'there was an error...', errorDetails: err})
    }

}