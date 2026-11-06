// app/(tabs)/index.tsx
// Home Screen — matches wireframe Screen 1: "Flavours by Chef Chris"

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useMenu } from '../context/MenuContext';
import Colors from '../../constants/Colors';

export default function Home() {
  const router = useRouter();
  const { menuItems } = useMenu();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Flavours by Chef Chris</Text>
        <Text style={styles.subtitle}>Welcome, Chef Chris</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Menu Items</Text>
          <Text style={styles.cardValue}>{menuItems.length}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push('/Menu_list')}
        >
          <Text style={styles.buttonText}>View Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.accentButton]}
          onPress={() => router.push('/Add_menu_item')}
        >
          <Text style={styles.buttonTextDark}>+ Add Menu Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 32,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  accentButton: {
    backgroundColor: Colors.accent,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDark: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
