/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  TextStyle
} from 'react-native';

export type GlobalState = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  loggedUser: LoggedUserParamList;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUserParamList>>;
  loggedUserFavorites: string[] | null;
  setLoggedUserFavorites: React.Dispatch<React.SetStateAction<string[] | null>>;
};

export type StackParamList = ModalsParamList & {
  Access: undefined;
  Root: undefined;
  MySoundtracks: undefined;
  SoundtrackOptions: undefined;
  ChooseBook: { soundtrackTitle: string; soundtrackToUpdate: string };
  Favorites: undefined;
  Search: undefined;
  MyProfile: undefined;
  Soundtrack: {
    soundtrackId: string;
  };
  ChooseTheme: {
    soundtrackId: string;
    chapterNumber: number;
    chapterTitle: string;
  };
  NotFound: undefined;
  Modal: {
    screen: string;
    params: Object;
  };
};

export type ModalsParamList = {
  SoundtrackOptions: SoundtrackItemParamList;
};

export type BottomTabParamList = {
  'My soundtracks': undefined;
  Favorites: undefined;
  Search: undefined;
  'My profile': undefined;
  Soundtrack: {
    soundtrackId: string;
  };
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
  soundtrackId: string;
};

export type SoundtrackInfoParamList = {
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

export type JsonSoundtrackParamList = {
  author: string;
  book: string;
  soundtrack_id: string;
  soundtrack_title: string;
};

export type OrchestraButtonProps = {
  onPress: () => void;
  message: string;
  propStyles?:
    | TextStyle
    | Falsy
    | RegisteredStyle<TextStyle>
    | RecursiveArray<TextStyle>;
};

export type AccessResponse = {
  access_token: string;
  user_id: string;
  username: string;
  user_avatar: string;
};

export type ThemeParamList = {
  title: string;
  author: string;
  themeUri: string;
};

export type ThemeItemParamList = ThemeParamList & { onPress(): void };

export type JsonChapterParamList = {
  chapter_id: string;
  chapter_number: number;
  chapter_title: string;
  soundtrack_id: string;
  theme: string;
};

export type ChapterParamList = {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  soundtrackId: string;
  theme: string;
};

export type ChapterItemParamList = {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  theme: string;
  onPress(): void;
};

export type SoundtrackLikeProps = {
  soundtrackId: string;
};
