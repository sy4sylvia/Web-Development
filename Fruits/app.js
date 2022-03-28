const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017"
// Create a new MongoClient
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();

    const database = client.db("fruitsDB");
    const haiku = database.collection("fruits");
    // create a document to insert
    const doc = [
      {
        name: "Berries",
        score: 8,
        review: "Good for health but expensive",
      },
      {
        name: "Watermelon",
        score: 9,
        review: "Fruit for the summer!!",
      },
      {
        name: "Orange",
        score: 8,
        review: "Turns me yellow..."
      },
      {
        name: "Banana",
        score: 9,
        review: "Awesome!"
      }
    ];
    const result = await haiku.insertMany(doc);

    console.log("Fruits were inserted.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
