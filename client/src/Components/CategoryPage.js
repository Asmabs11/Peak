import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../Redux/actions"; 

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`/products/findCategory/${categoryName}`)
      .then((response) => {
        setProducts(response.data.result);
        const initialQuantities = response.data.result.reduce((acc, product) => {
          acc[product._id] = 1; 
          return acc;
        }, {});
        setQuantities(initialQuantities);
      })
      .catch((error) => console.log(error));
  }, [categoryName]);

  
  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  
  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

 
  const handleAddToOrder = (product) => {
    if (!product || !product._id) {
      console.error("Invalid product data:", product);
      return;
    }
    if (!user || !user._id) {
      console.error("User not logged in");
      return;
    }
     const orderData = {
    userId: user?._id,  
    productId: product._id,
    quantity: quantities[product._id] || 1,
  };

  console.log("Sending Order Data:", orderData); 

  dispatch(addToCard(orderData));
};

const addProduct = () => {
  navigate('/products')
}

  return (
    <div className="category-page">
      {user &&
      
      user.isAdmin? (<button onClick={()=>addProduct()}>Add new product</button>): null}
      
      <h2>{categoryName.toUpperCase()}</h2>
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>

              
              <div className="quantity-control">
                <button className="quantity-btn" onClick={() => decreaseQuantity(product._id)}>−</button>
                <span className="quantity">{quantities[product._id]}</span>
                <button className="quantity-btn" onClick={() => increaseQuantity(product._id)}>+</button>
              </div>

            
              <button
                className="add-to-card-btn"
                onClick={() => handleAddToOrder(product)}
              >
                 🛒
              </button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
