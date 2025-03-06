const { port, prefix } = require("./src/configs/env.config");

// Express
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get(`/${prefix}`, (req, res) => res.json({ message: "ok" }));
app.use(`/${prefix}/test`, require("./src/routes/test.route"));
app.use(`/${prefix}/aep`, require("./src/routes/aep.route"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
