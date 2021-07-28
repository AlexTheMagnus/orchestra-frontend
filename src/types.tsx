/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Access: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  'My soundtracks': undefined;
  Favorites: undefined;
  Search: undefined;
  'My profile': undefined;
};

export type AccessParamList = {
  AccessScreen: undefined;
};

export type MySoundtracksParamList = {
  MySoundtracksScreen: undefined;
};

export type FavoritesParamList = {
  FavoritesScreen: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
};

export type MyProfileParamList = {
  MyProfileScreen: undefined;
};

export type SoundtrackItemParamList = {
  bookCover: string;
  soundtrackTitle: string;
  bookTitle: string;
  author: string;
};
