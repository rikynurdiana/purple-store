export const HOME_SCREEN = 'HomeScreen';
export const PRODUCT_DETAIL_SCREEN = 'ProductDetailScreen';
export const CART_SCREEN = 'CartScreen';
export const FAVORITE_SCREEN = 'FavoriteScreen';
export const PROFILE_SCREEN = 'ProfileScreen';

export type TAB_TYPE =
  | typeof HOME_SCREEN
  | typeof CART_SCREEN
  | typeof FAVORITE_SCREEN
  | typeof PROFILE_SCREEN;

export const TAB_ICONS: Record<TAB_TYPE, any> = {
  [HOME_SCREEN]: require('@/assets/icons/home.png'),
  [CART_SCREEN]: require('@/assets/icons/love.png'),
  [FAVORITE_SCREEN]: require('@/assets/icons/cart.png'),
  [PROFILE_SCREEN]: require('@/assets/icons/profile.png'),
};

export const HOME_SLIDER = [
  require('@/assets/images/header2.jpg'),
  require('@/assets/images/header3.jpg'),
  require('@/assets/images/header4.jpg'),
];

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const TOGGLE_SELECT = 'TOGGLE_SELECT';
export const SELECT_ALL = 'SELECT_ALL';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';
