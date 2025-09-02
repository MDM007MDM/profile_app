import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { useAuth } from "../../auth/AuthContext";
import { useRouter } from "expo-router";

const API_BASE = "http://localhost:3000"; // ถ้าใช้บนอุปกรณ์จริง ให้เปลี่ยนเป็น IP ของเครื่อง

export default function BooksList() {
  const { theme, toggleTheme, colors } = useTheme();
  const router = useRouter();
  const styles = getStyles(colors);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // form for creating new book
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/books`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // support different response shapes (BooksResponse vs array)
      setBooks(Array.isArray(data) ? data : data?.data || data?.books || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
  if (!title.trim()) return setError("กรุณาระบุชื่อหนังสือ");
  if (!token) return setError("ต้องเข้าสู่ระบบก่อนการสร้างหนังสือ");
    setCreating(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/books`, {
        method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, author, genre, description }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || `HTTP ${res.status}`);
      }
      await loadBooks();
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
    } catch (e) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  }

  function renderItem({ item }) {
    const id = item.id || item._id || item._uid || item.bookId;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.card }]}
        onPress={() => router.push(`/books/${id}`)}
      >
        <Text style={[styles.bookTitle, { color: colors.sectionTitle }]}>{item.title || item.name}</Text>
        <Text style={[styles.bookMeta, { color: colors.subtext }]}>{item.author || "-"}</Text>
        <Text style={[styles.bookGenre, { color: colors.skillTextYellow }]}>{item.genre || "-"}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: colors.sectionTitle }]}>จัดการหนังสือ</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme}>
            <Text style={styles.iconBtnText}>{theme === "light" ? "🌙" : "☀️"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { marginLeft: 8 }]} onPress={loadBooks}>
            <Text style={styles.iconBtnText}>⟳</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.sectionTitle }]}>สร้างหนังสือใหม่</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput placeholder="ชื่อหนังสือ" placeholderTextColor="#999" style={[styles.input, { color: colors.text }]} value={title} onChangeText={setTitle} />
        <TextInput placeholder="ผู้แต่ง" placeholderTextColor="#999" style={[styles.input, { color: colors.text }]} value={author} onChangeText={setAuthor} />
        <TextInput placeholder="หมวดหมู่" placeholderTextColor="#999" style={[styles.input, { color: colors.text }]} value={genre} onChangeText={setGenre} />
        <TextInput placeholder="คำอธิบาย" placeholderTextColor="#999" style={[styles.inputMulti, { color: colors.text }]} value={description} onChangeText={setDescription} multiline />
        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.accent }]} onPress={handleCreate} disabled={creating}>
          <Text style={[styles.primaryBtnText, { color: colors.skillText }]}>{creating ? "กำลังสร้าง..." : "สร้างหนังสือ"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", marginTop: 12 }}>
        <Text style={[styles.sectionTitle, { color: colors.sectionTitle, marginLeft: 8 }]}>รายการหนังสือ</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 20 }} />
        ) : (
          <FlatList data={books} keyExtractor={(i, idx) => (i.id || i._id || idx).toString()} renderItem={renderItem} contentContainerStyle={{ padding: 8 }} />
        )}
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
    headerButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
    },
    iconBtn: {
      backgroundColor: "rgba(0,0,0,0.06)",
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    iconBtnText: { fontSize: 16 },
    sectionCard: {
      width: 350,
      borderRadius: 18,
      padding: 14,
      marginBottom: 16,
    },
    sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
    input: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.06)",
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 8,
      backgroundColor: "transparent",
    },
    inputMulti: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.06)",
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      minHeight: 80,
      textAlignVertical: "top",
      marginBottom: 8,
      backgroundColor: "transparent",
    },
    primaryBtn: {
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: "center",
      marginTop: 6,
    },
    primaryBtnText: { fontWeight: "700" },
    card: {
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },
    bookTitle: { fontSize: 16, fontWeight: "700" },
    bookMeta: { fontSize: 13, marginTop: 4 },
    bookGenre: { fontSize: 12, marginTop: 6, opacity: 0.9 },
    errorText: { color: "#c0392b", marginBottom: 8 },
  });
}
