import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, scaledSize, withHexOpacity} from '../theme';
import ArrowIcon from '../assets/illustrations/arrow.svg';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import remoteConfig from '@react-native-firebase/remote-config';
import ImageFromUri from '../components/ImageFromUri';
import {Extrapolation, interpolate} from 'react-native-reanimated';
import BooksSection from '../components/BooksSection';

function parallaxLayout(
  baseConfig: {
    size: number;
  },
  modeConfig: {
    parallaxScrollingOffset: number;
    parallaxMainOffset: number;
    parallaxScrollingScale: number;
    parallaxAdjacentItemScale: number;
  },
) {
  const {size} = baseConfig;
  const {
    parallaxScrollingOffset,
    parallaxMainOffset,
    parallaxScrollingScale,
    parallaxAdjacentItemScale,
  } = modeConfig;

  return (value: number) => {
    'worklet';
    const translate = interpolate(
      value,
      [-1, 0, 1],
      [
        -size + parallaxScrollingOffset,
        parallaxMainOffset,
        size + parallaxScrollingOffset,
      ],
    );

    const scale = interpolate(
      value,
      [-1, 0, 1],
      [
        parallaxAdjacentItemScale,
        parallaxScrollingScale,
        parallaxAdjacentItemScale,
      ],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          translateX: translate,
        },
        {
          scale,
        },
      ],
    };
  };
}

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await remoteConfig().fetchAndActivate();
      const fetchedData = remoteConfig().getValue('json_data').asString();
      setData(JSON.parse(fetchedData));
    };

    fetch();
  }, []);

  console.log(data);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
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
          loop={false}
          snapEnabled
          style={{
            width: Dimensions.get('screen').width,
            height: scaledSize(250),
          }}
          width={Dimensions.get('screen').width}
          data={data?.books}
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
              size: Dimensions.get('screen').width / 1.9,
            },
            {
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 0.8,
              parallaxScrollingOffset: scaledSize(60),
              parallaxMainOffset: scaledSize(80),
            },
          )}
        />
        <Text style={styles.bookName}>Book name</Text>
        <Text style={styles.bookAuthor}>Book author</Text>
        <View style={[styles.whiteBlock, {marginBottom: -insets.bottom}]}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.infoItemTitle}>{'22'}</Text>
              <Text style={styles.infoItemSubTitle}>{'Readers'}</Text>
            </View>
            <View>
              <Text style={styles.infoItemTitle}>{'22'}</Text>
              <Text style={styles.infoItemSubTitle}>{'Likes'}</Text>
            </View>
            <View>
              <Text style={styles.infoItemTitle}>{'22'}</Text>
              <Text style={styles.infoItemSubTitle}>{'Quotes'}</Text>
            </View>
            <View>
              <Text style={styles.infoItemTitle}>{'22'}</Text>
              <Text style={styles.infoItemSubTitle}>{'Genre'}</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>{'Summary'}</Text>
            <Text style={styles.summaryText}>
              {
                'According to researchers at Duke University, habits account for about 40 percent of our behaviors on any given day. Your life today is essentially the sum of your habits. How in shape or out of shape you are? A result of your habits. How happy or unhappy you are? A result of your habits. How successful or unsuccessful you are? A result of your habits.'
              }
            </Text>
          </View>
          <BooksSection
            title="You will also like"
            books={data?.books}
            titleStyle={styles.likedTitle}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Read Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.darkGrey,
  },
  arrow: {
    marginTop: scaledSize(20),
    width: scaledSize(24),
    height: scaledSize(24),
    marginLeft: scaledSize(16),
    marginBottom: scaledSize(10),
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
  },
  buttonText: {
    fontFamily: Fonts.nunitoSansExtraBold,
    fontSize: scaledSize(16),
    lineHeight: scaledSize(18),
    color: Colors.white,
  },
});
