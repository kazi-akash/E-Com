import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers, productDetailsReducers, productDeleteReducers, productCreateReducers, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, updateUserProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers';

const reducers = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productDelete: productDeleteReducers,
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer
});

const cartItemFromStorage = localStorage.getItem('cartItems')?
      JSON.parse(localStorage.getItem('cartItems')): [];

const userInfoFromStorage = localStorage.getItem('userInfo')?
      JSON.parse(localStorage.getItem('userInfo')): null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
      JSON.parse(localStorage.getItem('shippingAddress')): {};

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: {userInfo: userInfoFromStorage}
};

const store = createStore(
  reducers, 
  initialState,  
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;