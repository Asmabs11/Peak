import { updateProduct } from "../Redux/actions";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

const EditProduct = ({ el }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(el.name);
    const [description, setDescription] = useState(el.description);
    const [price, setPrice] = useState(el.price);
    const [stock, setStock] = useState(el.stock);
    const [brand, setBrand] = useState(el.brand);
    const [image, setImage] = useState(el.image);

    function openCloseModal() {
        setIsOpen(!modalIsOpen);
    }

    const dispatch = useDispatch();

    const updProduct = () => {
        const updatedProduct = { name, description, price, stock, brand, image };
        dispatch(updateProduct(el._id, updatedProduct));
    };

    return (
        <>
            <button onClick={openCloseModal}>Edit</button>
            <Modal isOpen={modalIsOpen} onRequestClose={openCloseModal}>
                <h2>Edit Product</h2>
                <button onClick={openCloseModal}>Close</button>
                <form>
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                    <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} />
                    <input type="number" placeholder="Stock" onChange={(e) => setStock(e.target.value)} value={stock} />
                    <input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} value={brand} />
                    <input type="text" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} value={image} />
                    <button onClick={updProduct}>Update</button>
                </form>
            </Modal>
        </>
    );
};

export default EditProduct;
