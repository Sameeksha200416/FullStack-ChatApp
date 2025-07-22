// Quick test users creation for production
// Run this in your Render shell or any Node.js environment connected to your MongoDB

import { config } from "dotenv";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  profilePic: { type: String, default: "" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function createTestUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

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
      }
    ];

    // Check if users already exist
    for (const userData of testUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.fullName}`);
      } else {
        console.log(`⚠️ User already exists: ${userData.fullName}`);
      }
    }

    console.log("🎉 Test users setup complete!");
    console.log("You can now login with any of these accounts:");
    console.log("Email: alice@example.com, Password: 123456");
    console.log("Email: bob@example.com, Password: 123456"); 
    console.log("Email: charlie@example.com, Password: 123456");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createTestUsers();
