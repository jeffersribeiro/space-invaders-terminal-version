import "dotenv/config";
import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (_req, res) => {
  res
    .type("text/html")
    .sendFile(path.join(__dirname, "/presentation/screens/main/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
