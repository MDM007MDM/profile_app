import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useRouter } from "expo-router";

export default function Landing() {
  const { colors, toggleTheme, theme } = useTheme();
  const router = useRouter();
  const styles = getStyles(colors);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.sectionTitle }]}>Profile</Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}><Text>{theme === 'light' ? 'Light' : 'Dark'}</Text></TouchableOpacity>
        </View>

        <Image source={require("../assets/image/Screenshot 2025-07-01 130315.png")} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>Hello World</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>We are CIS</Text>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={() => router.push('/profile')}>
          <Text style={[styles.btnText, { color: colors.skillText }]}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={() => router.push('/books')}>
          <Text style={[styles.btnText, { color: colors.skillText }]}>Books</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={() => router.push('/signin')}>
          <Text style={[styles.btnText, { color: colors.skillText }]}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={() => router.push('/signup')}>
          <Text style={[styles.btnText, { color: colors.skillText }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    card: { width: 320, borderRadius: 12, padding: 20, alignItems: 'center', shadowColor: colors.accent, shadowOffset: {width:0, height:4}, shadowOpacity:0.15, shadowRadius:8, elevation:6 },
    headerRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: '700' },
    themeBtn: { padding: 6, borderRadius: 8 },
    avatar: { width: 100, height: 100, borderRadius: 50, marginTop: 12, marginBottom: 12, borderWidth: 4, borderColor: colors.yellow },
    name: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
    subtitle: { fontSize: 12, marginBottom: 12 },
    btn: { width: '100%', paddingVertical: 10, borderRadius: 8, marginTop: 8, alignItems: 'center' },
    btnText: { fontWeight: '700' },
  });
}