const mongoose = require("mongoose");

// MongoDB URLs for source and target databases
const sourceMongoUrl =
  "mongodb+srv://hunghoang:hunghoang@cluster0.xrb3qu6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const targetMongoUrl =
  "mongodb+srv://wibu:wibu@cluster0.57u19nz.mongodb.net/wibuManagement?retryWrites=true&w=majority";

// Transfer data from the source database to the target database
async function transferData() {
  // Create separate connections for source and target databases
  const sourceConnection = mongoose.createConnection(sourceMongoUrl);
  const targetConnection = mongoose.createConnection(targetMongoUrl);

  await new Promise((resolve, reject) => {
    sourceConnection.once("connected", resolve);
    sourceConnection.on("error", reject);
  });

  await new Promise((resolve, reject) => {
    targetConnection.once("connected", resolve);
    targetConnection.on("error", reject);
  });

  try {
    console.log("Connected to Source MongoDB");

    // Drop target database to ensure a clean transfer
    await targetConnection.db.dropDatabase();
    console.log("Target database dropped.");

    // Fetch all collections from the source database
    const collections = await sourceConnection.db.listCollections().toArray();

    for (const collection of collections) {
      const colName = collection.name;
      console.log(`Fetching data from collection: ${colName}`);

      // Retrieve documents from the source collection
      const documents = await sourceConnection.db
        .collection(colName)
        .find()
        .toArray();

      if (documents.length) {
        console.log(`Inserting data into target collection: ${colName}`);

        // Insert documents into the target database
        const targetCollection = targetConnection.db.collection(colName);
        await targetCollection.insertMany(documents);
      }
    }

    console.log("Data transfer completed successfully");
  } catch (error) {
    console.error("Data transfer failed:", error);
  } finally {
    // Close both connections
    await sourceConnection.close();
    await targetConnection.close();
    console.log("Connections closed.");
  }
}

// Start data transfer
transferData();
