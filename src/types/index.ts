import {NavigationProp} from '@react-navigation/native';
import {
  HOME_SCREEN,
  PRODUCT_DETAIL_SCREEN,
  CART_SCREEN,
  FAVORITE_SCREEN,
  PROFILE_SCREEN,
  PAYMENT_SCREEN,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '@/constant';

export type NavigationProps = NavigationProp<RootStackParamList>;

export type RootStackParamList = {
  [HOME_SCREEN]: undefined;
  [PRODUCT_DETAIL_SCREEN]: {productId: number};
  [CART_SCREEN]: undefined;
  [FAVORITE_SCREEN]: undefined;
  [PROFILE_SCREEN]: undefined;
  [PAYMENT_SCREEN]: undefined;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type FormattedProduct = {
  id: number;
  name: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};

export interface ProductDetail extends Product {
  reviews: Array<{
    rating: number;
    comment: string;
    reviewerName: string;
    date: string;
  }>;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  returnPolicy: string;
  minimumOrderQuantity: number;
}

export type FavoriteAction =
  | {type: typeof ADD_FAVORITE; product: ProductDetail}
  | {type: typeof REMOVE_FAVORITE; product: ProductDetail};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  isSelected: boolean;
};
