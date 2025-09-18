import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const AppMapView = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  )
}

export default AppMapView

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})