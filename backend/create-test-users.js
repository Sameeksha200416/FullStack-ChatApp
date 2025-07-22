import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

config();

const createTestUsers = async () => {
  try {
    await connectDB();

    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 1) {
      console.log("Users already exist in database");
      process.exit(0);
    }

    const hashedPassword = await bcryptjs.hash("123456", 10);

    const testUsers = [
      {
        email: "john.doe@example.com",
        fullName: "John Doe",
        password: hashedPassword,
        profilePic: "https://avatar.iran.liara.run/public/boy?username=john",
      },
      {
        email: "jane.smith@example.com", 
        fullName: "Jane Smith",
        password: hashedPassword,
        profilePic: "https://avatar.iran.liara.run/public/girl?username=jane",
      },
      {
        email: "mike.wilson@example.com",
        fullName: "Mike Wilson", 
        password: hashedPassword,
        profilePic: "https://avatar.iran.liara.run/public/boy?username=mike",
      }
    ];

    await User.insertMany(testUsers);
    console.log("✅ Test users created successfully!");
    console.log("You can now login with:");
    console.log("Email: john.doe@example.com, Password: 123456");
    console.log("Email: jane.smith@example.com, Password: 123456");
    console.log("Email: mike.wilson@example.com, Password: 123456");

  } catch (error) {
    console.error("Error creating test users:", error);
  } finally {
    process.exit(0);
  }
};

createTestUsers();
