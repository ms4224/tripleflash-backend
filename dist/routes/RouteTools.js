"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteTools {
    static genericSuccessResponse(res, payload) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin, access-control-allow-origin, *');
        console.log('done updating.');
        res.status(200);
        res.send(payload ? payload : { message: 'done updating' });
    }
    static genericErrorResponse(res, err) {
        console.log('there was an error!', err);
        res.status(400);
        res.send(err ? err : { message: 'there was an error...', errorDetails: err });
    }
}
exports.RouteTools = RouteTools;
//# sourceMappingURL=RouteTools.js.map