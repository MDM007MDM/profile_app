import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../auth/AuthContext';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    try {
      await login({ email, password });
      Alert.alert('เข้าสู่ระบบสำเร็จ');
      router.replace('/');
    } catch (e) {
      Alert.alert('ล้มเหลว', e.message || String(e));
    } finally { setLoading(false); }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.sectionTitle, fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Sign In</Text>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={[styles.input, { color: colors.text }]} placeholderTextColor='#999' />
      <TextInput placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} style={[styles.input, { color: colors.text }]} placeholderTextColor='#999' />
      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.accent }]} onPress={handle} disabled={loading}>
        <Text style={{ color: colors.skillText, fontWeight: '700' }}>{loading ? 'กำลัง...': 'Sign In'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex:1, alignItems:'center', justifyContent:'center', padding:16 }, input: { width: '100%', maxWidth: 360, borderWidth:1, borderColor:'rgba(0,0,0,0.06)', borderRadius:8, padding:10, marginBottom:8 }, btn: { padding:12, borderRadius:8, width:'100%', maxWidth:360, alignItems:'center' } });
