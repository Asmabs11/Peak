import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_AUTH,
  GET_PRODUCTS,
  ADD_TO_CARD,
  REMOVE_FROM_CARD,
  CLEAR_CARD,
  PLACE_ORDER,
  GET_ORDERS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_ADMINS,
  UPDATE_ADMIN,
} from "./actionTypes";
import axios from "axios";

export const signup = (newUser) => async (dispatch) => {
  await axios
    .post("/users/addUser", newUser)
    .then((res) => dispatch({ type: SIGNUP, payload: res.data }))
    .catch((err) => console.error(err));
};

export const login = (user, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/users/login", user);
    console.log(res.data.user.isAdmin);
    switch (res.data.user.isAdmin) {
      case true:
        navigate("/adminDashboard");
        break;
      case false:
        navigate("/userDashboard");
        break;
      default:
        navigate("/");
    }
    return dispatch({ type: LOGIN, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};

export const getAuth = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  await axios
    .get("/users/isAuth", config)
    .then((res) => dispatch({ type: GET_AUTH, payload: res.data }))
    .catch((err) => console.error(err));
};

export const getProducts = () => async (dispatch) => {
  await axios
    .get("/products/allProducts")
    .then((res) => dispatch({ type: GET_PRODUCTS, payload: res.data.result }))
    .catch((err) => console.error(err));
};

export const addProduct = (newProduct) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     authorization: localStorage.getItem("token"),
  //   },
  // };
  
  try {
    
    await axios.post("/products/addProduct", newProduct);
    console.log("hello")
    dispatch(getProducts());
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct =
  (idProduct, updatedProduct) => async (dispatch) => {
    await axios
      .put(`/products/updateProduct/${idProduct}`, updatedProduct)
      .then(() => dispatch(getProducts))
      .catch((err) => console.error(err));
  };

export const deleteProduct = (idProduct) => async (dispatch) => {
  await axios
    .delete(`/products/deleteProduct/${idProduct}`)
    .then(() => dispatch(getProducts))
    .catch((err) => console.error(err));
};
export const addToCard = (product) => async (dispatch) => {
  await axios
    .post("/orders/addOrder", product)
    .then((res) => dispatch({ type: ADD_TO_CARD, payload: res.data.newOrder }))
    .catch((err) => console.error(err));
};
export const removeFromCard = (productId) => ({
  type: REMOVE_FROM_CARD,
  payload: productId,
});
export const clearCard = () => ({
  type: CLEAR_CARD,
});
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    const response = await fetch("/orders/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    dispatch({ type: PLACE_ORDER, payload: data });
    dispatch(clearCard());
  } catch (error) {
    console.error("Order error", error);
  }
};
export const getUserOrders = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/orders/user/${userId}`);
    dispatch({ type: GET_ORDERS, payload: res.data.userOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const getProductsbycategory = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/findCategory/${category}`);
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: res.data.result });
  } catch (error) {
    console.erro("Error fetching Category", error);
  }
};
export const getAdmins = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const res = await axios.get(`/admin/allAdmins`, config);
    console.log("Fetched admins:", res.data.admins);
    dispatch({ type: GET_ADMINS, payload: res.data.admins });
  } catch (error) {
    console.error("Error fetching Admins", error);
  }
};
export const updateAdmins = (_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/updateAdmin/${_id}`);
    dispatch({
      type: UPDATE_ADMIN,
      payload: res.data.updatedUser,
    });
    dispatch(getAdmins());
  } catch (error) {
    console.error("Error fetching Admins", error);
  }
};
