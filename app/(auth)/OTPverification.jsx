import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import AntDesign from "@expo/vector-icons/AntDesign";


const OTPverification = () => {
    const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email || "";
  const { signUp, isLoaded, setActive } = useSignUp();

  const [code, setCode] = useState(new Array(6).fill(""));
  const inputs = useRef([]);
  const [timer, setTimer] = useState(90);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2,"0")}:${String(remainingSeconds).padStart(2,"0")}`;
  };

  const handleBackPress = () => router.back();

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text !== "" && index < 5) inputs.current[index + 1].focus();
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResendCode = async () => {
    setIsTimerActive(true);
    setTimer(120);
    if (isLoaded) {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    }
  };

  const isCodeComplete = code.every(d => d !== "");

  const handleVerify = async () => {
    if (!isLoaded) return;
    try {
      const verification = await signUp.attemptEmailAddressVerification({ code: code.join('') });
      if (verification.status === "complete") {
        await setActive({ session: verification.createdSessionId });
        router.replace('/(auth)/GrantAccessPermission');
      } else {
        console.error("Verification incomplete:", verification);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.safeAreaContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter the verification code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to {email}.
        </Text>

        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleBackspace(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={input => (inputs.current[index] = input)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !isCodeComplete && styles.btnDisabled]}
          disabled={!isCodeComplete}
          onPress={handleVerify}
        >
          <Text style={styles.btnText}>Verify</Text>
        </TouchableOpacity>
        
        <View style={styles.resendContainer}>
          {isTimerActive ? (
            <Text style={styles.resendText}>
              Resend code in <Text style={{color:'black'}}>{formatTime(timer)}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.RsendTxt}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default OTPverification

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: "white" },
  header: { flexDirection: "row", paddingHorizontal: 35, marginTop: 25 },
  contentContainer: { paddingHorizontal: 20, marginTop: 40, alignItems: "center" },
  title: { fontSize: 25, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginTop: 10, color: "#617589" },
  inputContainer: { flexDirection: "row", justifyContent: "space-between", width: "80%", marginTop: 30 },
  inputBox: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8, width: 45, height: 55, textAlign: "center", fontSize: 24, fontWeight: "bold" },
  btn: { alignItems: "center", justifyContent: "center", backgroundColor: "#1172d4", borderRadius: 12, height: 50, width: "80%", marginTop: 30 },
  btnDisabled: { backgroundColor: "#a0aec0" },
  btnText: { color: "white", fontSize: 18, fontWeight: "bold" },
  resendContainer: { flexDirection: "row", marginTop: 20 },
  resendText: { fontSize: 14, color: "#617589" },
  resendLink: { color: "blue", fontWeight: "500", marginLeft: 5 },
  RsendTxt: { color: "#1172d4", fontWeight: "500", fontSize: 16, letterSpacing: 0.5 }
})