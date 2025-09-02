import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:3000";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const { colors, toggleTheme, theme } = useTheme();
  const styles = getStyles(colors);
  const router = useRouter();

  const { token } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // editable fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) loadBook();
  }, [id]);

  async function loadBook() {
    setLoading(true);
    setError(null);
    try {
  const res = await fetch(`${API_BASE}/api/books/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const b = data?.data || data || {};
      setBook(b);
      setTitle(b.title || "");
      setAuthor(b.author || "");
      setGenre(b.genre || "");
      setDescription(b.description || "");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      if (!token) throw new Error('ต้องเข้าสู่ระบบเพื่อแก้ไข');
      const res = await fetch(`${API_BASE}/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, author, genre, description }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
      Alert.alert("บันทึกเรียบร้อย");
      await loadBook();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    Alert.alert("ยืนยัน", "ต้องการลบหนังสือเล่มนี้หรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: async () => {
            try {
              if (!token) throw new Error('ต้องเข้าสู่ระบบเพื่อการลบ');
              const res = await fetch(`${API_BASE}/api/books/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              Alert.alert("ลบเรียบร้อย");
              router.back();
            } catch (e) {
              setError(e.message);
            }
        },
      },
    ]);
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={colors.accent} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: colors.sectionTitle }]}>รายละเอียดหนังสือ</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme}><Text>{theme === 'light' ? '🌙' : '☀️'}</Text></TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput style={[styles.input, { color: colors.text }]} value={title} onChangeText={setTitle} placeholder="ชื่อหนังสือ" placeholderTextColor="#999" />
        <TextInput style={[styles.input, { color: colors.text }]} value={author} onChangeText={setAuthor} placeholder="ผู้แต่ง" placeholderTextColor="#999" />
        <TextInput style={[styles.input, { color: colors.text }]} value={genre} onChangeText={setGenre} placeholder="หมวดหมู่" placeholderTextColor="#999" />
        <TextInput style={[styles.inputMulti, { color: colors.text }]} value={description} onChangeText={setDescription} placeholder="คำอธิบาย" placeholderTextColor="#999" multiline />

        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.accent }]} onPress={handleSave} disabled={saving}>
          <Text style={[styles.primaryBtnText, { color: colors.skillText }]}>{saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.dangerBtn]} onPress={handleDelete}>
          <Text style={styles.dangerBtnText}>ลบหนังสือ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      paddingVertical: 24,
    },
    headerRow: {
      width: 350,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    heading: { fontSize: 20, fontWeight: "700" },
    iconBtn: { backgroundColor: "rgba(0,0,0,0.06)", borderRadius: 12, padding: 8 },
    card: { width: 350, borderRadius: 14, padding: 12 },
    input: { borderWidth: 1, borderColor: "rgba(0,0,0,0.06)", borderRadius: 10, padding: 10, marginBottom: 8 },
    inputMulti: { borderWidth: 1, borderColor: "rgba(0,0,0,0.06)", borderRadius: 10, padding: 10, minHeight: 90, textAlignVertical: "top", marginBottom: 8 },
    primaryBtn: { borderRadius: 10, padding: 12, alignItems: "center", marginTop: 6 },
    primaryBtnText: { fontWeight: "700" },
    dangerBtn: { marginTop: 10, borderRadius: 10, padding: 12, alignItems: "center", backgroundColor: "#ff4d4f" },
    dangerBtnText: { color: "#fff", fontWeight: "700" },
    errorText: { color: "#c0392b", marginBottom: 8 },
  });
}
