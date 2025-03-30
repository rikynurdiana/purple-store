import {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import FavoriteScreen from '@/screens/FavoriteScreen';
import CartScreen from '@/screens/CartScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import {
  HOME_SCREEN,
  FAVORITE_SCREEN,
  CART_SCREEN,
  PROFILE_SCREEN,
} from '@/constant';

const Tab = createBottomTabNavigator();

// Move icon components outside
const HomeIcon = memo(({focused}: {focused: boolean}) => (
  <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
    <Image source={require('@/assets/icons/home.png')} style={styles.tabIcon} />
  </View>
));

const FavoriteIcon = memo(({focused}: {focused: boolean}) => (
  <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
    <Image source={require('@/assets/icons/like.png')} style={styles.tabIcon} />
  </View>
));

const CartIcon = memo(({focused}: {focused: boolean}) => (
  <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
    <Image source={require('@/assets/icons/cart.png')} style={styles.tabIcon} />
  </View>
));

const ProfileIcon = memo(({focused}: {focused: boolean}) => (
  <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
    <Image
      source={require('@/assets/icons/profile.png')}
      style={styles.tabIcon}
    />
  </View>
));

const renderHomeIcon = ({focused}: {focused: boolean}) => (
  <HomeIcon focused={focused} />
);
const renderFavoriteIcon = ({focused}: {focused: boolean}) => (
  <FavoriteIcon focused={focused} />
);
const renderCartIcon = ({focused}: {focused: boolean}) => (
  <CartIcon focused={focused} />
);
const renderProfileIcon = ({focused}: {focused: boolean}) => (
  <ProfileIcon focused={focused} />
);

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name={FAVORITE_SCREEN}
        component={FavoriteScreen}
        options={{
          tabBarIcon: renderFavoriteIcon,
        }}
      />
      <Tab.Screen
        name={CART_SCREEN}
        component={CartScreen}
        options={{
          tabBarIcon: renderCartIcon,
        }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 58,
    backgroundColor: '#14141F',
    borderTopWidth: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#dddddd',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    paddingBottom: 8,
    paddingTop: 8,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  activeIcon: {
    backgroundColor: '#6200EE15',
    transform: [{scale: 1.05}],
  },
  tabIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default memo(TabNavigator);
