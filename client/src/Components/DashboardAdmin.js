import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdmins, getProducts, getUserOrders } from "../Redux/actions";
import { Link, Outlet } from "react-router";

const DashboardAdmin = () => {
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
    <>
      <div className="dashboard-container">
        <div className="sidebar">
          <h2>Dashboard Overview</h2>

          <div className="sidebar-section">
            <Link to={"/adminDashboard/admins"}>
              <h3>Admins ({admins.length})</h3>
            </Link>
            <ul>
              {admins.map((admin) => (
                <li key={admin._id}>{admin.fullName}</li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <Link to={"/adminDashboard/product"}>
              <h3>Products ({products.length})</h3>
            </Link>
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
      </div>
      <div className="dashboard-admin">
        <h1>Admin Dashboard</h1>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardAdmin;
