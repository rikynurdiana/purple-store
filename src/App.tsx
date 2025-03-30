import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CartProvider} from '@/context/CartContext';
import {FavoriteProvider} from '@/context/FavoriteContext';

import TabNavigator from '@/components/navigation/TabNavigator';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import {
  CART_SCREEN,
  PAYMENT_SCREEN,
  PRODUCT_DETAIL_SCREEN,
  MAIN_TAB,
} from '@/constant';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <FavoriteProvider>
      <CartProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name={MAIN_TAB} component={TabNavigator} />
              <Stack.Screen
                name={PRODUCT_DETAIL_SCREEN}
                component={ProductDetailScreen as React.ComponentType<any>}
              />
              <Stack.Screen name={CART_SCREEN} component={CartScreen} />
              <Stack.Screen name={PAYMENT_SCREEN} component={PaymentScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </CartProvider>
    </FavoriteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
});

export default App;
