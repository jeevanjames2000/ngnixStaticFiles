const express = require("express");
const app = express();
const PORT = process.argv[2]?.split("=")[1] || process.env.PORT || 5000;
app.get("/", (req, res) => {
  setTimeout(() => {
    res.send(`Server running on port ${PORT}`);
  }, 300);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
