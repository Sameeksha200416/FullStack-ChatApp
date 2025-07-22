// Quick test users creation for production
// Run this in your Render shell: node create-users-production.js

import { config } from "dotenv";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

config();

async function createTestUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Define user schema inline
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      fullName: { type: String, required: true },
      password: { type: String, required: true, minlength: 6 },
      profilePic: { type: String, default: "" },
    }, { timestamps: true });

    const User = mongoose.model("User", userSchema);

    const hashedPassword = await bcryptjs.hash("123456", 10);

    const testUsers = [
      {
        email: "alice@example.com",
        fullName: "Alice Johnson", 
        password: hashedPassword,
        profilePic: "https://avatar.iran.liara.run/public/girl?username=alice",
      },
      {
        email: "bob@example.com",
        fullName: "Bob Smith",
        password: hashedPassword, 
        profilePic: "https://avatar.iran.liara.run/public/boy?username=bob",
      },
      {
        email: "charlie@example.com",
        fullName: "Charlie Brown",
        password: hashedPassword,
        profilePic: "https://avatar.iran.liara.run/public/boy?username=charlie",
      },
      {
        email: "diana@example.com",
        fullName: "Diana Prince",
        password: hashedPassword,
        profilePic: "https://avatar.iran.liara.run/public/girl?username=diana",
      }
    ];

    // Check if users already exist and create them
    for (const userData of testUsers) {
      try {
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
          await User.create(userData);
          console.log(`✅ Created user: ${userData.fullName} (${userData.email})`);
        } else {
          console.log(`⚠️ User already exists: ${userData.fullName} (${userData.email})`);
        }
      } catch (err) {
        console.log(`Error creating ${userData.email}:`, err.message);
      }
    }

    console.log("🎉 Test users setup complete!");
    console.log("\nYou can now login with any of these accounts:");
    console.log("📧 alice@example.com - Password: 123456");
    console.log("📧 bob@example.com - Password: 123456"); 
    console.log("📧 charlie@example.com - Password: 123456");
    console.log("📧 diana@example.com - Password: 123456");
    console.log("\n💡 Tip: Open multiple browser windows and login with different accounts to test real-time chat!");

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

createTestUsers();
