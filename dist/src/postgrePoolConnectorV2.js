"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
//to allow local use
const connectionURL = `postgres://crohgweyigjjyu:2a90b5f07730f57e9c94b5c42f1ea13416f1df0cfd5d8a6a5421a0ade8b7d4b7@ec2-34-202-65-210.compute-1.amazonaws.com:5432/dck2jo8jo4g2ie`;
function runQuery(queryString) {
    console.log(queryString);
    return new Promise((resolve, reject) => {
        const client = new pg_1.Client({
            connectionString: process.env.DATABASE_URL || connectionURL,
            ssl: { rejectUnauthorized: false }
        });
        client.connect().then((res) => {
            client.query(queryString, [], (err, result) => {
                var _a;
                if (err)
                    reject(err);
                else
                    resolve((_a = result) === null || _a === void 0 ? void 0 : _a.rows);
                client.end();
            });
        }).catch((err) => reject(err.details));
    });
}
exports.runQuery = runQuery;
//# sourceMappingURL=postgrePoolConnectorV2.js.map