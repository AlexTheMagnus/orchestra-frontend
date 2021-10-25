/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import AccessScreen from '../screens/AccessScreen';
import ChooseBookScreen from '../screens/ChooseBookScreen';
import ChooseThemeScreen from '../screens/ChooseThemeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { ModalsParamList, StackParamList } from '../types/types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SoundtrackOptionsModal from '../components/SoundtrackOptionsModal';

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<StackParamList>();
const ModalStack = createStackNavigator<ModalsParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Access" component={AccessScreen} />
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen name="ChooseBook" component={ChooseBookScreen} />
      <RootStack.Screen name="ChooseTheme" component={ChooseThemeScreen} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} />
      <RootStack.Screen name="Modal" component={ModalStackNavigator} />
    </RootStack.Navigator>
  );
}

function ModalStackNavigator() {
  return (
    <ModalStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <ModalStack.Screen
        name="SoundtrackOptions"
        component={SoundtrackOptionsModal}
      />
    </ModalStack.Navigator>
  );
}
