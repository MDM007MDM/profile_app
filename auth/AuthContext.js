import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const API_BASE = 'http://localhost:3000';
const TOKEN_KEY = 'classroom_api_token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const t = await SecureStore.getItemAsync(TOKEN_KEY);
        if (t) {
          setToken(t);
          await fetchProfile(t);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function saveToken(t) {
    setToken(t);
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, t);
    } catch (e) {}
  }

  async function clearToken() {
    setToken(null);
    setUser(null);
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (e) {}
  }

  async function register({ name, email, password }) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error(`Register failed ${res.status}`);
    const data = await res.json();
    const t = data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken;
    if (t) await saveToken(t);
    if (data?.user) setUser(data.user);
    return data;
  }

  async function login({ email, password }) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || `Login failed ${res.status}`);
    }
    const data = await res.json();
    const t = data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken;
    if (t) await saveToken(t);
    if (data?.user) setUser(data.user);
    return data;
  }

  async function fetchProfile(t = token) {
    if (!t) return null;
    const res = await fetch(`${API_BASE}/api/auth/profile`, { headers: { Authorization: `Bearer ${t}` } });
    if (!res.ok) return null;
    const data = await res.json();
    const u = data?.data || data?.user || data;
    setUser(u);
    return u;
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, register, login, logout: clearToken, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
