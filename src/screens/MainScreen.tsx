import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import _ from 'lodash';

const MainScreen: React.FC = () => {
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
  console.log(_.groupBy(data.books, 'genre'));

  return (
    <SafeAreaView>
      <ScrollView>{data.books.map()}</ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
