/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

import { ModalsParamList, StackParamList } from '../types/types';
import AccessScreen from '../screens/AccessScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ChapterOptionsModal from '../components/ChapterOptionsModal';
import ChooseBookScreen from '../screens/ChooseBookScreen';
import ChooseThemeScreen from '../screens/ChooseThemeScreen';
import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../screens/NotFoundScreen';
import SoundtrackOptionsModal from '../components/SoundtrackOptionsModal';
import OrchestraColors from '../constants/OrchestraColors';

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  const customTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: OrchestraColors[colorScheme ?? 'dark'].background,
      text: OrchestraColors[colorScheme ?? 'dark'].primaryText
    }
  };

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={customTheme}>
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
      <ModalStack.Screen
        name="ChapterOptions"
        component={ChapterOptionsModal}
      />
    </ModalStack.Navigator>
  );
}
