import { Db, MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (!process.env.MONGO_DB_NAME) {
  throw new Error('Please add your Mongo DB Name to .env.local')
}

if (!process.env.MONGO_COLLECTION) {
  throw new Error('Please add your Mongo Collection to .env.local')
}

let dbProm: Promise<Db>;
const opts: MongoClientOptions = {}

if (process.env.NODE_ENV === 'production') {
  dbProm = MongoClient.connect(process.env.MONGO_URI, opts)
  .then(client => client.db(process.env.MONGO_DB_NAME))
  .catch(err => {
    throw new Error(JSON.stringify(err));
  })
} else {
  let globalWithDb = global as typeof globalThis & {
    dbProm: Promise<Db>;
  };

  if (!globalWithDb.dbProm) {
    globalWithDb.dbProm = MongoClient.connect(process.env.MONGO_URI, opts)
    .then(client => client.db(process.env.MONGO_DB_NAME))
    .catch(err => {
      throw new Error(JSON.stringify(err));
    });
  }
  dbProm = globalWithDb.dbProm;
}

export default dbProm;