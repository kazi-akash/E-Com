import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../types/cartTypes'
import { 
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL
 } from '../types/orderTypes';
 import { logout } from '../actions/userActions';

 export const createOrder= (order) => async (dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_CREATE_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorMsg
    });
  }
}

export const getOrderDetails= (id) => async (dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorMsg
    });
  }
}

export const payOrder= (orderId, paymentResult) => async (dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_PAY_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: errorMsg
    });
  }
}

export const listMyOrders= () => async (dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: errorMsg
    });
  }
}

export const listOrders= () => async (dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_LIST_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: errorMsg
    });
  }
}

export const deliverOrder= (order) => async (dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_DELIVER_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
    //console.log(data ? `deliver: ${data}`: 'no data found for deliver')
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: errorMsg
    });
  }
}
