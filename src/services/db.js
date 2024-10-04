const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT, DB_PORT } = process.env;

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,  // Include the port
  logging: console.log,  // Log SQL queries for debugging
});

// Function to drop tables
/**async function dropTables() {
  try {
    await sequelize.transaction(async (t) => {
      // Drop the Tasks table if it exists
      await sequelize.models.Task.drop({ transaction: t }).catch(() => {});
      // Drop the Users table if it exists
      await sequelize.models.User.drop({ transaction: t }).catch(() => {});
    });
    console.log("Tables dropped successfully.");
  } catch (error) {
    console.error("Error dropping tables:", error);
  }
}**/

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Run the functions sequentially
async function run() {
  await testConnection();  // Test the connection first
  //await dropTables();      // Then drop the tables if required
}

// Execute the run function
run();

module.exports = sequelize;
