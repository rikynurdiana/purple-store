import {NavigationProp, RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: {productId: number};
  Cart: undefined;
  LikeScreen: undefined;
  ProfileScreen: undefined;
};

export type NavigationProps = NavigationProp<RootStackParamList>;
export type ProductDetailRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;

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
