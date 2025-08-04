import React, { useEffect, useState } from 'react';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Customer Order Dashboard</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.customer} ordered {order.item} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
import React from "react";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <CustomerList />
    </div>
  );
}


export default App;
