const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("News Explorer API is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
