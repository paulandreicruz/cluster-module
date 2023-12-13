import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

console.log(`Thye total number of CPUs is ${cpuCount}`);
console.log(`Master ${process.pid} is running`);
cluster.setupPrimary({
  exec: __dirname + "/index.js",
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}
cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died`);
  console.log("Starting a new worker");
  cluster.fork();
});
