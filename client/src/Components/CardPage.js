import { useSelector, useDispatch } from "react-redux";
import { removeFromCard } from "../Redux/actions";

const CardPage = () => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Card</h2>
      {card.length === 0 ? <p>Your card is empty.</p> : (
        card.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} width="50" />
            <p>{item.name} - ${item.price} x {item.quantity}</p>
            <button onClick={() => dispatch(removeFromCard(item._id))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CardPage;
