import { useSelector, useDispatch } from "react-redux";
import { removeFromCard, placeOrder } from "../Redux/actions";

const Card = () => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.card);

    const handleRemove = (id) => {
        dispatch(removeFromCard(id));
    };

    const handleCheckout = () => {
        const userId = "USER_ID_HERE"; 
        dispatch(placeOrder({ userId, products: card }));
    };

    return (
        <div className="shopping-card">
            <h2>Shopping Card</h2>
            {card.length === 0 ? (
                <p>Your card is empty</p>
            ) : (
                card.map((item) => (
                    <div key={item._id} className="card-item">
                        <img src={item.image} alt={item.name} width="80" />
                        <h4>{item.name}</h4>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleRemove(item._id)}>Remove</button>
                    </div>
                ))
            )}
            {card.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
        </div>
    );
};

export default Card;

