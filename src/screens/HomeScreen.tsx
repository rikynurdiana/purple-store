import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
  ActivityIndicator,
  ImageBackground,
  Text,
} from 'react-native';
import ProductCard from '@/components/common/ProductCard';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import Categories from '@/components/home/Categories';
import SearchBar from '@/components/home/SearchBar';
import ImageSlide from '@/components/common/ImageSlide';
import TopCategory from '@/components/home/TopCategory';
import useDebounce from '@/utils/useDebounce';
import {HOME_SCREEN, HOME_SLIDER} from '@/constant';
import type {Category, FormattedProduct, Product} from '@/types';

function HomeScreen() {
  const [activeTab, setActiveTab] = useState(HOME_SCREEN);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [emptyProducts, setEmptyProducts] = useState<boolean>(false);

  const scrollRef = useRef<FlatList>(null);
  const productListRef = useRef(null);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      const formattedCategories: Category[] = [
        {
          slug: 'all',
          name: 'All',
          url: 'https://dummyjson.com/products',
        },
        ...data.map((category: any) => ({
          slug: category.slug,
          name: category.name,
          url: category.url,
        })),
      ];
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchProducts = useCallback(
    async (pageNumber: number, categoryUrl?: string) => {
      setLoading(true);
      try {
        const skip = (pageNumber - 1) * 10;
        const url = `${
          categoryUrl || 'https://dummyjson.com/products'
        }?limit=10&skip=${skip}&select=id,title,category,price,discountPercentage,rating,thumbnail`;

        const response = await fetch(url);
        const data = await response.json();

        const formattedProducts: FormattedProduct[] = data.products.map(
          (product: Product) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            discount: product.discountPercentage,
            rating: product.rating,
            image: product.thumbnail,
          }),
        );

        if (pageNumber === 1) {
          setProducts(formattedProducts);
        } else {
          setProducts(prev => [...prev, ...formattedProducts]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    try {
      if (query.trim()) {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await response.json();

        const formattedProducts: FormattedProduct[] = data.products.map(
          (product: Product) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            discount: product.discountPercentage,
            rating: product.rating,
            image: product.thumbnail,
          }),
        );

        if (formattedProducts.length === 0) {
          setEmptyProducts(true);
        } else {
          setEmptyProducts(false);
        }
        setProducts(formattedProducts);
        setTimeout(scrollToProducts, 100);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const scrollToProducts = () => {
    const HEADER_HEIGHT = 150;
    const BANNER_HEIGHT = 140;
    const TOP_CATEGORIES_HEIGHT = 100;

    scrollRef.current?.scrollToOffset({
      offset: HEADER_HEIGHT + BANNER_HEIGHT + TOP_CATEGORIES_HEIGHT,
      animated: true,
    });
  };

  const handleCategoryChange = (index: number) => {
    setSearchQuery('');
    setSelectedCategory(index);
    setPage(1);
    setLoading(true);
    fetchProducts(1, categories[index]?.url);
    setTimeout(scrollToProducts, 100);
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading && !searchQuery.trim()) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, categories[selectedCategory]?.url);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts(1, categories[0]?.url);
    }
  }, [categories, fetchProducts]);

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
      <SafeAreaView style={styles.container}>
        <View style={styles.safeArea}>
          <View style={styles.stickyHeader}>
            <View style={styles.headerContent}>
              <View style={styles.header}>
                <SearchBar
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  setSelectedCategory={setSelectedCategory}
                />
                <View style={styles.categoriesWrapper}>
                  {categories.length > 0 ? (
                    <Categories
                      categories={categories.map(cat => cat.name)}
                      selectedCategory={selectedCategory}
                      onSelectCategory={handleCategoryChange}
                    />
                  ) : (
                    <ActivityIndicator size="large" color="#6200EE" />
                  )}
                </View>
              </View>
            </View>
          </View>

          <FlatList
            ref={scrollRef}
            data={products}
            ListHeaderComponent={
              <>
                <View style={styles.headerSpacer} />
                <ImageBackground
                  source={require('@/assets/images/bg-img.png')}
                  style={styles.backgroundImage}
                  imageStyle={styles.backgroundImageStyle}>
                  <ImageSlide images={HOME_SLIDER} />
                  <TopCategory
                    handleCategoryChange={handleCategoryChange}
                    categories={categories}
                  />
                </ImageBackground>
                <View style={styles.bottomOverlay}>
                  <View ref={productListRef} style={styles.productGrid}>
                    {products.map(item => (
                      <View key={item.id} style={styles.productContainer}>
                        <ProductCard
                          id={item.id}
                          name={item.name}
                          price={item.price}
                          discount={item.discount}
                          rating={item.rating}
                          image={item.image}
                        />
                      </View>
                    ))}

                    {emptyProducts && (
                      <View style={styles.emptyContainer}>
                        <Image
                          source={require('@/assets/images/no-results.png')}
                          style={styles.emptyImage}
                        />
                        <Text style={styles.emptyText}>
                          the product not available yet
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </>
            }
            renderItem={null}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
          <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  stickyHeader: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContent: {
    backgroundColor: '#0A0A0F',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoriesWrapper: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  headerSpacer: {
    height: 150,
    backgroundColor: '#0A0A0F',
  },
  backgroundImage: {
    width: '100%',
    paddingTop: 0,
    marginTop: -20,
    marginBottom: 10,
  },
  backgroundImageStyle: {
    opacity: 0.9,
  },
  bottomOverlay: {
    backgroundColor: 'rgba(10, 10, 15, 0.6)',
    paddingTop: 24,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  productContainer: {
    width: '50%',
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  emptyImage: {
    width: 150,
    height: 150,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
});

export default memo(HomeScreen);
