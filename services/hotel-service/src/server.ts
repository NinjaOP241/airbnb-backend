import { createApp } from "./app.js";
import { connectToDatabase } from "./shared/database/prisma.js";
import { env } from "./shared/config/env.js";
import logger from "./shared/logger/logger.js";

const app = createApp();

export async function startServer() {
  await connectToDatabase();
  app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
}

startServer().catch((err) => {
  // app.listen can throw an error if the port is already in use
  logger.error("Failed to start server:", err);
  process.exit(1); // Exit the process with an error code
});
