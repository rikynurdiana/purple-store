import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCart} from '@/context/CartContext';
import {MAIN_TAB, PAYMENT_SCREEN, PRODUCT_DETAIL_SCREEN} from '@/constant';
import type {CartItem, RootStackParamList} from '@/types';

type CartScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, typeof MAIN_TAB>;
};

function CartScreen({navigation}: CartScreenProps) {
  const {cartItems, removeFromCart, updateQuantity, toggleSelect, selectAll} =
    useCart();

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.isSelected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    const hasSelectedItems = cartItems.some(item => item.isSelected);
    if (!hasSelectedItems) {
      Alert.alert('Error', 'Please select at least one item to checkout');
      return;
    }
    navigation.navigate(PAYMENT_SCREEN);
  };

  const renderItem = ({item}: {item: CartItem}) => (
    <View style={styles.cartItem}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleSelect(item.id)}>
        <View
          style={[styles.checkbox, item.isSelected && styles.checkboxSelected]}>
          {item.isSelected && (
            <Image
              source={require('@/assets/icons/check.png')}
              style={styles.checkIcon}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          navigation.navigate(PRODUCT_DETAIL_SCREEN, {productId: item.id})
        }>
        <Image source={{uri: item.thumbnail}} style={styles.cartImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          ${item.price.toLocaleString('en-US')}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}>
            <Image
              source={require('@/assets/icons/minus.png')}
              style={styles.quantityIcon}
            />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}>
            <Image
              source={require('@/assets/icons/plus.png')}
              style={styles.quantityIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={styles.deleteButton}>
        <Image
          source={require('@/assets/icons/delete2.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Shopping Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity
            onPress={() => selectAll(!cartItems.every(item => item.isSelected))}
            style={styles.selectAllButton}>
            <Text style={styles.selectAllText}>
              {cartItems.every(item => item.isSelected)
                ? 'Deselect All'
                : 'Select All'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('@/assets/images/empty-cart.png')}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>Your cart feels lonely</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalPrice}>
                ${calculateTotal().toLocaleString('en-US')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Secure Checkout</Text>
              <Image
                source={require('@/assets/icons/arrow-right.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  screenTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    padding: 20,
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemPrice: {
    color: '#7B61FF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    padding: 6,
    marginTop: 8,
    width: 110,
  },
  quantityButton: {
    backgroundColor: '#3A3A3A',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityIcon: {
    width: 16,
    height: 16,
  },
  quantity: {
    color: '#FFF',
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A0A0F',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  totalPrice: {
    color: '#7B61FF',
    fontSize: 18,
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: '#7B61FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 200,
  },
  headerImage: {
    width: '100%',
    height: 180,
  },
  imageContainer: {
    backgroundColor: '#a687c4',
    borderRadius: 14,
    padding: 4,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cartImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  checkboxContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: '#6B4EFF',
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  selectAllButton: {
    padding: 8,
  },
  selectAllText: {
    color: '#6B4EFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartScreen;
