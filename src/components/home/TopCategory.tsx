import {memo} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TopCategoryProps = {
  handleCategoryChange: (index: number) => void;
  categories: {name: string}[];
};

function TopCategory({handleCategoryChange, categories}: TopCategoryProps) {
  const getTabIcon = (tabName: string) => {
    switch (tabName.toLowerCase()) {
      case 'laptops':
        return require('@/assets/icons/laptops.png');
      case 'sunglasses':
        return require('@/assets/icons/sunglasses.png');
      case 'tops':
        return require('@/assets/icons/tops.png');
      case 'motorcycle':
        return require('@/assets/icons/motorcycle.png');
      default:
        return require('@/assets/icons/home.png');
    }
  };

  return (
    <View style={styles.topCategories}>
      <Text style={styles.topCategoriesTitle}>Top Categories</Text>
      <View style={styles.topCategoriesGrid}>
        {['Laptops', 'Sunglasses', 'Tops', 'Motorcycle'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.topCategoryItem}
            onPress={() =>
              handleCategoryChange(
                categories.findIndex(
                  c => c.name.toLowerCase() === item.toLowerCase(),
                ),
              )
            }>
            <View style={styles.topCategoryIcon}>
              <Image source={getTabIcon(item)} style={styles.tabIcon} />
            </View>
            <Text style={styles.topCategoryText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topCategories: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  topCategoriesTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  topCategoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 8,
  },
  topCategoryItem: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 4 - 24,
  },
  topCategoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6f04d4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  topCategoryText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default memo(TopCategory);
