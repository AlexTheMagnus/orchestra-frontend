/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import OrchestraColors from '../constants/OrchestraColors';
import useColorScheme from '../hooks/useColorScheme';
import MySoundtracksScreen from '../screens/MySoundtracksScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SoundtrackScreen from '../screens/SoundtrackScreen';
import {
  BottomTabParamList,
  MySoundtracksParamList,
  FavoritesParamList,
  SearchParamList,
  MyProfileParamList,
  SoundtrackParamList
} from '../types/types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="My soundtracks"
      tabBarOptions={{ activeTintColor: OrchestraColors[colorScheme].tint }}
      screenOptions={({ route }) => ({
        tabBarButton: ['Soundtrack'].includes(route.name)
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
            <TabBarIcon name="musical-notes-outline" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="star-outline" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />
        }}
      />
      <BottomTab.Screen
        name="My profile"
        component={MyProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          )
        }}
      />
      <BottomTab.Screen name="Soundtrack" component={SoundtrackNavigator} />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MySoundtracksStack = createStackNavigator<MySoundtracksParamList>();

function MySoundtracksNavigator() {
  return (
    <MySoundtracksStack.Navigator>
      <MySoundtracksStack.Screen
        name="MySoundtracksScreen"
        component={MySoundtracksScreen}
        options={{ headerTitle: 'My soundtracks' }}
      />
    </MySoundtracksStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator<FavoritesParamList>();

function FavoritesNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerTitle: 'Favorites' }}
      />
    </FavoritesStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: 'Search' }}
      />
    </SearchStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator<MyProfileParamList>();

function MyProfileNavigator() {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{ headerTitle: 'My profile' }}
      />
    </MyProfileStack.Navigator>
  );
}

const SoundtrackStack = createStackNavigator<SoundtrackParamList>();

function SoundtrackNavigator() {
  return (
    <SoundtrackStack.Navigator>
      <SoundtrackStack.Screen
        name="SoundtrackScreen"
        component={SoundtrackScreen}
      />
    </SoundtrackStack.Navigator>
  );
}
