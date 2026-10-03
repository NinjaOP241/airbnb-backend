import { PrismaClient } from "../../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "../logger/logger.js";
import { env } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (err) {
    logger.error("Database connection failed", {
      error: err,
    });
    process.exit(1); // Exit the process with an error code
  }
}
