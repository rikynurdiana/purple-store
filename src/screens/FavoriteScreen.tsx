import React, {memo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import ProductCard from '@/components/common/ProductCard';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import {useFavorite} from '@/context/FavoriteContext';
import {FAVORITE_SCREEN} from '@/constant';

function FavoriteScreen() {
  const {favoriteItems} = useFavorite();
  const [activeTab, setActiveTab] = useState(FAVORITE_SCREEN);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
      <View style={styles.container}>
        {favoriteItems.length === 0 ? (
          <Image
            source={require('@/assets/images/shopping.jpg')}
            style={styles.headerImage}
          />
        ) : (
          <Image
            source={require('@/assets/images/good-product.jpg')}
            style={styles.headerImage}
          />
        )}

        <Text style={styles.screenTitle}>Product You Liked</Text>

        <FlatList
          data={favoriteItems}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item}) => (
            <View style={styles.productCardContainer}>
              <ProductCard
                id={item.id}
                name={item.title}
                price={item.price}
                image={item.thumbnail}
                discount={item.discountPercentage}
                rating={item.rating}
                isLiked={true}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={require('@/assets/images/hand.png')}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>
                There are no products you like yet
              </Text>
            </View>
          }
        />
        <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 60,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  headerImage: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
  screenTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingBottom: 16,
    marginBottom: 8,
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCardContainer: {
    width: '48%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyImage: {
    width: 150,
    height: 150,
  },
});

export default memo(FavoriteScreen);
