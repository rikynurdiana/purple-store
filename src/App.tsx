import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import FavoriteScreen from '@/screens/FavoriteScreen';
import CartScreen from '@/screens/CartScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import {CartProvider} from '@/context/CartContext';
import {FavoriteProvider} from '@/context/FavoriteContext';
import {
  HOME_SCREEN,
  PRODUCT_DETAIL_SCREEN,
  FAVORITE_SCREEN,
  CART_SCREEN,
  PAYMENT_SCREEN,
  PROFILE_SCREEN,
} from '@/constant';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <FavoriteProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen
              name={PRODUCT_DETAIL_SCREEN}
              component={ProductDetailScreen as React.ComponentType<any>}
            />
            <Stack.Screen name={FAVORITE_SCREEN} component={FavoriteScreen} />
            <Stack.Screen name={CART_SCREEN} component={CartScreen} />
            <Stack.Screen name={PAYMENT_SCREEN} component={PaymentScreen} />
            <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavoriteProvider>
  );
}

export default App;
