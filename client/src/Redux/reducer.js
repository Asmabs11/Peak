import {
  GET_AUTH,
  LOGIN,
  LOGOUT,
  SIGNUP,
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

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  products: [],
  card: [],
  admins: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };
    case GET_AUTH:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_TO_CARD:
      return { ...state, card: [...state.card, action.payload] };
    case REMOVE_FROM_CARD:
      return {
        ...state,
        card: state.card.filter((item) => item._id !== action.payload),
      };
    case CLEAR_CARD:
      return { ...state, card: [] };
    case PLACE_ORDER:
      return { ...state, card: [] };
    case GET_ORDERS:
      return action.payload;
    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, products: action.payload };
    case GET_ADMINS:
      return { ...state, admins: action.payload };
    case UPDATE_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
