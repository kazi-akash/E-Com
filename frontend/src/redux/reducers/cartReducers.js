import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS
   } from '../types/cartTypes';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch(action.type)
  {
    case CART_ADD_ITEM:
      const item = action.payload;
      const itemExist = state.cartItems.find(x => x.product === item.product); //cheking cart for product that already exist or not
   
      if(itemExist) // if product exist then it will return the product 
      {
        return{
          ...state,
          cartItems: state.cartItems.map(x => (x.product === item.product) ? item: x
        )
        } 
      }
      else { // if product already not exist then it will add to the cart
        return{
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_REMOVE_ITEM:
      return{
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload) 
        //action.payload not equal then it will return rest product exect this by filtering it
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return{
        ...state, 
        shippingAddress: action.payload
      }

    case CART_SAVE_PAYMENT_METHOD:
      return{
        ...state, 
        paymentMethod: action.payload
      }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }

    default: 
    {
      return state;
    }
  }
}