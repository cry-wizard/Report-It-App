import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useUser, useAuth } from "@clerk/clerk-expo";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useReport } from "../../hooks/useReport.js";  // 👈 import your hook

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const email = user?.primaryEmailAddress?.emailAddress;

  const { issue, fetchIssue } = useReport(email);

  const [isChecked, setIsChecked] = useState(false);
  const [totalIssue, setTotalIssue] = useState(0);
  const [totalBadges, setTotalBadges] = useState(0);

  useEffect(() => {
    if (email) {
      fetchIssue().then(() => {
        setTotalIssue(issue.length);
        setTotalBadges(issue.length * 5);
      });
    }
  }, [email, issue, fetchIssue]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/'); // 👈 go back to login
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <Entypo style={styles.headerIcon} name="dots-three-horizontal" size={24} color="black" />
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {user?.imageUrl ? (
          <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        ) : (
          <Text>No profile image</Text>
        )}
        <Text style={styles.userName}>{user?.fullName || "Guest"}</Text>
        <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      {/* Number of Issues + Badges */}
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="star-three-points-outline" size={24} color="black" />
            <Text style={styles.value}>{totalIssue}</Text>
          </View>
          <Text style={styles.label}>Reported Issue</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconRow}>
            <SimpleLineIcons name="badge" size={24} color="blue" />
            <Text style={styles.value}>{totalBadges}</Text>
          </View>
          <Text style={styles.label}>Badges</Text>
        </View>
      </View>

      {/* Settings */}
      <View>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
      <View style={{backgroundColor:'#fff',marginHorizontal:15,padding:10,borderWidth:1,borderRadius:10}}>
        <TouchableOpacity> 
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'row',alignContent:'center',padding:5}}>
              <MaterialIcons name="language" size={24} color="black" />
              <Text style={{paddingLeft:10}}>Language</Text>
            </View>
            <Text>English &gt;</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor:'#fff',marginHorizontal:15,padding:10,borderWidth:1,borderRadius:10,marginTop:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',alignContent:'center',padding:5}}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={{paddingLeft:10}}>Notification</Text>
          </View>
          <Switch value={isChecked} onValueChange={(val) => setIsChecked(val)} />
        </View>
      </View>

      {/* Sign Out */}
      <TouchableOpacity 
        style={{backgroundColor:'#0951c6',marginHorizontal:15,padding:10,borderWidth:1,borderRadius:10,marginTop:10}}
        onPress={handleSignOut}
      >
        <Text style={{textAlign:'center',color: "#fff", fontSize: 16, fontWeight: "600"}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    padding:10
  },
  headerText:{
    fontWeight:'bold',
    fontSize:20
  },
  headerIcon:{
    position:'absolute',
    right:9
  },
  profileImage:{
    width:100,
    height:100,
    borderRadius:50,
    marginBottom:10,
  },
  profileImageContainer:{
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
    margin:10,
    alignItems:'center',
    justifyContent:'center'
  },
  userName:{
    fontSize:18,
    fontWeight:"600",
    marginTop:5,
  },
  userEmail:{
    fontSize:14,
    color:"#64748b",
    marginTop:3,
  },
  settingsText:{
    fontSize:16,
    fontWeight:"500",
    margin:10,
  },
  container:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:20,
  },
  card:{
    flex:1,
    marginHorizontal:10,
    paddingVertical:30,
    backgroundColor:"#fff",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
  },
  iconRow:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:5,
  },
  value:{
    fontSize:20,
    fontWeight:"bold",
    marginLeft:6,
  },
  label:{
    fontSize:14,
    color:"#475569",
  },
});
