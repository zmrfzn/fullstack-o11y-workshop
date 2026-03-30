const logger = require("./app/logger");
const fs = require("fs");
const https = require("https");
const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();


// Allow CORS for local dev, Codespaces, and preview URLs
const allowedOrigins = [
  'http://localhost:80',
  'http://localhost:3000',
  'http://127.0.0.1:80',
  'http://127.0.0.1:3000',
  'https://localhost:80',
  'https://localhost:3000',
  'https://127.0.0.1:80',
  'https://127.0.0.1:3000',
  // Codespaces and GitHub Codespaces preview URLs
  /https:\/\/.+-\d+\.app\.github\.dev$/,
  /https:\/\/.+-\d+\.githubpreview\.dev$/,
  // Instruqt sandbox URLs
  /https?:\/\/[^.]+\.[a-z0-9]+\.instruqt\.io(:\d+)?$/
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.some(o => {
        if (typeof o === 'string') return o === origin;
        if (o instanceof RegExp) return o.test(origin);
        return false;
      })
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

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
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tutorial application." });
});

require("./app/routes/tutorial.routes")(app);

// Serve React frontend (production build — used in Instruqt and production)
// In dev (Codespaces), the Vite dev server runs separately on port 3000.
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// Block accidental 302 redirects for API routes (Codespaces/proxy safety)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/') && (res.statusCode === 302 || res.statusCode === 301)) {
    logger.warn(`Blocked ${res.statusCode} redirect for API route: ${req.originalUrl}`);
    return res.status(400).json({ message: 'Unexpected redirect for API route', path: req.originalUrl });
  }
  next();
});
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