import {
  ImageBackground,
  StyleSheet,
  Text,
  useAnimatedValue,
  Animated,
  View,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreenBg from '../assets/illustrations/splash-screen-bg.png';
import {Colors, Fonts, withHexOpacity} from '../theme';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  [key: string]: any;
};

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const progress = useAnimatedValue(-274);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainScreen');
    }, 2000);
  }, [navigation]);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ImageBackground source={SplashScreenBg} style={styles.imageBg}>
        <Text style={styles.title}>Book App</Text>
        <Text style={styles.subTitle}>Welcome to Book App</Text>
        <View style={styles.progressBarWrapper}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                transform: [{translateX: progress}],
              },
            ]}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    lineHeight: 52,
    color: Colors.pink,
    marginBottom: 12,
    fontFamily: Fonts.georgiaBoldItalic,
    fontStyle: Platform.select({
      ios: 'italic',
      android: undefined,
    }),
  },
  subTitle: {
    fontSize: 24,
    lineHeight: 26.4,
    color: withHexOpacity(Colors.white, 80),
    marginBottom: 46,
    fontFamily: Fonts.nunitoSansBold,
  },
  progressBarWrapper: {
    width: 274,
    height: 6,
    backgroundColor: withHexOpacity(Colors.white, 20),
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    borderRadius: 6,
    width: 274,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
});
