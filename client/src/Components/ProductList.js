import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router";

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const redirectAdd = () => {
        navigate("/products");
    };

    return (
        <>
            {products && products.map((el) => <ProductCard el={el} key={el._id} />)}
            {user && user.isAdmin &&(
             <button onClick={redirectAdd}>Add New Product</button>
            )}
    
        </>
    );
};

export default ProductList;
