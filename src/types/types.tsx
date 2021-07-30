/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type StackParamList = {
  Access: undefined;
  Root: undefined;
  MySoundtracks: undefined;
  ChooseBook: { soundtrackTitle: string };
  Favorites: undefined;
  Search: undefined;
  MyProfile: undefined;
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

export type LoggedUserParamList = {
  id: string;
  given_name: string;
  picture: string;
};

export type BookResultParamList = {
  title: string;
  cover: string;
  author: string;
  isbn: string;
};

export type BookSearchItemParamList = {
  bookCover: string;
  bookTitle: string;
  author: string;
  key: number;
};
