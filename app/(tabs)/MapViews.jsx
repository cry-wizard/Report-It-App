import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapViewStyle from "../../utils/MapViewStyle.json"
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';


export default function MapViews() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AntDesign style={styles.logo}name="menu" size={24} color="black" />
        <Text style={{fontSize:20,fontFamily:'bold'}}>Nearby Issue</Text>
        <FontAwesome5 style={styles.logo2} name="search" size={24} color="black" />
      </View>
      <MapView
        style={styles.map}
        provider='google'
        showsUserLocation={true}
        customMapStyle={MapViewStyle}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="Apple"
            description="This is a description"
          />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  title:{flexDirection:'row',justifyContent:'center',alignItems:'center', height:50},
  logo2:{position:'absolute',right:10},
  logo:{position:'absolute',left:10}
});
