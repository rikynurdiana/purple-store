import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

export type StaticImageAsset = ReturnType<typeof require>;

function ImageSlide({images}: {images: StaticImageAsset[]}) {
  const fadeOut = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const mounted = useRef(true);

  const [activeSlide, setActiveSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);

  const animateSlide = useCallback(
    (newNext: number) => {
      setNextSlide(newNext);

      fadeOut.setValue(1);
      fadeIn.setValue(0);

      Animated.parallel([
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!mounted.current) {
          return;
        }
        setActiveSlide(newNext);
      });
    },
    [fadeIn, fadeOut],
  );

  useEffect(() => {
    mounted.current = true;
    let interval: NodeJS.Timeout;

    const startInterval = () => {
      interval = setInterval(() => {
        if (mounted.current) {
          const newNext = (activeSlide + 1) % images.length;
          animateSlide(newNext);
        }
      }, 3000);
    };

    startInterval();

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [activeSlide, images.length, animateSlide]);

  const imageStyle = {
    opacity: fadeOut,
    width: Dimensions.get('window').width - 32,
    position: 'absolute' as const,
  };

  const nextImageStyle = {
    opacity: fadeIn,
    width: Dimensions.get('window').width - 32,
    position: 'absolute' as const,
  };

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.banner}>
        <View style={styles.animWraper}>
          <Animated.Image
            source={images[activeSlide]}
            style={[styles.bannerImage, imageStyle]}
          />
          <Animated.Image
            source={images[nextSlide]}
            style={[styles.bannerImage, nextImageStyle]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: 'transparent',
  },
  banner: {
    height: 200,
    backgroundColor: '#14141F',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 8,
    marginHorizontal: 0,
  },
  animWraper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default memo(ImageSlide);
