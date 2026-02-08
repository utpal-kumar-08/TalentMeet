// Test script to manually create a Stream user
// Run this with: bun run test-stream-user.js

import { upsertStreamUser } from "./src/lib/stream.js";

const testUser = {
  id: "test-user-123",
  name: "Test User",
  image: "https://via.placeholder.com/150"
};

await upsertStreamUser(testUser);
console.log("Test user created in Stream!");
