const express = require("express");
const app = express();
const cors = require("cors");
const os = require("os");
const { execSync } = require("child_process");

app.use(
  cors({
    origin: "*", // This allows all origins
  })
);

//⚠️ Functions to format Data
// Convert bytes to gigabytes
const bytesToGB = (bytes) => (bytes / 1024 ** 3).toFixed(2);
// Convert uptime from seconds to hours, minutes, and seconds
const secondsToHMS = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
};

//GET METHOD

app.get("/", (req, res) => {
  const cpuNum = os.cpus().length;
  const platform = os.platform();
  const hostname = os.hostname();
  const totalMem = os.totalmem();
  const formattedTotalMem = bytesToGB(totalMem);
  const freeMem = os.freemem();
  const formattedFreeMem = bytesToGB(freeMem);
  const upTime = os.uptime();
  const formattedUptime = secondsToHMS(upTime);
  const memoryUsage = ((freeMem / totalMem) * 100).toFixed(2);
  const temperature = execSync("vcgencmd measure_temp").toString().trim();
  const stats = {
    hostname: hostname,
    platform: platform,
    cpu: cpuNum,
    memUsage: `${memoryUsage} %`,
    freeMemory: `${formattedFreeMem} GB / ${formattedTotalMem} GB`,
    upTime: formattedUptime,
    temp: temperature,
  };
  res.json(stats);
});

app.listen(80, () => {
  console.log("[RASPBERRYPI STATS] : Running on port 80");
});
