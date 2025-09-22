import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const API_URL = "https://isuue-report-api.onrender.com/api/report";

// Minimalist map style to hide POIs, labels, etc.
const mapStyle = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
];

export default function MapViews() {
  const [location, setLocation] = useState(null);
  const [issues, setIssues] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parse "lat,lng" string
  const parseLocation = (str) => {
    if (!str) return null;
    const [lat, lng] = str.split(",").map((v) => parseFloat(v));
    if (isNaN(lat) || isNaN(lng)) return null;
    return { latitude: lat, longitude: lng };
  };

  // Marker color by status
  const getMarkerColor = (status) => {
    switch (status) {
      case "Submitted":
        return "red";
      case "In Progress":
        return "orange";
      case "Resolved":
        return "green";
      default:
        return "blue";
    }
  };

  // Get user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        setLoading(false);
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
    })();
  }, []);

  // Fetch all issues
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/all`);
        const data = await res.json();
        // Filter out any invalid locations
        const validData = data.filter((i) => parseLocation(i.location));
        setIssues(validData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.title}>
        <AntDesign style={styles.logo} name="menu" size={24} color="black" />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Nearby Issues</Text>
        <FontAwesome5 style={styles.logo2} name="search" size={24} color="black" />
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {issues.map((issue) => {
          const coords = parseLocation(issue.location);
          if (!coords) return null;
          return (
            <Marker
              key={issue.id} // ✅ unique key
              coordinate={coords}
              title={issue.category}
              pinColor={getMarkerColor(issue.status)}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  logo2: { position: "absolute", right: 10 },
  logo: { position: "absolute", left: 10 },
});
