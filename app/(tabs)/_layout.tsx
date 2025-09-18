import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { height: 70, paddingBottom: 10 } }} >
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
            <Ionicons name={focused ? 'list-outline' : 'locate-outline'} color={color} size={size} />

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