const express = require("express");
const app = express();
const os = require("os");
const { execSync } = require("child_process");

app.get("/", (req, res) => {
  const stats = {
    cpuInfo: os.cpus(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
    upTime: os.uptime(),
    temperature: execSync("vcgencmd measure_temp").toString().trim(),
  };
  res.json(stats);
});

app.listen(80, () => {
  console.log("[RASPBERRYPI STATS] : Running on port 80");
});
