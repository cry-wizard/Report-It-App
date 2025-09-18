import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useSignUp } from "@clerk/clerk-expo";

const NewUser = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { signUp, isLoaded } = useSignUp();



  useEffect(() => {
    if (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phoneNumber.trim() !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [fullName, email, password, confirmPassword, phoneNumber]);

  const handleBackPress = () => {
    router.back();
  };

//   const handleSignUp = () => {
//     if (!isFormValid) {
//       Alert.alert("Error", "Please fill all fields.");
//       return;
//     }
//     router.replace('/(auth)/OTPverification');
//   };
    const handleSignUp = async () => {
  if (!isLoaded) return;
  try {
    await signUp.create({ emailAddress: email, password });
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    router.push('/(auth)/OTPverification');
  } catch (err) {
    console.error(err);
  }
}
  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("help")}>
          <Feather name="help-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Create your account</Text>
        <Text style={styles.subtitleText}>Let&apos;s get started</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="user"
              size={20}
              color="#617589"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor="#94a3b8"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="mail"
              size={20}
              color="#617589"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="lock"
              size={20}
              color="#617589"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="lock"
              size={20}
              color="#617589"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign
              name="phone"
              size={20}
              color="#617589"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.btn, !isFormValid && styles.btnDisabled]}
            onPress={handleSignUp}
            disabled={!isFormValid}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text
                style={styles.loginLink}
                onPress={() => router.push('/(auth)/LoginScreen')}
              >
                Log in
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default NewUser;

const styles = StyleSheet.create({
    fullScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginTop: 35,
  },
  contentContainer: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 40,
    marginLeft: 15,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 15,
    color: "#617589",
  },
  inputContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#323e4eff",
  },
  bottomContainer: {
    marginVertical: 35,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1172d4",
    borderRadius: 12,
    height: 50,
    marginHorizontal: 10,
  },
  btnDisabled: {
    backgroundColor: "#a0aec0",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    textAlign: "center",
  },
  loginLink: {
    color: "blue",
    fontWeight: "500",
  },
});
