// import { MongoClient, MongoClientOptions } from 'mongodb';

// const uri: string = process.env.MONGODB_URI ?? '';

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }
// let client: MongoClient;
// var clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }
// const opts: MongoClientOptions = {}

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, opts)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
//   console.log('dev create client')
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, opts)
//   console.log('created client')
//   console.log(client)
//   clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise

import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_COLLECTION!

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

const connectToDatabase = async (): Promise<{ client: MongoClient; db: Db }> => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: MongoClientOptions = {}

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then(client => {
      return {
        client,
        db: client.db(MONGODB_DB)
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

// export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
//   const conn = await connectToDatabase()
//   return await fn(conn.db)
// }

export default connectToDatabase;