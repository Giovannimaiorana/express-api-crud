const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/postsRouter");

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());


app.use("/posts", postsRouter);

app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
});