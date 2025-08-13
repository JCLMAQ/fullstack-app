import { defineConfig } from "prisma/config";



  // "prisma": {
  //   "seed": " npx tsx zmodel/seeddb/seed.ts",
  //   "schema": "./zmodel/prisma/schema.prisma"
  // },

export default defineConfig({
  schema: "./zmodel/prisma/schema.prisma",


  // migrations: {
  //   seed: `npx tsx zmodel/seeddb/seed.ts`, // error with dotenv
  //   // seed: `dotenv -e ../.env npx tsx zmodel/seeddb/seed.ts`, // works with dotenv
  // },
});
