import React, {useRef, useCallback, useMemo} from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';

type CategoriesProps = {
  categories: string[];
  selectedCategory: number;
  onSelectCategory: (index: number) => void;
};

export function Categories({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const itemLayouts = useRef<Record<number, number>>({});

  const handleCategoryPress = useCallback(
    (index: number) => {
      onSelectCategory(index);

      const itemOffset = itemLayouts.current[index] || 0;
      const scrollPosition = Math.max(0, itemOffset - 16);

      scrollViewRef.current?.scrollTo({
        x: scrollPosition,
        animated: true,
      });
    },
    [onSelectCategory],
  );

  const measureItem = useCallback(
    (index: number, event: {nativeEvent: {layout: {x: number}}}) => {
      itemLayouts.current[index] = event.nativeEvent.layout.x;
    },
    [],
  );

  const memoizedCategories = useMemo(
    () =>
      categories.map((category, index) => (
        <TouchableOpacity
          key={`category-${index}`}
          style={[
            styles.categoryButton,
            selectedCategory === index && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryPress(index)}
          onLayout={e => measureItem(index, e)}
          accessibilityRole="button"
          accessibilityState={{selected: selectedCategory === index}}>
          <Text
            style={[
              styles.categoryText,
              selectedCategory === index && styles.selectedCategoryText,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {category}
          </Text>
        </TouchableOpacity>
      )),
    [categories, selectedCategory, handleCategoryPress, measureItem],
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled">
      {memoizedCategories}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    minHeight: 40,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#14141F',
  },
  selectedCategory: {
    backgroundColor: '#6f04d4',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    maxWidth: 120,
  },
  selectedCategoryText: {
    fontWeight: '600',
  },
});
