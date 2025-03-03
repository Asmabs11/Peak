import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (user) {
      axios
        .get(`/allOrders/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data.orders))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, token]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Placed on:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
