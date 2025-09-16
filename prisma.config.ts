import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("zmodel/prisma", "schema.prisma"),
  migrations: {
    path: path.join("zmodel", "migrations"),
    seed: "tsx zmodel/seeddb/seed.ts",
  },
  views: {
    path: path.join("zmodel/views", "views"),
  },
  typedSql: {
    path: path.join("zmodel/queries", "queries"),
  }
});
