//read up on the module here https://node-postgres.com/features/pooling

const { Pool } = require('pg')

const connstring = 'postgres://crohgweyigjjyu:2a90b5f07730f57e9c94b5c42f1ea13416f1df0cfd5d8a6a5421a0ade8b7d4b7@ec2-34-202-65-210.compute-1.amazonaws.com:5432/dck2jo8jo4g2ie';
const connectionString = process?.env?.DATABASE_URL ? process.env.DATABASE_URL : connstring;
const pool = new Pool({
  connectionString: connectionString,
  // connectionString: 'postgres://crohgweyigjjyu:2a90b5f07730f57e9c94b5c42f1ea13416f1df0cfd5d8a6a5421a0ade8b7d4b7@ec2-34-202-65-210.compute-1.amazonaws.com:5432/dck2jo8jo4g2ie',
  ssl: {rejectUnauthorized: false},
})

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// callback - checkout a client
function executeQuery(queryString, cb) {
  console.log('debug, here is conn string', process.env.DATABASE_URL, connectionString, queryString)
  pool.connect((err, client, done) => {
    if (err) console.log(err);
    console.log(queryString);
    client.query(queryString, (err, res) => {
      done()

      if (err) {
        console.log(err.stack)
      }
      // else {
      //   console.log(res.rows[0])
      // }

      if ((cb != undefined) && (typeof (cb) === 'function')) cb(err, res);
    })
  })
}


module.exports = {
  executeQuery: executeQuery
}