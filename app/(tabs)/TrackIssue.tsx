import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useReport } from "../../hooks/useReport.js";
import { useUser } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFormattedDate } from "../../hooks/useFormattedDate.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";

const TrackIssue = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const { issue, fetchIssue } = useReport(email);
  const { formatDate } = useFormattedDate();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (email) {
      fetchIssue();
    }
  }, [email, fetchIssue]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchIssue();
    setRefreshing(false);
  }, [fetchIssue]);

  // Get Color
  function getStatusColor(status: string) {
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

  function getStatusTextColor(status: string) {
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

  function getIconColor(status: string) {
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

  function getIconMaterial(status: string) {
    switch (status) {
      case "submitted":
        return <FontAwesome name="lightbulb-o" size={24} color="#fff" />;
      case "In Progress":
        return <FontAwesome5 name="paint-roller" size={24} color="#fff" />;
      case "Resolved":
        return <Ionicons name="footsteps-outline" size={24} color="#fff" />;
      default:
        return <FontAwesome name="question-circle" size={24} color="#fff" />;
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => router.push(`/IssueDetails/${item.id}`)}
    >
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: getIconColor(item.status) },
        ]}
      >
        {getIconMaterial(item.status)}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.issueTitle}>{item.category}</Text>
        <View style={styles.rowBetween}>
          <Text
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusColor(item.status),
                color: getStatusTextColor(item.status),
              },
            ]}
          >
            {item.status}
          </Text>
          <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <FontAwesome
          style={styles.icon}
          name="arrow-left"
          size={24}
          color="black"
        />
        <Text style={styles.header}>My Reports</Text>
      </View>
      <FlatList
        data={issue}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No issues found.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TrackIssue;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  icon: {
    position: "absolute",
    left: 15,
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 18,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontWeight: "600",
    overflow: "hidden",
  },
  dateText: {
    fontSize: 12,
    color: "#6b7280",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6b7280",
  },
});
