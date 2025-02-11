import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import _ from 'lodash';
import ImageFromUri from '../components/ImageFromUri';
import BooksSection from '../components/BooksSection';
import {useConfig} from '../context';
import {Colors, Fonts, scaledSize, screenWidth, withHexOpacity} from '../theme';
import ArrowIcon from '../assets/illustrations/arrow.svg';
import {parallaxLayout} from '../utils';
import SplashScreenBg from '../assets/illustrations/details-screen-bg.png';

type DetailsScreenRouteProp = RouteProp<
  {
    DetailsScreen: {
      id: number;
    };
  },
  'DetailsScreen'
>;

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const ref = useRef<ICarouselInstance>(null);
  const {parsed_you_will_like_section, books} = useConfig();
  const {
    params: {id},
  } = useRoute<DetailsScreenRouteProp>();
  const [selectedBookIndex, setSelectedBookIndex] = useState(
    _.findIndex(books, {id}),
  );
  const selectedBook = _.get(books, selectedBookIndex);

  useEffect(() => {
    ref.current?.scrollTo({
      count: _.findIndex(books, {id}),
    });
  }, [books, id]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView edges={['left', 'right']} style={styles.container}>
        <ImageBackground source={SplashScreenBg} style={styles.bgImage} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowIcon style={styles.arrow} />
          </TouchableOpacity>
          <Carousel
            ref={ref}
            onSnapToItem={setSelectedBookIndex}
            loop={false}
            snapEnabled
            style={styles.carosel}
            width={screenWidth}
            data={books}
            renderItem={({item}) => (
              <ImageFromUri
                uri={item.cover_url}
                imageStyle={styles.image}
                height={styles.image.height}
                width={styles.image.width}
                style={styles.imageBox}
              />
            )}
            customAnimation={parallaxLayout(
              {
                size: screenWidth / 1.9,
              },
              {
                parallaxScrollingScale: 1,
                parallaxAdjacentItemScale: 0.8,
                parallaxScrollingOffset: scaledSize(60),
                parallaxMainOffset: scaledSize(80),
              },
            )}
          />
          <Text style={styles.bookName}>{selectedBook.name}</Text>
          <Text style={styles.bookAuthor}>{selectedBook.author}</Text>
          <View style={[styles.whiteBlock, {marginBottom: -insets.bottom}]}>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.infoItemTitle}>{selectedBook.views}</Text>
                <Text style={styles.infoItemSubTitle}>{'Readers'}</Text>
              </View>
              <View>
                <Text style={styles.infoItemTitle}>{selectedBook.likes}</Text>
                <Text style={styles.infoItemSubTitle}>{'Likes'}</Text>
              </View>
              <View>
                <Text style={styles.infoItemTitle}>{selectedBook.quotes}</Text>
                <Text style={styles.infoItemSubTitle}>{'Quotes'}</Text>
              </View>
              <View>
                <Text style={styles.infoItemTitle}>{selectedBook.genre}</Text>
                <Text style={styles.infoItemSubTitle}>{'Genre'}</Text>
              </View>
            </View>
            <View style={styles.summary}>
              <Text style={styles.summaryLabel}>{'Summary'}</Text>
              <Text style={styles.summaryText}>{selectedBook.summary}</Text>
            </View>
            <BooksSection
              title="You will also like"
              books={parsed_you_will_like_section}
              titleStyle={styles.likedTitle}
              isAvalibleToPress={false}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Read Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  bgImage: {
    width: '100%',
    height: '80%',
    zIndex: -1,
    position: 'absolute',
  },
  arrow: {
    marginTop: scaledSize(20),
    width: scaledSize(24),
    height: scaledSize(24),
    marginLeft: scaledSize(16),
    marginBottom: scaledSize(10),
  },
  carosel: {
    width: screenWidth,
    height: scaledSize(250),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageBox: {
    width: scaledSize(200),
    height: scaledSize(250),
    borderRadius: scaledSize(16),
    overflow: 'hidden',
  },
  bookName: {
    fontFamily: Fonts.nunitoSansBold,
    fontSize: scaledSize(20),
    lineHeight: scaledSize(22),
    marginTop: scaledSize(16),
    color: Colors.white,
    marginBottom: scaledSize(4),
    marginHorizontal: scaledSize(16),
    textAlign: 'center',
  },
  bookAuthor: {
    fontFamily: Fonts.nunitoSansBold,
    fontSize: scaledSize(14),
    lineHeight: scaledSize(16),
    color: withHexOpacity(Colors.white, 80),
    marginBottom: scaledSize(20),
    marginHorizontal: scaledSize(16),
    textAlign: 'center',
  },
  whiteBlock: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    paddingTop: scaledSize(22),
  },
  scroll: {
    flex: 1,
    flexGrow: 1,
  },
  infoContainer: {
    marginHorizontal: scaledSize(16),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: scaledSize(8),
    borderBottomWidth: scaledSize(1),
    borderBottomColor: Colors.whiteGray,
  },
  infoItemTitle: {
    fontFamily: Fonts.nunitoSansBold,
    fontSize: scaledSize(16),
    lineHeight: scaledSize(18),
    color: Colors.darkGrey,
    textAlign: 'center',
  },
  infoItemSubTitle: {
    fontFamily: Fonts.nunitoSansSemiBold,
    fontSize: scaledSize(12),
    lineHeight: scaledSize(14),
    color: Colors.whiteGray,
    textAlign: 'center',
  },
  summary: {
    marginHorizontal: scaledSize(16),
    paddingBottom: scaledSize(16),
    borderBottomWidth: scaledSize(1),
    borderBottomColor: Colors.whiteGray,
  },
  summaryLabel: {
    fontFamily: Fonts.nunitoSansBold,
    fontSize: scaledSize(20),
    lineHeight: scaledSize(22),
    color: Colors.darkPurple,
    marginTop: scaledSize(16),
    marginBottom: scaledSize(8),
  },
  summaryText: {
    fontFamily: Fonts.nunitoSansSemiBold,
    fontSize: scaledSize(14),
    lineHeight: scaledSize(16),
    letterSpacing: 0.15,
  },
  likedTitle: {
    color: Colors.darkPurple,
  },
  button: {
    width: scaledSize(278),
    height: scaledSize(48),
    backgroundColor: Colors.pink,
    borderRadius: scaledSize(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: scaledSize(50),
    marginTop: scaledSize(20),
  },
  buttonText: {
    fontFamily: Fonts.nunitoSansExtraBold,
    fontSize: scaledSize(16),
    lineHeight: scaledSize(18),
    color: Colors.white,
  },
});
