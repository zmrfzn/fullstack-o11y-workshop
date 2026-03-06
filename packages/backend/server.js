const logger = require("./app/logger");
const fs = require("fs");
const https = require("https");
const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* Uncomment for setting up DT for frontend */

//set custom headers
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Headers", ["newrelic","traceparent","tracestate"]);
//   return next();
// });

const db = require("./database");
db.sequelize
  .sync()
  .then(() => {
    logger.info("Synced & Connected to the database!");
  })
  .catch((err) => {
    logger.error("Cannot connect to the database!", err.message);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tutorial application." });
});

require("./app/routes/tutorial.routes")(app);
const weather = require("./app/routes/weather.routes");
app.use("/api/weather",weather);

// Handle 404 - Route Not Found
app.use((req, res, next) => {
  /* Commenting out 404 tracking
  // custom event for 404
  newrelic.recordCustomEvent('RouteNotFound_custom', {
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
  */
  
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

if (USE_HTTPS) {
  // SSL Configuration
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost+2.pem'))
  };

  try {
    // Start HTTPS server
    https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
      logger.info(`HTTPS Server is running on port ${HTTPS_PORT}.`);
      logger.info(`Visit https://localhost:${HTTPS_PORT} for secure connection`);
    });
    
    // Optionally start HTTP server for redirects
    app.listen(PORT, () => {
      logger.info(`HTTP Server is running on port ${PORT}.`);
      logger.info(`Visit http://localhost:${PORT} for regular connection`);
    });
    
  } catch (error) {
    logger.error('Error starting HTTPS server:', error);
    process.exit(1);
  }
} else {
  // Standard HTTP server
  try {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
    
  } catch (error) {
    console.error(error);
  }
}