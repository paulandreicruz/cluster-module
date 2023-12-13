import express from "express";

const app = express();
const port = 3000;

app.get("/test", (req, res) => {
  let total = 0;
  for (let i = 0; i < 500000; i++) {
    total++;
  }
  res.send(`The result of the CPU intensive operation is ${total}`);
});

app.listen(port, () => {
  console.log(`App listening at ${port}`);
  console.log(`Worker ${process.pid} started`);
});
