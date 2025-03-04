import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Redux/actions";
import EditProduct from "./EditProduct";
import { addToCard } from "../Redux/actions";
import { useState } from "react";

const ProductCard = ({ el }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user);


  const delProduct = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(el._id));
      window.location.reload()
    }
  };

  const handleAddToCard = () => {
    if (quantity > 0) {
      dispatch(
        addToCard({ quantity: quantity, productId: el._id, userId:user._id })
      );
    } else {
      alert("Quantity must be at least 1");
    }
  };

  return (
    <div className="product-image" style={{marginLeft: "50px"}}>
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

      <div className="product-actions">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button
          className="fa fa-plus-circle"
          onClick={handleAddToCard}
        ></button>

        {user && user.isAdmin && (
          <>
            <button className="delete-btn" onClick={delProduct}>
              Delete
            </button>
            
            <EditProduct el={el} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
