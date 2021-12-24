import { BACKEND_URL } from '@env';
import {
  JsonSoundtrackParamList,
  SoundtrackItemParamList,
  UserResponse
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
  jsonSoundtrack: JsonSoundtrackParamList,
  soundtrackItem: SoundtrackItemParamList
) => {
  soundtrackItem.authorName = await getAuthorName(jsonSoundtrack.author);
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
    authorId: jsonSoundtrack.author,
    authorName: ''
  };

  await setAuthorName(jsonSoundtrack, soundtrackItem);
  await setBookInfo(jsonSoundtrack, soundtrackItem);
  return soundtrackItem;
};

export const getUserFavoritesRequest = async (userId: string) => {
  const getUserFavoritesResponse = await fetch(
    `${BACKEND_URL}/users/${userId}/favorites`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );

  if (!getUserFavoritesResponse.ok) {
    const message = `An error has occured: Status error ${getUserFavoritesResponse.status}`;
    alert(message);
    return;
  }

  return getUserFavoritesResponse.json();
};

export const getSoundtrackById = async (soundtrackId: string) => {
  const response = await fetch(`${BACKEND_URL}/soundtracks/${soundtrackId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const message = `An error has occured while loading the soundtrack info: Status error ${response.status}`;
    alert(message);
    return;
  }

  const body: JsonSoundtrackParamList = await response.json();
  const soundtrackItem = await fromJsonToSoundtrackItem(body);

  return soundtrackItem;
};

export const getUserSoundtracks = async (userId: string) => {
  const response = await fetch(`${BACKEND_URL}/soundtracks/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const message = `An error has occured while loading the soundtracks: Status error ${response.status}`;
    alert(message);
    console.error(message);
  }

  const json = await response.json();
  var soundtrackItemList: SoundtrackItemParamList[] = [];

  await Promise.all(
    json.soundtracks_list.map(
      async (jsonSoundtrack: JsonSoundtrackParamList) => {
        soundtrackItemList.push(await fromJsonToSoundtrackItem(jsonSoundtrack));
      }
    )
  );
  return soundtrackItemList;
};

export const getFollowers = async (
  profileUserId: string
): Promise<UserResponse[]> => {
  const response = await fetch(
    `${BACKEND_URL}/users/${profileUserId}/followers`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    const message = `An error has occured when loading the followers: Status error ${response.status}`;
    alert(message);
    console.error(message);
    return [];
  }

  const jsonResponse = await response.json();
  return jsonResponse.followers;
};

export const getFollowedUsers = async (
  profileUserId: string
): Promise<UserResponse[]> => {
  const response = await fetch(
    `${BACKEND_URL}/users/${profileUserId}/followed-users`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    const message = `An error has occured when loading the followers: Status error ${response.status}`;
    alert(message);
    console.error(message);
    return [];
  }

  const jsonResponse = await response.json();
  return jsonResponse.followed_users;
};
