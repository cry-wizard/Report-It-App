import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Image, 
  StatusBar
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import * as Location from "expo-location";
const ReportIssue = () => {
  const [zone, setZone] = useState("North");
  const [media, setMedia] = useState([]);
  const [category, setCategory] = useState("Others");
  const [locationCoords, setLocationCoords] = useState(null);
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("Fetching location...");

  // ✅ Camera / Gallery handlers
  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) setMedia([result.assets[0].uri]); // replace old image
    } catch (err) {
      console.error(err);
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) setMedia([result.assets[0].uri]); // replace old image
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Submit handler
  const handleSubmit = () => {
    if (!media.length || !description || !locationCoords) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Submitting report...");
    console.log({ zone, category, description, media, locationCoords });
  };

  // ✅ Fetch location + reverse geocode
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationName("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationCoords(location.coords);

      let geocode = await Location.reverseGeocodeAsync(location.coords);
      if (geocode.length > 0) {
        const place = geocode[0];
        const fullAddress = `${place.name || ""} ${place.street || ""}, ${place.city || ""}, ${place.region || ""}`;
        setLocationName(fullAddress.trim());
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      {/* ✅ Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report an Issue</Text>
      </View>

      {/* ✅ Scrollable Content */}
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.body}>
          {/* ✅ Image Preview (if exists) */}
          {media.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: media[0] }} style={styles.imagePreview} />
              <Text style={styles.imageHint}>Tap Camera or Gallery to update</Text>
            </View>
          )}

          <StatusBar  backgroundColor='transparent' />
          {/* Media Buttons */}
          <Text style={styles.sectionTitle}>Add Media</Text>
          <View style={styles.mediaRow}>
            <TouchableOpacity style={styles.mediaButton} onPress={openCamera}>
              <MaterialIcons name="photo-camera" size={32} color="#475569" />
              <Text style={styles.mediaText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={openGallery}>
              <MaterialIcons name="photo-library" size={32} color="#475569" />
              <Text style={styles.mediaText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {/* Zone */}
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.row}>
            <FontAwesome6 name="earth-asia" size={24} color="black" />
            <Text style={styles.label}>Zone</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={zone} onValueChange={setZone}>
              <Picker.Item label="North" value="North" />
              <Picker.Item label="South" value="South" />
              <Picker.Item label="East" value="East" />
              <Picker.Item label="West" value="West" />
            </Picker>
          </View>

          {/* Category */}
          <View style={styles.row}>
            <MaterialIcons name="category" size={24} color="black" />
            <Text style={styles.label}>Category</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={category} onValueChange={setCategory}>
              <Picker.Item label="Pithole" value="Pithole" />
              <Picker.Item label="Waterlogging" value="Waterlogging" />
              <Picker.Item label="Garbage" value="Garbage" />
              <Picker.Item label="Animal" value="Animal" />
            </Picker>
          </View>

          {/* Location */}
          <Text style={styles.title}>Location</Text>
          <View style={styles.locationCard}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="location-on" size={24} color="#64748b" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.locationText}>Current Location</Text>
              <Text style={styles.statusText}>{locationName}</Text>
            </View>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.gpsIcon}
            >
              <MaterialIcons name="gps-fixed" size={24} color="#94a3b8" />
            </Animatable.View>
          </View>

          {/* Description */}
          <Text style={styles.title}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Add a description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ReportIssue

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },

  // ✅ Fixed Header
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  body: { paddingHorizontal: 16, paddingVertical: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "400", padding: 15 },

  // ✅ Image Preview
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
  },
  imageHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#64748b",
  },

  mediaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, gap: 8 },
  mediaButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    marginHorizontal: 5,
    height: 100,
    justifyContent: "center",
  },
  mediaText: { fontSize: 14, fontWeight: "500", color: "#475569" },

  row: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 25 },
  label: { fontSize: 16, fontWeight: "500" },

  pickerContainer: {
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 5,
    marginTop: 5,
  },

  title: { fontSize: 16, fontWeight: "600", color: "#475569", marginVertical: 12 },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1 },
  locationText: { fontSize: 16, fontWeight: "600", color: "#1e293b" },
  statusText: { fontSize: 14, color: "#64748b" },
  gpsIcon: { marginLeft: "auto" },

  descriptionInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },

  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0951c6",
    borderRadius: 12,
    marginTop: 20,
    height: 50,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
})