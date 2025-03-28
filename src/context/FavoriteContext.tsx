import React, {createContext, useContext, useReducer} from 'react';
import {ADD_FAVORITE, REMOVE_FAVORITE} from '@/constant';
import type {ProductDetail, FavoriteAction} from '@/types';

const FavoriteContext = createContext<{
  favoriteItems: ProductDetail[];
  addFavorite: (product: ProductDetail) => void;
  removeFavorite: (product: ProductDetail) => void;
}>({
  favoriteItems: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

const favoriteReducer = (state: ProductDetail[], action: FavoriteAction) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.product];
    case REMOVE_FAVORITE:
      return state.filter(data => data.id !== action.product.id);
    default:
      return state;
  }
};

export const FavoriteProvider = ({children}: {children: React.ReactNode}) => {
  const [favoriteItems, dispatch] = useReducer(favoriteReducer, []);

  const addFavorite = (product: ProductDetail) =>
    dispatch({type: ADD_FAVORITE, product});
  const removeFavorite = (product: ProductDetail) =>
    dispatch({type: REMOVE_FAVORITE, product});

  return (
    <FavoriteContext.Provider
      value={{favoriteItems, addFavorite, removeFavorite}}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
