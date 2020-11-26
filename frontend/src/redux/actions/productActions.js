import axios from 'axios';
import { PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST, 
         PRODUCT_DETAILS_SUCCESS, 
         PRODUCT_DETAILS_FAIL,
         PRODUCT_DELETE_REQUEST, 
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_DELETE_FAIL,
         PRODUCT_CREATE_REQUEST, 
         PRODUCT_CREATE_SUCCESS, 
         PRODUCT_CREATE_FAIL,
         PRODUCT_UPDATE_REQUEST, 
         PRODUCT_UPDATE_SUCCESS, 
         PRODUCT_UPDATE_FAIL,
         PRODUCT_CREATE_REVIEW_REQUEST, 
         PRODUCT_CREATE_REVIEW_SUCCESS, 
         PRODUCT_CREATE_REVIEW_FAIL,
         PRODUCT_TOP_REQUEST, 
         PRODUCT_TOP_SUCCESS, 
         PRODUCT_TOP_FAIL} 
from '../types/productTypes';
import { logout } from '../actions/userActions';

export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => { 
  try { 
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    //console.log("P list data: ",data)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const listProducts = (keyword= '', pageNumber= '') => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_REQUEST });

//     await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
//     .then(({ data }) => {
//       dispatch({
//         type: PRODUCT_LIST_SUCCESS,
//         payload: data
//       });
//     })
//   } catch (error) {
//     const errorMsg= (error.response && error.response.data.message)? 
//                     error.response.data.message: error.message;
//     dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload: errorMsg
//     });
//   }
// }


export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    await axios.get(`/api/products/${id}`)
    .then(({ data }) => {
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
      });
    })
  } catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errorMsg
    });
  }
}

export const deleteProduct= (id) => async (dispatch, getState) => {
  try{
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: errorMsg
    });
  }
}

export const createProduct= () => async (dispatch, getState) => {
  try{
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/products`, {}, config); //using {} empty object its post request but we are not sending any data here

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
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
      type: PRODUCT_CREATE_FAIL,
      payload: errorMsg
    });
  }
}

export const updateProduct= (product) => async (dispatch, getState) => {
  try{
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/products/${product._id}`, product, config); //using {} empty object its post request but we are not sending any data here

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
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
      type: PRODUCT_UPDATE_FAIL,
      payload: errorMsg
    });
  }
}

export const createProductReview= (productId, review) => async (dispatch, getState) => {
  try{
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    })
    //destructuring userInfo from getState(redux store) -> userLogin  
    const { userLogin: { userInfo } } = getState();  

    const config= {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.post(`/api/products/${productId}/reviews`, review, config); //using {} empty object its post request but we are not sending any data here

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS
    })
  }
  catch (error) {
    const errorMsg= (error.response && error.response.data.message)? 
                    error.response.data.message: error.message;
    if (errorMsg === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: errorMsg
    });
  }
}

export const listTopProducts = () => async (
  dispatch
) => { 
  try { 
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get(`/api/products/top`)
    //console.log("P list data: ",data)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

