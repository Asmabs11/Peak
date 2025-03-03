import { useState } from "react";
import { addProduct } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");  
  const [category, setCategory] = useState("");
//   const [imageFile, setImageFile] = useState(null);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/uploads/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(response.data.imageUrl);  
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addNewProduct = async () => {
    const newProduct = { name, description, price, stock, brand, image, category };
    await dispatch(addProduct(newProduct));
    navigate("/home");
  };

  return (
    <>
      <h1>Add Product</h1>
      <form>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
        <input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
        
      
        <input 
          type="file" 
          onChange={(e) => {
            const file = e.target.files[0];
            // setImageFile(file);
            //console.log(file)
            uploadImage(file);  
          }} 
        />
        {image && <img src={`http://localhost:5000${image}`} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}

        <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      </form>

      <button onClick={addNewProduct}>Add</button>
    </>
  );
};

export default AddProduct;

