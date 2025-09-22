import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";


const LoginScreen = () => {
    const router  = useRouter()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const { startOAuthFlow: startGoogle } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startFacebook } = useOAuth({ strategy: "oauth_facebook" });
  const { signUp, isLoaded } = useSignUp();


  const handleGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogle();
      if (createdSessionId) await setActive?.({ session: createdSessionId });
      router.push('/(tabs)/ReportIssue');
    } catch (err) {
      console.error("Google OAuth error", err);
    }
  };

  const handleFacebook = async () => {
    try {
      const { createdSessionId, setActive } = await startFacebook();
      if (createdSessionId) await setActive?.({ session: createdSessionId });
      router.replace('/(tabs)/ReportIssue');
    } catch (err) {
      console.error("Facebook OAuth error", err);
    }
  }

  const handleEmailSignUp = async () => {
  if (!isLoaded) return;
  try {
    await signUp.create({ emailAddress: email, password });
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    router.push('/(auth)/OTPverification' as any)
  } catch (err) {
    console.error(err);
  }
}

  return (
    <View style={styles.container}>
        <View>
        <View style={styles.logo}>
          <MaterialIcons name="outlined-flag" size={84} color="blue" />
        </View>
        <Text style={styles.header}>Report it</Text>
        <Text style={styles.subHeader}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setemail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setpassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn} onPress={handleEmailSignUp}>
          <Text style={styles.btnText}>Continue with Email</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} onPress={handleFacebook}>
          <MaterialIcons name="facebook" size={24} color="black" />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleGoogle}>
          <FontAwesome5 name="google" size={24} color="black" />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{paddingHorizontal:25,textAlign:'center'}}>By continuing, you agree to our
          <Text style={{color:'#1172d4'}}>Terms of Service</Text>and
          <Text style={{color:'#1172d4'}}>Privacy Policy</Text>.
        </Text>
      </View>
      <View>
        <Text style={{textAlign:'center',padding:10}}>Don&apos;t have an account? 
          <Text style={{color:'#1172d4',fontFamily:'500'}}onPress={()=>router.push('/(auth)/NewUser')}> Sign up</Text>
        </Text>
      </View>
      <View>
        <Text style={{textAlign:'center',padding:10}}>App version 1.0.0</Text>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  logo: { alignItems: "center", marginTop: 20 },
  header: { fontSize: 30, fontWeight: "bold", textAlign: "center" },
  subHeader: {
    fontSize: 20,
    textAlign: "center",
    color: "#617589",
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  btn: {
    backgroundColor: "#1172d4",
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dividerLine: { flexGrow: 1, borderTopWidth: 1, borderColor: "#d1d5db" },
  dividerText: {
    flexShrink: 1,
    marginHorizontal: 16,
    color: "#9ca3af",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  socialButtonText: { color: "#111418", fontSize: 16, fontWeight: "500" },
});
