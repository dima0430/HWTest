import React, {createContext, useContext, useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import _ from 'lodash';

export interface Book {
  id: number;
  name: string;
  author: string;
  summary: string;
  genre: string;
  cover_url: string;
  views: string;
  likes: string;
  quotes: string;
}

export interface TopBanner {
  id: number;
  book_id: number;
  cover: string;
}

interface ConfigData {
  books: Book[];
  books_grouped_by_genre: {[key: string]: Book[]};
  top_banner_slides: TopBanner[];
  you_will_like_section: number[];
  parsed_you_will_like_section: Book[];
}

const ConfigContext = createContext<ConfigData | null>(null);

export const ConfigProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [config, setConfig] = useState<ConfigData | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        await remoteConfig().fetchAndActivate();

        const configString = remoteConfig().getValue('json_data').asString();

        const parsedConfig: ConfigData = JSON.parse(configString);

        const books_grouped_by_genre = _.groupBy(parsedConfig.books, 'genre');
        const books_grouped_by_id = _.groupBy(parsedConfig.books, 'id');
        const parsed_you_will_like_section = _.map(
          parsedConfig.you_will_like_section,
          id => ({..._.get(books_grouped_by_id, [String(id), 0])}),
        );

        setConfig({
          ...parsedConfig,
          books_grouped_by_genre,
          parsed_you_will_like_section,
        });
      } catch (error) {
        console.error('Error while fetchConfig', error);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
