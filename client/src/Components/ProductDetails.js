import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCard } from "../Redux/actions"; 

const ProductDetails = () => {
    const { productId } = useParams(); 
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        
        const fetchProductDetails = async () => {
            try {
              
                const response = await fetch(`/products/allProducts${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);  

    const handleAddToCard = () => {
        if (product) {
            const { _id, name, price, image } = product;
            dispatch(addToCard({ _id, name, price, image, quantity: 1 }));
        }
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <img src={product.image} alt={product.name} width="300" />
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <button onClick={handleAddToCard}>Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
