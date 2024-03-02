const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB database is connected.");
  } catch (error) {
    console.error(`There was an error when connecting to database: ${error}`);
  }
}

main();
