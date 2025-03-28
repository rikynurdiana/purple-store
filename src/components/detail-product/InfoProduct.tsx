import {memo, useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type InfoItemProps = {
  icon: string;
  label: string;
  value: string;
};

function InfoProduct({icon, label, value}: InfoItemProps) {
  const iconMap = useMemo(
    () => ({
      stock: require('@/assets/icons/stock.png'),
      delivery: require('@/assets/icons/delivery.png'),
      shield: require('@/assets/icons/shield.png'),
      cart: require('@/assets/icons/cart.png'),
      weight: require('@/assets/icons/weight.png'),
      dimension: require('@/assets/icons/dimension.png'),
      return: require('@/assets/icons/return.png'),
      sku: require('@/assets/icons/sku.png'),
    }),
    [],
  );

  return (
    <View style={styles.infoItem}>
      <Image
        source={
          iconMap[icon.toLowerCase() as keyof typeof iconMap] || iconMap.stock
        }
        style={styles.tabIcon}
      />
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  infoText: {
    marginLeft: 12,
  },
  infoLabel: {
    color: '#888',
    fontSize: 12,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default memo(InfoProduct);
