import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from 'react-native';
import React, {useCallback} from 'react';
import ImageFromUri from './ImageFromUri';
import {Colors, Fonts, withHexOpacity, scaledSize} from '../theme';
import {useNavigation} from '@react-navigation/native';

interface IBooksSection {
  title: string;
  titleStyle: StyleProp<TextStyle>;
  books: any[];
}

const BooksSection: React.FC<IBooksSection> = ({title, titleStyle, books}) => {
  const navigation = useNavigation();

  const goToDetails = useCallback(
    (id: number) => () => {
      navigation.navigate('DetailsScreen', {
        id,
      });
    },
    [navigation],
  );

  return (
    <>
      <Text style={[styles.sectionName, titleStyle]}>{title}</Text>
      <FlatList
        scrollEventThrottle={16}
        style={styles.scroll}
        bounces={false}
        horizontal
        data={books}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={goToDetails(item.id)}>
            <ImageFromUri
              uri={item.cover_url}
              style={styles.imageBox}
              imageStyle={styles.image}
              height={styles.image.height}
              width={styles.image.width}
            />
            <Text numberOfLines={2} style={[styles.bookName, titleStyle]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default BooksSection;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: scaledSize(16),
  },
  sectionName: {
    marginLeft: scaledSize(16),
    fontFamily: Fonts.nunitoSansBold,
    color: Colors.white,
    fontSize: scaledSize(20),
    lineHeight: scaledSize(22),
    marginBottom: scaledSize(14),
    marginTop: scaledSize(24),
  },
  card: {
    width: scaledSize(120),
    marginRight: scaledSize(8),
  },
  imageBox: {
    width: scaledSize(120),
    height: scaledSize(150),
    borderRadius: scaledSize(16),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookName: {
    color: withHexOpacity(Colors.white, 70),
    fontFamily: Fonts.nunitoSansSemiBold,
    fontSize: scaledSize(16),
    marginTop: scaledSize(4),
  },
});
