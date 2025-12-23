import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Settings from '../screens/Settings';
import Account from '../screens/Account';
import Liked from '../screens/Liked';
import Home from '../screens/Home';
import Camera from '../screens/Camera';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#3B1E54',
        tabBarInactiveTintColor: '#9B7EBD',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons name="home-outline" size={30} color="#9B7EBD" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Like"
        component={Liked}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons name="heart-outline" size={30} color="#9B7EBD" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="#9B7EBD"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name="camera-outline"
                size={30}
                color="#9B7EBD"
              />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons name="settings-outline" size={30} color="#9B7EBD" />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
