import { createApp } from "./app.js";
import {
  connectToDatabase,
  disconnectDatabase,
} from "./shared/database/prisma.js";
import { env } from "./shared/config/env.js";
import logger from "./shared/logger/logger.js";

const app = createApp();

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });

    server.on("error", async (error) => {
      await handleStartupFailure("Failed to start server", error);
    });
  } catch (error) {
    await handleStartupFailure("Application startup failed", error);
  }
}

async function handleStartupFailure(
  message: string,
  error: unknown,
): Promise<void> {
  logger.error(message, { error });

  try {
    await disconnectDatabase();
  } catch (disconnectError) {
    logger.error("Failed to disconnect from database", {
      error: disconnectError,
    });
  }

  process.exit(1); // Exit the process with an error code
}

startServer();
