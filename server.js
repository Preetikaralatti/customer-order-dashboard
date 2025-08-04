const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let orders = [
  { id: 1, customer: "Alice", item: "Laptop", status: "Shipped" },
  { id: 2, customer: "Bob", item: "Keyboard", status: "Processing" }
];

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  });