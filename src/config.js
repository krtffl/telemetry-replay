require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  FRONTEND_FILENAME: process.env.FRONTEND_FILENAME || 'frontend.html',
  USE_STREAMS: process.env.USE_STREAMS || false,
  SIMULATION_FILENAME: process.env.SIMULATION_FILENAME || 'simfile.json',
};
