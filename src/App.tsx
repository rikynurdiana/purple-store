import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import {CartProvider} from '@/context/CartContext';
import {FavoriteProvider} from '@/context/FavoriteContext';
import {HOME_SCREEN, PRODUCT_DETAIL_SCREEN} from '@/constant';

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
              component={ProductDetailScreen as any}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavoriteProvider>
  );
}

export default App;
