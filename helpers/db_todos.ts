import {
  Database,
  MongoClient,
} from 'https://deno.land/x/mongo@v0.32.0/mod.ts';

let db: Database;

export async function connectDb() {
  const client = new MongoClient();
  await client.connect(
    'mongodb+srv://alterego:VDZblygQRxHbBq0r@clusterfirstnodeapp.ubtp1kv.mongodb.net/deno-todos?authMechanism=SCRAM-SHA-1'
  );
  db = client.database('deno-todos');
  console.log('DB connected');
}

export function getDb() {
  return db;
}
