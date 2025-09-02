import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useRouter } from "expo-router";

const profile = {
  name: "นางสาว ชฎาพร พินิจสัย",
  studentId: "653450281-9",
  major: "วิทยาการคอมพิวเตอร์และสารสนเทศ",
  program: "วิทยาการคอมพิวเตอร์และสารสนเทศ",
  university: "ขอนแก่น วิทยาเขตหนองคาย",
  codingSkills: ["HTML", "CSS", "JavaScript", "Python"],
  languages: ["ไทย", "อังกฤษ", "เกาหลี"],
};

const Profile = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const router = useRouter();
  const styles = getStyles(colors);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
          <Text style={styles.themeBtnText}>{theme === "light" ? "🌙" : "☀️"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutBtn} onPress={() => router.push("/about")}>
          <Text style={[styles.aboutBtnText, theme === 'dark' && { color: '#fff' }]}>รายวิชา</Text>
        </TouchableOpacity>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../assets/image/Screenshot 2025-07-01 130315.png")}
            style={styles.avatar}
          />
          <View style={styles.avatarRing} />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.infoRowContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconCirclePurple}>
              <Text style={styles.infoIconText}>ID</Text>
            </View>
            <Text style={styles.infoValue}>{profile.studentId}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircleYellow}>
              <Text style={styles.infoIconText}>สาขา</Text>
            </View>
            <Text style={styles.infoValue}>{profile.major}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIconCirclePurple}>
              <Text style={styles.infoIconText}>หลักสูตร</Text>
            </View>
            <Text style={styles.infoValue}>{profile.program}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircleYellow}>
              <Text style={styles.infoIconText}>ม.</Text>
            </View>
            <Text style={styles.infoValue}>{profile.university}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ความสามารถด้าน Coding</Text>
          <View style={styles.skillList}>
            {profile.codingSkills.map((skill, idx) => (
              <View key={idx} style={styles.skillBadgePurple}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitleYellow}>ความสามารถด้านภาษา</Text>
          <View style={styles.skillList}>
            {profile.languages.map((lang, idx) => (
              <View key={idx} style={styles.skillBadgeYellow}>
                <Text style={styles.skillTextYellow}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footerDecor} />
      </View>
    </ScrollView>
  );
};

function getStyles(colors) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 28,
      padding: 32,
      alignItems: "center",
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
    aboutBtn: {
      alignSelf: "flex-end",
      marginBottom: 10,
      backgroundColor: colors.yellow,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    aboutBtnText: {
      color: colors.sectionTitle,
      fontWeight: "bold",
      fontSize: 15,
    },
    avatarWrapper: {
      marginBottom: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: colors.accent,
      zIndex: 2,
    },
    avatarRing: {
      position: "absolute",
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 4,
      borderColor: colors.yellow,
      top: -10,
      left: -10,
      zIndex: 1,
      opacity: 0.5,
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
      textShadowColor: colors.yellow,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    info: {
      fontSize: 16,
      color: "#555",
      marginBottom: 2,
    },
    highlight: {
      color: "#a18cd1",
      fontWeight: "bold",
    },
    infoRowContainer: {
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: colors.infoRowBg,
      borderRadius: 18,
      padding: 12,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      paddingVertical: 4,
    },
    infoIconCirclePurple: {
      width: 60,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 1,
    },
    infoIconCircleYellow: {
      width: 60,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.yellow,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      shadowColor: colors.yellow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 1,
    },
    infoIconText: {
      color: colors.skillText,
      fontWeight: "bold",
      fontSize: 13,
    },
    infoLabel: {
      fontSize: 15,
      color: "#6c3483",
      fontWeight: "bold",
      marginRight: 8,
      minWidth: 70,
    },
    infoValue: {
      fontSize: 15,
      color: colors.subtext,
      flexShrink: 1,
      fontWeight: "600",
    },
    section: {
      marginTop: 20,
      width: "100%",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.sectionTitle,
      marginBottom: 8,
      letterSpacing: 1,
    },
    sectionTitleYellow: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.sectionTitleYellow,
      marginBottom: 8,
      letterSpacing: 1,
    },
    skillList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillBadgePurple: {
      backgroundColor: colors.accent,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 7,
      marginRight: 8,
      marginBottom: 8,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    skillBadgeYellow: {
      backgroundColor: colors.yellow,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 7,
      marginRight: 8,
      marginBottom: 8,
      shadowColor: colors.yellow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    skillText: {
      color: colors.skillText,
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.5,
    },
    skillTextYellow: {
      color: colors.skillTextYellow,
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.5,
    },
    footerDecor: {
      position: "absolute",
      bottom: -30,
      left: 0,
      right: 0,
      height: 40,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      backgroundColor: colors.yellow,
      opacity: 0.15,
      zIndex: 0,
    },
  });
}

export default Profile;
