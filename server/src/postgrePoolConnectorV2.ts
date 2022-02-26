
import { Client } from 'pg';
//to allow local use
const connectionURL = `postgres://crohgweyigjjyu:2a90b5f07730f57e9c94b5c42f1ea13416f1df0cfd5d8a6a5421a0ade8b7d4b7@ec2-34-202-65-210.compute-1.amazonaws.com:5432/dck2jo8jo4g2ie`;


export function runQuery<T>(queryString: string): Promise<T[]> {
  console.log(queryString);
  return new Promise(
    (resolve, reject) => {
      const client = new Client({
        connectionString: process.env.DATABASE_URL || connectionURL,
        ssl: { rejectUnauthorized: false }
      })
      client.connect().then((res: any) => {
        client.query(queryString, [], (err: any, result: any) => {
          if (err) reject(err);
          else resolve(<T[]>result?.rows);
          client.end();
        })
      }).catch((err: any) => reject(err.details))
    }
  )
}