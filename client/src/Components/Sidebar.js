import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins, getProducts, getUserOrders } from "../Redux/actions";
import { Link } from "react-router";

const Sidebar = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins || []);
  const products = useSelector((state) => state.products || []);
  const orders = useSelector((state) => state.orders || []);

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getProducts());
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <h2>Dashboard Overview</h2>

      <div className="sidebar-section">
        <Link to={"/adminDashboard/product"}><h3>Admins ({admins.length})</h3></Link>
        {/* <ul>
          {admins.map((admin) => (
            <li key={admin._id}>{admin.fullName}</li>
          ))}
        </ul> */}
      </div>

      <div className="sidebar-section">
        <h3>Products ({products.length})</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Orders ({orders.length})</h3>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              {order.user?.fullName || "Unknown"} - {order.totalPrice}€
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
