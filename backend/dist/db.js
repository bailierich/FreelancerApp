import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();
// MongoDB connection URI from MongoDB Atlas
const uri =
  "mongodb+srv://browngirldev:Ck7VRGs2RC7tZDR5@user.pveqp4i.mongodb.net/?retryWrites=true&w=majority&appName=User";

let db;
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
function getDB() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}
export { connectDB, getDB };
