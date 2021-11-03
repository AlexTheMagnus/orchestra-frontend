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
        path: 'root',
        screens: {
          MySoundtracks: {
            path: 'my-soundtracks',
            screens: {
              ChooseBookScreen: 'choose-book'
            }
          },
          Favorites: {
            path: 'favorites'
          },
          Search: {
            path: 'search'
          },
          MyProfile: {
            path: 'my-profile'
          },
          Soundtrack: {
            path: 'soundtrack',
            screens: {
              ChooseThemeScreen: 'choose-theme'
            }
          }
        }
      },
      Modal: {
        path: 'modal',
        screens: {
          SoundtrackOptions: 'soundtrack-options'
        }
      },
      NotFound: '*'
    }
  }
};
