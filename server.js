const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";



// Dynamically get URL based on environment
const getServerUrl = () => {
    // In production, use the explicitly set PRODUCTION_URL
    if (process.env.NODE_ENV === 'production') {
      return process.env.PRODUCTION_URL;
    }
    // In development, use localhost with the current port
    return `http://localhost:${PORT}`;
  };



// Swagger setup 
if (process.env.NODE_ENV !== 'production' && process.env.ENABLE_SWAGGER === 'true') {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Todo API",
        version: "1.0.0",
        description: process.env.NODE_ENV === 'production' 
          ? "PRODUCTION API - Use with caution" 
          : "Development API Documentation"
      },
      servers: [{ 
        url: getServerUrl(),
        description: process.env.NODE_ENV === 'production' 
          ? 'Production server' 
          : 'Development server'
      }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ["./routes/*.js"]
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  
  // Serve Swagger UI with proper assets
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }));

  // Serve Swagger JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });

  console.log(`Swagger UI available at ${getServerUrl()}/api-docs`);
}

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Todo API",
    docs: `Visit /api-docs for documentation`
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;