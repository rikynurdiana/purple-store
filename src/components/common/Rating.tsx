import React, {memo, useMemo} from 'react';
import {View, StyleSheet, Image, Platform} from 'react-native';

const STAR_COUNT = 5;
const STAR_ICONS = [
  require('@/assets/icons/star.png'),
  require('@/assets/icons/star-empty.png'),
];

function Rating({value}: {value: number}) {
  const roundedValue = Math.round(value);

  const stars = useMemo(
    () =>
      Array.from({length: STAR_COUNT}, (_, i) => (
        <Image
          key={i}
          source={STAR_ICONS[i < roundedValue ? 0 : 1]}
          style={styles.starIcon}
          accessibilityLabel={i < roundedValue ? 'Filled star' : 'Empty star'}
        />
      )),
    [roundedValue],
  );

  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: Platform.select({ios: 2, android: 1}),
    ...Platform.select({
      android: {
        marginEnd: 2,
      },
    }),
  },
});

export default memo(Rating);
