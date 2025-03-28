import React, {memo, useCallback} from 'react';
import {View, Pressable, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  HOME_SCREEN,
  FAVORITE_SCREEN,
  CART_SCREEN,
  PROFILE_SCREEN,
  TAB_ICONS,
  TAB_TYPE,
} from '@/constant';

type BottomNavigationProps = {
  activeTab: string;
  onTabPress: (tabName: TAB_TYPE) => void;
};

const TABS = Object.keys(TAB_ICONS) as TAB_TYPE[];

export const BottomNavigation = memo(
  ({activeTab, onTabPress}: BottomNavigationProps) => {
    const navigation = useNavigation<any>();

    const handlePress = useCallback(
      (tabName: TAB_TYPE) => {
        if (tabName === HOME_SCREEN) {
          navigation.navigate(HOME_SCREEN);
          return;
        }
        if (tabName === FAVORITE_SCREEN) {
          navigation.navigate(FAVORITE_SCREEN);
          return;
        }
        if (tabName === CART_SCREEN) {
          navigation.navigate(CART_SCREEN);
          return;
        }
        if (tabName === PROFILE_SCREEN) {
          navigation.navigate(PROFILE_SCREEN);
          return;
        }
        onTabPress(tabName);
      },
      [onTabPress, navigation],
    );

    return (
      <View style={styles.bottomNav}>
        {TABS.map(tabName => (
          <Pressable
            key={tabName}
            onPress={() => handlePress(tabName)}
            style={({pressed}) => [
              styles.tabItem,
              activeTab === tabName && styles.activeTabItem,
              pressed && styles.pressedTabItem,
            ]}
            accessibilityRole="button"
            accessibilityState={{selected: activeTab === tabName}}>
            <Image
              source={TAB_ICONS[tabName]}
              style={styles.tabIcon}
              accessibilityIgnoresInvertColors
            />
          </Pressable>
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2A2A2A',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeTabItem: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
  },
  pressedTabItem: {
    opacity: 0.8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
