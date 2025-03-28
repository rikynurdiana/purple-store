import React, {createContext, useContext, useReducer} from 'react';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  TOGGLE_SELECT,
  SELECT_ALL,
  CLEAR_CART,
  REMOVE_SELECTED,
} from '@/constant';
import type {CartItem} from '@/types';

type CartAction =
  | {
      type: typeof ADD_TO_CART;
      product: Omit<CartItem, 'quantity' | 'isSelected'>;
    }
  | {type: typeof REMOVE_FROM_CART; productId: number}
  | {type: typeof UPDATE_QUANTITY; productId: number; quantity: number}
  | {type: typeof TOGGLE_SELECT; productId: number}
  | {type: typeof SELECT_ALL; value: boolean}
  | {type: typeof CLEAR_CART}
  | {type: typeof REMOVE_SELECTED};

const CartContext = createContext<{
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity' | 'isSelected'>) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleSelect: (productId: number) => void;
  clearCart: () => void;
  selectAll: (value: boolean) => void;
  removeSelectedItems: () => void;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  toggleSelect: () => {},
  clearCart: () => {},
  selectAll: () => {},
  removeSelectedItems: () => {},
});

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.find(item => item.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...state, {...action.product, quantity: 1, isSelected: false}];
    }
    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.productId);
    case UPDATE_QUANTITY:
      return state.map(item =>
        item.id === action.productId
          ? {...item, quantity: action.quantity}
          : item,
      );
    case TOGGLE_SELECT:
      return state.map(item =>
        item.id === action.productId
          ? {...item, isSelected: !item.isSelected}
          : item,
      );
    case SELECT_ALL:
      return state.map(item => ({...item, isSelected: action.value}));
    case CLEAR_CART:
      return [];
    case REMOVE_SELECTED:
      return state.filter(item => !item.isSelected);
    default:
      return state;
  }
};

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: Omit<CartItem, 'quantity' | 'isSelected'>) =>
    dispatch({type: ADD_TO_CART, product});

  const removeFromCart = (productId: number) =>
    dispatch({type: REMOVE_FROM_CART, productId});

  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({type: UPDATE_QUANTITY, productId, quantity});

  const toggleSelect = (productId: number) =>
    dispatch({type: TOGGLE_SELECT, productId});

  const selectAll = (value: boolean) => dispatch({type: SELECT_ALL, value});

  const clearCart = () => dispatch({type: CLEAR_CART});

  const removeSelectedItems = () => dispatch({type: REMOVE_SELECTED});

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelect,
        clearCart,
        selectAll,
        removeSelectedItems,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
