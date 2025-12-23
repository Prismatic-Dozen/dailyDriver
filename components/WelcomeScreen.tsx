import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Tabs from '../Navigation/Tabs';

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({route}: WelcomeProps) {
  return (
    <View style={styles.container}>
      <Tabs/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50, // Make it circular
  },
});
