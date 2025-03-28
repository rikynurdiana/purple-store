import React, {memo, useCallback, useEffect} from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  selectedCategory?: string | null;
  setSelectedCategory?: any;
};

export const SearchBar = memo(
  ({
    value,
    onChangeText,
    selectedCategory,
    setSelectedCategory,
  }: SearchBarProps) => {
    const handleTextChange = useCallback(
      (text: string) => {
        onChangeText(text);
        setSelectedCategory('');
      },
      [onChangeText, setSelectedCategory],
    );

    useEffect(() => {
      if (selectedCategory) {
        onChangeText('');
      }
    }, [selectedCategory, onChangeText]);

    return (
      <View style={styles.container}>
        <Image
          source={require('@/assets/icons/search.png')}
          style={styles.filterIcon}
          accessibilityIgnoresInvertColors
        />
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          placeholderTextColor="#666666"
          value={value}
          onChangeText={handleTextChange}
          accessibilityLabel="Search products input"
          accessibilityHint="Type product name or category"
          clearButtonMode="while-editing"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(107, 78, 255, 0.3)',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
    includeFontPadding: false,
  },
  filterIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
