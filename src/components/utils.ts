import { BACKEND_URL } from '@env';
import {
  JsonSoundtrackParamList,
  SoundtrackItemParamList
} from '../types/types';

const getAuthorName = async (authorId: string) => {
  const response = await fetch(`${BACKEND_URL}/users/${authorId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const message = `An error has occured while getting the name of the user with ID ${authorId}: Status error ${response.status}`;
    console.error(message);
    return;
  }

  const json = await response.json();
  return json.username;
};

const setAuthorName = async (
  soundtracksList: JsonSoundtrackParamList,
  soundtrackItem: SoundtrackItemParamList
) => {
  soundtrackItem.author = await getAuthorName(soundtracksList.author);
};

const getBookInfo = async (isbn: string) => {
  var bookInfo: { bookCover: string; bookTitle: string } = {
    bookCover: '',
    bookTitle: ''
  };

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    const message = `An error has occured while getting the info of the book with ISBN ${isbn}: Status error ${response.status}`;
    console.error(message);
    return bookInfo;
  }

  const json = await response.json();
  json.items[0].volumeInfo.imageLinks.smallThumbnail
    ? (bookInfo.bookCover = json.items[0].volumeInfo.imageLinks.smallThumbnail)
    : json.items[0].volumeInfo.imageLinks.thumbnail
    ? (bookInfo.bookCover = json.items[0].volumeInfo.imageLinks.thumbnail!)
    : null;
  json.items[0].volumeInfo.title
    ? (bookInfo.bookTitle = json.items[0].volumeInfo.title)
    : null;

  return bookInfo;
};

const setBookInfo = async (
  soundtracksList: JsonSoundtrackParamList,
  soundtrackItem: SoundtrackItemParamList
) => {
  const bookInfo = await getBookInfo(soundtracksList.book);
  soundtrackItem.bookCover = bookInfo.bookCover;
  soundtrackItem.bookTitle = bookInfo.bookTitle;
};

export const fromJsonToSoundtrackItem = async (
  jsonSoundtrack: JsonSoundtrackParamList
) => {
  var soundtrackItem: SoundtrackItemParamList = {
    bookCover: '',
    soundtrackTitle: jsonSoundtrack.soundtrack_title,
    soundtrackId: jsonSoundtrack.soundtrack_id,
    bookTitle: '',
    author: ''
  };

  await setAuthorName(jsonSoundtrack, soundtrackItem);
  await setBookInfo(jsonSoundtrack, soundtrackItem);
  return soundtrackItem;
};
