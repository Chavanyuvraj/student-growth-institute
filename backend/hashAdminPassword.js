const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

async function hashAdminPassword() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");

  try {
    await client.connect();
    const db = client.db("studentDB");
    const users = db.collection("users");

    const hashedPassword = await bcrypt.hash("Yuva123", 10);

    const result = await users.updateOne(
      { email: "yuvrajchavan876@gmail.com" },
      { $set: { password: hashedPassword } }
    );

    console.log(result);

    if (result.matchedCount === 0) {
      console.log("❌ No user found. Check email");
    } else {
      console.log("✅ Password updated successfully!");
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

hashAdminPassword();