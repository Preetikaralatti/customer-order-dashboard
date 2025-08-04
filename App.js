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

export default App;