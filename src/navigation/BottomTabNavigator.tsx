/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  BottomTabParamList,
  MySoundtracksParamList,
  FavoritesParamList,
  SearchParamList,
  MyProfileParamList
} from '../types/types';
import { useThemeColor } from '../components/Themed';
import FavoritesScreen from '../screens/FavoritesScreen';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import MySoundtracksScreen from '../screens/MySoundtracksScreen';
import OrchestraColors from '../constants/OrchestraColors';
import OrchestraIcon from '../components/icons/OrchestraIcon';
import SearchScreen from '../screens/SearchScreen';
import SoundtrackScreen from '../screens/SoundtrackScreen';
import useColorScheme from '../hooks/useColorScheme';
import UserProfileScreen from '../screens/UserProfileScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="My soundtracks"
      tabBarOptions={{
        activeTintColor: OrchestraColors[colorScheme].tabIconSelected,
        inactiveTintColor: OrchestraColors[colorScheme].tabIconNonSelected,
        activeBackgroundColor: OrchestraColors[colorScheme].bottomTabNav,
        inactiveBackgroundColor: OrchestraColors[colorScheme].bottomTabNav
      }}
      screenOptions={({ route }) => ({
        tabBarButton: [
          'Soundtrack',
          'UserProfile',
          'Followers',
          'Following'
        ].includes(route.name)
          ? () => {
              return null;
            }
          : undefined
      })}
    >
      <BottomTab.Screen
        name="My soundtracks"
        component={MySoundtracksNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon="mySoundtracks" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon="favorites" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon icon="search" color={color} />
        }}
      />
      <BottomTab.Screen
        name="My profile"
        component={MyProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon icon="profile" color={color} />
        }}
      />
      <BottomTab.Screen name="Soundtrack" component={SoundtrackScreen} />
      <BottomTab.Screen name="UserProfile" component={UserProfileScreen} />
      <BottomTab.Screen name="Followers" component={FollowersScreen} />
      <BottomTab.Screen name="Following" component={FollowingScreen} />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarIcon = ({
  icon,
  color
}: {
  icon: React.ComponentProps<typeof OrchestraIcon>['icon'];
  color: string;
}) => {
  return (
    <OrchestraIcon
      size={30}
      style={{ marginBottom: -3 }}
      icon={icon}
      color={color}
    />
  );
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MySoundtracksStack = createStackNavigator<MySoundtracksParamList>();

function MySoundtracksNavigator() {
  const theme = useColorScheme();

  return (
    <MySoundtracksStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: OrchestraColors[theme].headerBackground
        },
        headerTitleStyle: { alignSelf: 'center' }
      }}
    >
      <MySoundtracksStack.Screen
        name="MySoundtracksScreen"
        component={MySoundtracksScreen}
        options={{
          headerTitle: 'My soundtracks'
        }}
      />
    </MySoundtracksStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator<FavoritesParamList>();

function FavoritesNavigator() {
  const theme = useColorScheme();

  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: OrchestraColors[theme].headerBackground
        },
        headerTitleStyle: { alignSelf: 'center' }
      }}
    >
      <FavoritesStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerTitle: 'Favorites'
        }}
      />
    </FavoritesStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator<MyProfileParamList>();

function MyProfileNavigator() {
  const theme = useColorScheme();

  return (
    <MyProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: OrchestraColors[theme].headerBackground
        },
        headerTitleStyle: { alignSelf: 'center' }
      }}
    >
      <MyProfileStack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          headerTitle: 'My profile'
        }}
      />
    </MyProfileStack.Navigator>
  );
}
