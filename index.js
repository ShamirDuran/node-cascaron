const { port, prefix } = require("./src/configs/env.config");
const testRouter = require("./src/routes/test.route");
const errorHandlerMiddleware = require("./src/middlewares/error.middleware");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json())
    .use(cors())
    .get(prefix, (req, res) => {
        res.json({ message: "ok" });
    })
    .use(`${prefix}/test`, testRouter)
    .use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
