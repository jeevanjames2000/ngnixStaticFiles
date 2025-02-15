const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = process.argv[2]?.split("=")[1] || process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
  setTimeout(() => {
    res.send(`Server running on port ${PORT}`);
  }, 300);
});
app.post("/webhook", (req, res) => {
  console.log("Received Webhook:", req.body);
  if (req.body.ref === "refs/heads/main") {
    console.log("Pulling latest changes...");
    exec(
      "cd /home/jeevan/Desktop/ngnixStaticFiles && git pull origin main && pm2 restart all",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send("Deployment failed");
        }
        console.log(`Output: ${stdout}`);
        console.error(`Errors: ${stderr}`);
        res.status(200).send("Deployment successful!");
      }
    );
  } else {
    res.status(200).send("No deployment needed");
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
