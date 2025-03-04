import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import "./App.css";
import Signupform from "./Components/Signupform";
import Loginform from "./Components/Loginform";
import { Routes, Route } from "react-router-dom";
import NavB from "./Components/NavB";
import AddProduct from "./Components/AddProduct";
import CardPage from "./Components/CardPage";
import ProductDetails from "./Components/ProductDetails";
import CategoryPage from "./Components/CategoryPage";
import DashboardUser from "./Components/DashboardUser";
import DashboardAdmin from "./Components/DashboardAdmin";
import Footer from "./Components/Footer";
import ProductAdmin from "./Components/ProductAdmin";
import OrderAdmin from "./Components/OrderAdmin";
import AdminsList from "./Components/AdminsList";
import Header from "./Components/Header";
import AdminRoute from "./Components/AdminRoute";

function App() {
  return (
    <div className="App">
      <NavB />

      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/Signup" element={<Signupform />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<AddProduct />} />
        <Route path="/orders" element={<CardPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/userDashboard" element={<DashboardUser />} />
        <Route
          path="/adminDashboard"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        >
          <Route path="/adminDashboard/product" element={<ProductAdmin />} />
          <Route path="/adminDashboard/order" element={<OrderAdmin />} />
          <Route path="/adminDashboard/admins" element={<AdminsList />} />
          <Route index element={<DashboardAdmin />} />
        </Route>
      </Routes>
      <Footer />

    </div>
 

  );
}

export default App;
