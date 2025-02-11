import React, {useCallback, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {
  View,
  ViewStyle,
  StyleProp,
  Image,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {Colors} from '../theme';

interface ISvgFromUriProps {
  style?: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ViewStyle & ImageStyle>;
  uri?: string | null;
  error?: React.ReactNode;
  height: string | number;
  width: string | number;
}

const ImageFromUri: React.FC<React.PropsWithChildren<ISvgFromUriProps>> = ({
  style,
  uri,
  imageStyle,
  error,
  width,
  height,
}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const onLoad = useCallback(() => {
    setIsFetching(false);
  }, []);

  const onError = useCallback(() => {
    setIsFetching(false);
    setIsError(true);
  }, []);

  if (!uri) {
    return null;
  }

  if (!error && isError) {
    return null;
  }

  return (
    <View style={style}>
      {!isError ? (
        <Image
          style={imageStyle}
          source={{
            uri,
          }}
          onLoad={onLoad}
          onError={onError}
        />
      ) : null}
      {!isError && isFetching ? (
        <ContentLoader
          style={StyleSheet.flatten([imageStyle, styles.loader])}
          speed={1}
          backgroundColor={Colors.gray}>
          <Rect width={width} height={height} rx="8" />
        </ContentLoader>
      ) : null}
      {isError ? error : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    zIndex: 1,
    position: 'absolute',
  },
});

export default ImageFromUri;
