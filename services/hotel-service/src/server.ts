import { createApp } from "./app.js";
import { connectToDatabase } from "./shared/database/prisma.js";
import { env } from "./shared/config/env.js";

const app = createApp();

export async function startServer() {
  await connectToDatabase();
  app.listen(env.PORT, () => {
    console.log(`[server]: Running on port ${env.PORT}`);
  });
}

startServer().catch((err) => {
  // app.listen can throw an error if the port is already in use
  console.error("[server]: Failed to start", err);
  process.exit(1); // Exit the process with an error code
});
