const prisma = require("./prisma-client");

// optional: test connection
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to MySQL successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MySQL:", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
