import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import _ from 'lodash';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Colors, Fonts, scaledSize} from '../theme';
import BooksSection from '../components/BooksSection';
import ImageFromUri from '../components/ImageFromUri';
import {useConfig} from '../context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const MainScreen: React.FC = () => {
  const {books_grouped_by_genre, top_banner_slides} = useConfig();
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const goToDetails = useCallback(
    (id: number) => () => {
      navigation.navigate('DetailsScreen', {
        id,
      });
    },
    [navigation],
  );

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView edges={['left', 'right']} style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}>
          <Text style={styles.header}>{'Library'}</Text>
          <View>
            <Carousel
              ref={ref}
              loop
              vertical={false}
              width={scaledSize(343)}
              height={scaledSize(160)}
              snapEnabled
              pagingEnabled
              autoPlay
              autoPlayInterval={3000}
              scrollAnimationDuration={1500}
              onProgressChange={progress}
              data={top_banner_slides}
              defaultScrollOffsetValue={scrollOffsetValue}
              style={styles.carousel}
              renderItem={({item}) => (
                <TouchableOpacity onPress={goToDetails(item.id)}>
                  <ImageFromUri
                    uri={item.cover}
                    imageStyle={styles.image}
                    height={styles.image.height}
                    width={styles.image.width}
                    style={styles.imageBox}
                  />
                </TouchableOpacity>
              )}
            />
            {top_banner_slides ? (
              <Pagination.Basic
                progress={progress}
                data={top_banner_slides}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                containerStyle={styles.dotsContainer}
                horizontal
                onPress={onPressPagination}
              />
            ) : null}
          </View>
          {_.map(books_grouped_by_genre, (books, key) => (
            <BooksSection key={key} title={key} books={books} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
  },
  header: {
    marginLeft: scaledSize(16),
    fontFamily: Fonts.nunitoSansBold,
    color: Colors.brightPink,
    fontSize: scaledSize(20),
    lineHeight: scaledSize(20),
    marginTop: scaledSize(20),
    marginBottom: scaledSize(30),
  },
  carousel: {
    alignSelf: 'center',
    borderRadius: scaledSize(16),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageBox: {
    width: scaledSize(343),
    height: scaledSize(160),
    borderRadius: scaledSize(16),
    overflow: 'hidden',
  },
  dotsContainer: {
    gap: scaledSize(10),
    position: 'absolute',
    bottom: scaledSize(10),
  },
  dot: {
    width: scaledSize(7),
    height: scaledSize(7),
    borderRadius: scaledSize(100),
    backgroundColor: Colors.gray,
  },
  activeDot: {
    backgroundColor: Colors.brightPink,
  },
});
