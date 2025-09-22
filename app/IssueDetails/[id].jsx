import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFormattedDate } from "../../hooks/useFormattedDate.js";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import MapViewStyle from "../../utils/MapViewStyle.json";

const API_URL = "https://isuue-report-api.onrender.com/api/report";

const IssueDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { formatDate } = useFormattedDate();

  function parseLocation(locationStr) {
    if (!locationStr) return null;
    const [lat, lng] = locationStr.split(",").map(Number);
    return { latitude: lat, longitude: lng };
  }

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await fetch(`${API_URL}/id/${id}`);
        const data = await res.json();
        setIssue(data[0]); // backend returns array
      } catch (err) {
        console.error("Error fetching issue:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIssue();
  }, [id]);

  function getStatusColor(status) {
    switch (status) {
      case "submitted":
        return "#dbeafe";
      case "In Progress":
        return "#f3e8ff";
      case "Resolved":
        return "#dcfce7";
      default:
        return "#e5e7eb";
    }
  }

  function getStatusTextColor(status) {
    switch (status) {
      case "submitted":
        return "#1e3a8a";
      case "In Progress":
        return "#6b21a8";
      case "Resolved":
        return "#166534";
      default:
        return "#374151";
    }
  }

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!issue) return <Text>No issue found</Text>;

  return (
    <View style={{ flex: 1 }}>
      {/* Header stays fixed */}
      <View style={styles.header}>
        <AntDesign
          onPress={() => router.back()}
          style={styles.iconLogo}
          name="arrow-left"
          size={24}
          color="black"
        />
        <Text style={styles.HeaderText}>Report Details</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Image */}
        <Image
          style={{ width: "100%", height: 200, objectFit: "cover" }}
          source={{ uri: `${issue.image}` }}
        />

        {/* Title and Status */}
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.issueTitle}>{issue.category}</Text>
            <Text
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusColor(issue.status),
                  color: getStatusTextColor(issue.status),
                },
              ]}
            >
              {issue.status}
            </Text>
          </View>
          <Text style={styles.dateText}>{formatDate(issue.created_at)}</Text>
        </View>

        {/* Description */}
        <View>
          <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: "row" }}>
            <MaterialIcons name="description" size={24} color="gray" />
            <Text style={{ marginLeft: 10, fontStyle: "italic" }}>Description</Text>
          </View>
          <Text style={{ marginHorizontal: 55, color: "gray", fontSize: 13 }}>
            {issue.description}
          </Text>
        </View>

        {/* Location Map */}
        <View>
          <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: "row" }}>
            <Ionicons name="location-outline" size={24} color="gray" />
            <Text style={{ marginLeft: 10, fontStyle: "italic" }}>Location</Text>
            <Text style={{ justifyContent: "center", color: "gray", fontSize: 13 }}>
              →({issue.location})
            </Text>
          </View>
          <MapView
            style={styles.map}
            provider="google"
            showsUserLocation={true}
            customMapStyle={MapViewStyle}
            initialRegion={{
              latitude: parseLocation(issue.location)?.latitude || 0,
              longitude: parseLocation(issue.location)?.longitude || 0,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {parseLocation(issue.location) && (
              <Marker
                coordinate={parseLocation(issue.location)}
                title={issue.category}
                description={issue.description}
              />
            )}
          </MapView>
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 10 }} />

        {/* Status History */}
        <Text style={styles.statusHistoryText}>Status History</Text>
        <View style={styles.statusContainer}>
          {["submitted", "In Progress", "Resolved"].map((step, index) => {
            const currentStatus = issue.status;
            const statusOrder = ["submitted", "In Progress", "Resolved"];
            const isActive = currentStatus === step;
            const isCompleted = statusOrder.indexOf(currentStatus) >= index;

            return (
              <React.Fragment key={step}>
                <View style={styles.statusStep}>
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: isCompleted ? "#4CAF50" : "#e5e7eb",
                        borderColor: isActive ? "#2563eb" : "#9ca3af",
                      },
                    ]}
                  />
                  <Text style={[styles.statusLabel, { color: isActive ? "#2563eb" : "#6b7280" }]}>
                    {step}
                  </Text>
                </View>

                {index < 2 && (
                  <View
                    style={[styles.line, { backgroundColor: isCompleted ? "#4CAF50" : "#e5e7eb" }]}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default IssueDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    zIndex: 10,
  },
  HeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconLogo: {
    position: "absolute",
    left: 10,
  },
  issueTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontWeight: "600",
    overflow: "hidden",
  },
  dateText: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 4,
  },
  statusHistoryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  map: {
    width: "90%",
    height: 150,
    marginHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  statusStep: {
    alignItems: "center",
    width: 70,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 5,
  },
  statusLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  line: {
    flex: 1,
    height: 2,
    marginBottom: 15,
  },
});
