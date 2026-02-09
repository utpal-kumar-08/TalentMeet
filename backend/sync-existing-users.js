// Script to manually sync existing Clerk users to Stream
// Run this with: bun run sync-existing-users.js

import { connectDB } from "./src/lib/db.js";
import User from "./src/models/User.js";
import { upsertStreamUser } from "./src/lib/stream.js";

await connectDB();

// Get all users from database
const users = await User.find();

console.log(`Found ${users.length} users in database`);

// Sync each user to Stream
for (const user of users) {
  try {
    await upsertStreamUser({
      id: user.clerkId,
      name: user.name,
      image: user.profileImage,
    });
    console.log(`✅ Synced user: ${user.name}`);
  } catch (error) {
    console.error(`❌ Failed to sync user ${user.name}:`, error);
  }
}

console.log("Sync complete!");
process.exit(0);
