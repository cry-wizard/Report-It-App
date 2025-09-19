import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { height: 70, paddingBottom: 10 } }} >
            <StatusBar style="dark" />
        <Tabs.Screen
        name="ReportIssue"
        options={{
          title: 'Issue',
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name={focused ? 'report' : 'report-problem'} color={color} size={size} />

          ),
        }}
      />
      <Tabs.Screen
        name="TrackIssue"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome5 name={focused ? 'list-ul' : 'list-alt'} color={color} size={24}/>

          ),
        }}
      />
      <Tabs.Screen
        name="MapViews"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
    
  )
}

export default _layout