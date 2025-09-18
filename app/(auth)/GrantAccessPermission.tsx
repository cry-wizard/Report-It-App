import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

const GrantAccessPermission = () => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    requestPermissions(); // 👈 Ask immediately on mount
  }, []);

  const checkAllPermissions = async () => {
    const { status: locStatus } = await Location.getForegroundPermissionsAsync();
    const { status: camStatus } = await Camera.getCameraPermissionsAsync();

    console.log("Location:", locStatus, "Camera:", camStatus);

    if (locStatus === "granted" && camStatus === "granted") {
      router.replace("/(tabs)/ReportIssue");
    } else {
      setChecking(false);
    }
  };

  const requestPermissions = async () => {
    await Location.requestForegroundPermissionsAsync();
    await Camera.requestCameraPermissionsAsync();
    checkAllPermissions();
  };

  if (checking) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 100 }}>
          Checking permissions...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", marginTop: 25, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Grant Permission</Text>
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
          <View style={styles.shield}>
            <FontAwesome6 name="shield-cat" size={44} color="blue" />
          </View>
        </View>

        <View>
          <Text style={styles.title}>We need your permission</Text>
          <Text style={styles.subtitle}>
            To help you report issues effectively, we need access to certain features on your device.
          </Text>
        </View>

        <PermissionRow
          icon="location-outline"
          title="Location Access"
          desc="To pinpoint the exact location of the issue you're reporting."
        />

        <PermissionRow
          icon="camera-outline"
          title="Camera"
          desc="To capture images or videos of the issue for better reporting."
        />

        <PermissionRow
          icon="notifications-outline"
          title="Notifications"
          desc="To keep you updated on the status of your reports and other important information."
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          You can always change this later in settings
        </Text>
      </View>
    </View>
  );
};

const PermissionRow = ({ icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <View style={styles.row}>
    <View style={styles.rowIcon}>
      <Ionicons name={icon} size={24} color="blue" />
    </View>
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowDesc}>{desc}</Text>
    </View>
  </View>
);

export default GrantAccessPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  shield: {
    backgroundColor: "#93c5fd",
    width: 70,
    height: 70,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 10,
    color: "gray",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  rowIcon: {
    backgroundColor: "#93c5fd",
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flexDirection: "column",
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  rowDesc: {
    color: "gray",
    fontSize: 13,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  note: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
});
