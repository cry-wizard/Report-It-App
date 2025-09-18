import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from 'expo-router'
import { StatusBar } from "expo-status-bar";


const StartingPage = () => {
    const router = useRouter()
    const handleStart =()=>{
        router.replace('/(auth)/LoginScreen')
    }
  return (
    <View>
       <View>
        <Image source={require('../assets/images/p1.png')} style={styles.img} />
      </View>
      <Text style={styles.heading}>Report issues, improve your community</Text>
      <Text style={styles.des}>
        Help us make our city a better place by reporting issues like
        potholes,graffiti, and more.
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 50,
          paddingBottom: 20,
        }}
      >
        <MaterialIcons name="report" size={24} color="blue" />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 20 }}>
            Easy Reporting
          </Text>
          <Text style={{ fontSize: 15, paddingLeft: 20, color: "#4B556" }}>
            Quickly submit reports with photos and location.
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 50,
          paddingBottom: 20,
        }}
      >
        <MaterialIcons name="update" size={24} color="blue" />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 20 }}>
            Stay Updated
          </Text>
          <Text style={{ fontSize: 15, paddingLeft: 20, color: "#4B556" }}>
            Get real-time status updates on your reports
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 50,
          paddingBottom: 20,
        }}
      >
        <MaterialIcons name="group" size={24} color="blue" />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 20 }}>
            Easy Reporting
          </Text>
          <Text style={{ fontSize: 15, paddingLeft: 20, color: "#4B556" }}>
            See the difference you&apos;re making in your neighborhood.
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleStart}>
        <Text style={styles.txt}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  )
}

export default StartingPage

const styles = StyleSheet.create({
     img: {
    width: "100%",
    height: 250,
    objectFit: "fill",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 30,
  },
  des: {
    color: "#4B5563",
    fontSize: 18,
    fontWeight: "normal",
    lineHeight: 26,
    paddingBottom: 12,
    paddingTop: 4,
    textAlign: "center",
    paddingHorizontal: 45,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 20,
    backgroundColor: "#1172d4",
    shadowColor: "#000",
    borderRadius: 12,
    marginHorizontal: 50,
    height: 50,
    marginTop: 20,
  },
  txt: {
    color: "white",
    fontSize: 18, 
    fontWeight: "bold", 
    lineHeight: 24,
    letterSpacing: 0.5,
  }
})