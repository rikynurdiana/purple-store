import React, {memo, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Rating from '@/components/common/Rating';
import {PRODUCT_DETAIL_SCREEN} from '@/constant';
import type {NavigationProps} from '@/types';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  rating?: number;
  image: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isLiked?: boolean;
};

function ProductCard({
  id,
  name,
  price,
  discount = 0,
  rating = 0,
  image,
  isLiked,
}: ProductCardProps) {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = useCallback(() => {
    navigation.navigate(PRODUCT_DETAIL_SCREEN, {productId: id});
  }, [id, navigation]);

  return (
    <Pressable
      style={styles.card}
      onPress={handlePress}
      accessibilityRole="button">
      {isLiked && (
        <View style={styles.favoriteBadge}>
          <Image
            source={require('@/assets/icons/like.png')}
            style={styles.favoriteIcon}
          />
        </View>
      )}
      <Image
        source={{uri: image}}
        style={styles.image}
        resizeMode="cover"
        defaultSource={require('@/assets/icons/photo.png')}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toLocaleString('en-US')}</Text>
          {Math.round(discount) > 0 && (
            <Text style={styles.discount}>{Math.round(discount)}% OFF</Text>
          )}
        </View>
        <Rating value={rating} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      android: {
        elevation: 3,
        overflow: 'hidden',
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#a687c4',
  },
  content: {
    padding: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    minHeight: 40,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  discount: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 64, 129, 0.9)',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
});

export default memo(ProductCard);
