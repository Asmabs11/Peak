import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAdmins, getProducts, getUserOrders } from "../Redux/actions";
import EditProduct from "./EditProduct";
import { Link } from "react-router";

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const admins = useSelector((state) => state.admins || []);
  const orders = useSelector((state) => state.orders || []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAdmins());
        dispatch(getUserOrders());
  }, []);

  // const redirectAdd = () => {
  //     navigate("/products");
  // };

  const delProduct = (el) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(el._id));
    }
  };

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

          <div className="product-section">
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
      {products &&
        products.map((el, i) => (
          <div key={i} className="product-card">
            <img src={el.image} alt={el.name} className="product-image" />
            <h3>{el.name}</h3>
            <p>{el.description}</p>
            <p>
              <strong>Brand:</strong> {el.brand}
            </p>
            <p>
              <strong>Stock:</strong> {el.stock}
            </p>
            <p>
              <strong>Price:</strong> ${el.price}
            </p>
            <button className="delete-btn" onClick={() => delProduct(el)}>
              Delete
            </button>
            <EditProduct el={el} />
          </div>
        ))}
      {/* <button onClick={redirectAdd}>Add New Product</button> */}
    </>
  );
};

export default ProductAdmin;
