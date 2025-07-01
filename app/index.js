import { Text, View, Image, StyleSheet, ScrollView } from "react-native";

const profile = {
  name: "นางสาว ชฎาพร พินิจสัย",
  studentId: "653450281-9",
  major: "วิทยาการคอมพิวเตอร์และสารสนเทศ",
  program: "วิทยาการคอมพิวเตอร์และสารสนเทศ",
  university: "ขอนแก่น วิทยาเขตหนองคาย",
  codingSkills: ["HTML", "CSS", "JavaScript", "Python"],
  languages: ["ไทย", "อังกฤษ", "เกาหลี"],
};

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../assets/image/Screenshot 2025-07-01 130315.png")}
            style={styles.avatar}
          />
          <View style={styles.avatarRing} />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        {/* ข้อมูลโปรไฟล์แบบมีลูกเล่น */}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "linear-gradient(180deg, #a18cd1 0%, #fbc2eb 100%)", // fallback for web, not supported in RN
    backgroundColor: "#f3e7ff", // fallback for RN
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 32,
    alignItems: "center",
    shadowColor: "#a18cd1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    width: 350,
    position: "relative",
    marginBottom: 40,
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
    borderColor: "#a18cd1",
    zIndex: 2,
  },
  avatarRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#fbc531",
    top: -10,
    left: -10,
    zIndex: 1,
    opacity: 0.5,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6c3483",
    marginBottom: 8,
    textShadowColor: "#fbc531",
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
    backgroundColor: "#f8f6ff",
    borderRadius: 18,
    padding: 12,
    shadowColor: "#a18cd1",
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
    backgroundColor: "#a18cd1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#a18cd1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  infoIconCircleYellow: {
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fbc531",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#fbc531",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  infoIconText: {
    color: "#fff",
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
    color: "#555",
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
    color: "#6c3483",
    marginBottom: 8,
    letterSpacing: 1,
  },
  sectionTitleYellow: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fbc531",
    marginBottom: 8,
    letterSpacing: 1,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadgePurple: {
    backgroundColor: "#a18cd1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#a18cd1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  skillBadgeYellow: {
    backgroundColor: "#fbc531",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#fbc531",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  skillText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  skillTextYellow: {
    color: "#6c3483",
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
    backgroundColor: "#fbc531",
    opacity: 0.15,
    zIndex: 0,
  },
});

export default Home;