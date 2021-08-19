/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Access: 'access',
      Root: {
        screens: {
          MySoundtracks: {
            screens: {
              MySoundtracksScreen: 'my-soundtracks',
              ChooseBookScreen: 'choose-book'
            }
          },
          Favorites: {
            screens: {
              FavoritesScreen: 'favorites'
            }
          },
          Search: {
            screens: {
              SearchScreen: 'search'
            }
          },
          MyProfile: {
            screens: {
              MyProfileScreen: 'my-profile'
            }
          }
        }
      },
      SoundtrackScreen: 'soundtrack',
      NotFound: '*'
    }
  }
};
