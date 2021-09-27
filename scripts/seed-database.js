import { seedDatabase } from "../src/database/seed-database";

seedDatabase()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
