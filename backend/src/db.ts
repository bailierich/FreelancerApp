import dotenv from "dotenv";
import { Db, MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

// MongoDB connection URI from MongoDB Atlas
const uri: string = process.env.MONGODB_URI || "";
let db: Db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    db = client.db();

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

function getDB(): Db {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}

export { connectDB, getDB };
