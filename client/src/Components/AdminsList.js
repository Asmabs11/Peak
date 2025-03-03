import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins, getProducts, getUserOrders } from "../Redux/actions";
import { Link } from "react-router-dom";

const AdminsList = () => {
  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins);
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders || []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAdmins());
    dispatch(getUserOrders());
  }, [dispatch]);

  const isLoading = useSelector((state) => state.isLoading);

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

      <div className="admin-list-container">
        <h2>Admin List</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {admins ? (
              <ul>
                {admins.map((admin) => (
                  <li key={admin._id}>
                    <p>{admin.fullName}</p>
                    <p>Email: {admin.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No admins available</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminsList;
