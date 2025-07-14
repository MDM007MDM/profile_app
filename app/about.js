import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useRouter } from "expo-router";

const subject = {
  code: "IN405109",
  version: "1",
  name: "การเขียนโปรแกรมบนอุปกรณ์เคลื่อนที่แบบไฮบริด",
  desc: `สถาปัตยกรรมฮาร์ดแวร์ คุณลักษณะและข้อจํากัดของอุปกรณ์เคลื่อนที่ เครื่องมือและภาษาที่ใช้สําหรับพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ภาษาหลากหลายแพลตฟอร์ม กระบวนการพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม การใช้หน่วยความจําและส่วนเก็บบันทึกข้อมูล การขออนุญาตและการเข้าถึงส่วนฮาร์ดแวร์ ส่วนติดต่อกับผู้ใช้ การสื่อสารเครือข่ายกับภายนอก การเชื่อมโยงกับระบบเครืองแม่ข่าย การทดสอบโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ระบบคอมพิวเตอร์ ประเด็นด้านความมั่นคง การฝึกปฏิบัติ`,
};

export default function About() {
  const { theme, toggleTheme, colors } = useTheme();
  const router = useRouter();
  const styles = getStyles(colors, theme);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
          <Text style={styles.themeBtnText}>{theme === "light" ? "🌙" : "☀️"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={[styles.backBtnText, theme === 'dark' && {color: '#fff'}]}>◀</Text>
        </TouchableOpacity>
        <Text style={[styles.title, theme === 'dark' && {color: '#fff'}]}>ข้อมูลรายวิชา</Text>
        <View style={styles.infoRow}><Text style={styles.label}>รหัสวิชา:</Text><Text style={styles.value}>{subject.code}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Version:</Text><Text style={styles.value}>{subject.version}</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>ชื่อวิชา:</Text><Text style={styles.value}>{subject.name}</Text></View>
        <Text style={styles.descTitle}>คำอธิบายรายวิชา</Text>
        <Text style={styles.desc}>{subject.desc}</Text>
      </View>
    </ScrollView>
  );
}

function getStyles(colors, theme) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 28,
      padding: 32,
      alignItems: "flex-start",
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
      width: 350,
      position: "relative",
      marginBottom: 40,
    },
    themeBtn: {
      alignSelf: "flex-end",
      marginBottom: 10,
      backgroundColor: colors.accent,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    themeBtnText: {
      color: colors.skillText,
      fontWeight: "bold",
      fontSize: 15,
    },
    backBtn: {
      alignSelf: "flex-end",
      marginBottom: 10,
      backgroundColor: colors.yellow,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    backBtnText: {
      color: theme === 'dark' ? '#fff' : colors.sectionTitle,
      fontWeight: "bold",
      fontSize: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme === 'dark' ? '#fff' : colors.sectionTitle,
      marginBottom: 16,
      alignSelf: "center",
      width: "100%",
      textAlign: "center",
    },
    infoRow: {
      flexDirection: "row",
      marginBottom: 8,
    },
    label: {
      fontWeight: "bold",
      color: colors.sectionTitleYellow,
      marginRight: 8,
      fontSize: 16,
    },
    value: {
      color: colors.text,
      fontSize: 16,
    },
    descTitle: {
      fontWeight: "bold",
      color: colors.sectionTitle,
      marginTop: 18,
      marginBottom: 6,
      fontSize: 17,
    },
    desc: {
      color: colors.subtext,
      fontSize: 15,
      lineHeight: 22,
    },
  });
} 