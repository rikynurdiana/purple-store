import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Button,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCart} from '@/context/CartContext';
import {useFavorite} from '@/context/FavoriteContext';
import DetailProdcut from '@/components/detail-product/DetailProduct';
import {CART_SCREEN, PRODUCT_DETAIL_SCREEN} from '@/constant';
import type {RootStackParamList, ProductDetail} from '@/types';

type ProductDetailScreenProps = {
  route: RouteProp<RootStackParamList, typeof PRODUCT_DETAIL_SCREEN>;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    typeof PRODUCT_DETAIL_SCREEN
  >;
};

function ProductDetailScreen({route, navigation}: ProductDetailScreenProps) {
  const {addToCart, cartItems} = useCart();
  const {favoriteItems} = useFavorite();
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetail = useCallback(async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${route.params.productId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [route.params.productId]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  useEffect(() => {
    if (product) {
      const isProductFavorite = favoriteItems.some(
        item => item.id === product.id,
      );
      setIsFavorite(isProductFavorite);
    }
  }, [product, favoriteItems]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchProductDetail} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
      <View style={styles.container}>
        <ScrollView>
          <DetailProdcut
            product={product}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('@/assets/icons/arrow-left.png')}
              style={styles.tabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() =>
              product &&
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
              })
            }>
            <Text style={styles.addToCartText}>
              {cartItems.find(item => item.id === product?.id)
                ? `Already in Cart (${
                    cartItems.find(item => item.id === product?.id)?.quantity
                  })`
                : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate(CART_SCREEN)}>
            <Image
              source={require('@/assets/icons/cart.png')}
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0F',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0F',
    padding: 20,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: '#0A0A0F',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartButton: {
    backgroundColor: '#2D2D2D',
    padding: 12,
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#6B4EFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default memo(ProductDetailScreen);
