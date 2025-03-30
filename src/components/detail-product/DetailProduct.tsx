import {memo, useCallback} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Rating from '@/components/common/Rating';
import InfoProduct from '@/components/detail-product/InfoProduct';
import {useFavorite} from '@/context/FavoriteContext';
import ReviewItem from '@/components/detail-product/ReviewItem';
import type {ProductDetail} from '@/types';

function DetailProduct({
  product,
  isFavorite,
  setIsFavorite,
}: {
  product: ProductDetail | null;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
}) {
  const {addFavorite, removeFavorite} = useFavorite();

  const handleFavoriteToggle = useCallback(() => {
    if (product) {
      if (isFavorite) {
        removeFavorite(product);
      } else {
        addFavorite(product);
      }
      setIsFavorite(!isFavorite);
    }
  }, [product, isFavorite, addFavorite, removeFavorite, setIsFavorite]);

  if (!product) {
    return null;
  }

  return (
    <>
      <Image source={{uri: product.thumbnail}} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>{product.brand || 'Purple Brand'}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.ratingContainer}>
            <Rating value={product.rating} />
            <Text style={styles.reviewCount}>({product.reviews.length})</Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.price}>
            ${product.price.toLocaleString('en-US')}
          </Text>
          {Math.round(product.discountPercentage) > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(product.discountPercentage)}% OFF
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}>
            <Image
              source={
                isFavorite
                  ? require('@/assets/icons/like.png')
                  : require('@/assets/icons/like-empty.png')
              }
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <InfoProduct
            icon="stock"
            label="Stock"
            value={`${product.stock} units`}
          />
          <InfoProduct
            icon="delivery"
            label="Shipping"
            value={product.shippingInformation}
          />
          <InfoProduct
            icon="shield"
            label="Warranty"
            value={product.warrantyInformation}
          />
          <InfoProduct
            icon="cart"
            label="MOQ"
            value={product.minimumOrderQuantity.toString()}
          />
          <InfoProduct
            icon="weight"
            label="Weight"
            value={`${product.weight} kg`}
          />
          <InfoProduct
            icon="dimension"
            label="Dimensions"
            value={`${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth} cm`}
          />
          <InfoProduct
            icon="return"
            label="Returns"
            value={product.returnPolicy}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {product.reviews.map((review, index) => (
            <ReviewItem key={`review-${index}`} review={review} />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: 400,
    resizeMode: 'cover',
    backgroundColor: '#a687c4',
  },
  content: {
    marginTop: -20,
    backgroundColor: '#0A0A0F',
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  brand: {
    color: '#6B4EFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    color: '#888',
    marginLeft: 8,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#0A0A0F',
    borderRadius: 20,
    padding: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  infoSection: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default memo(DetailProduct);
