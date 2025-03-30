import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useCart} from '@/context/CartContext';
import {MAIN_TAB, CART_SCREEN} from '@/constant';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types';

type PaymentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, typeof MAIN_TAB>;
};

function PaymentScreen({navigation}: PaymentScreenProps) {
  const {cartItems, removeSelectedItems} = useCart();
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const selectedItems = cartItems.filter(item => item.isSelected);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: require('@/assets/icons/credit-card.png'),
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: require('@/assets/icons/paypal.png'),
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: require('@/assets/icons/google-pay.png'),
    },
  ];

  const handlePayment = () => {
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    Alert.alert(
      'Confirm Payment',
      `Total payment: $${total.toLocaleString('en-US')}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Payment processed successfully!');
            removeSelectedItems();
            navigation.navigate(MAIN_TAB, {
              screen: CART_SCREEN,
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerScroll}>
        <Text style={styles.title}>Payment Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Items</Text>
          {selectedItems.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: item.thumbnail}}
                  style={styles.itemImage}
                />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>
                  ${item.price.toLocaleString('en-US')} x {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                ${(item.price * item.quantity).toLocaleString('en-US')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.selectedPayment,
              ]}
              onPress={() => setSelectedPayment(method.id)}>
              <Image source={method.icon} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ${subtotal.toLocaleString('en-US')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tax (10%)</Text>
            <Text style={styles.summaryValue}>
              ${tax.toLocaleString('en-US')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              ${shipping.toLocaleString('en-US')}
            </Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${total.toLocaleString('en-US')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  containerScroll: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    color: '#888',
    fontSize: 14,
  },
  itemTotal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPayment: {
    backgroundColor: '#6200EE',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  paymentText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 16,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  totalItem: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  payButton: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    backgroundColor: '#a687c4',
    borderRadius: 14,
    padding: 4,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});

export default PaymentScreen;
