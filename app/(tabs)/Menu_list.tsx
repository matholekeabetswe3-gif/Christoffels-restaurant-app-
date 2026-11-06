// app/(tabs)/Menu_list.tsx
// Menu List Screen — matches wireframe Screen 3.
// Scrollable FlatList of all menu items grouped by course, with an
// empty-state message and an "Add New Item" shortcut.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useMenu, MenuItem } from '../context/MenuContext';
import Colors from '../../constants/Colors';

export default function MenuList() {
  const router = useRouter();
  const { menuItems } = useMenu();

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => router.push({ pathname: '/Item_details_Update', params: { id: item.id } })}
    >
      <View style={styles.itemRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.dishName}</Text>
          <Text style={styles.itemCourse}>{item.course}</Text>
        </View>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu Items</Text>
        <Text style={styles.totalText}>Total Items: {menuItems.length}</Text>
      </View>

      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No menu items have been added yet.</Text>
          <Text style={styles.emptySubText}>
            Tap "Add New Item" below to create your first dish.
          </Text>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/Add_menu_item')}
      >
        <Text style={styles.addButtonText}>+ Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  totalText: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  itemCard: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginTop: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  itemCourse: {
    fontSize: 12,
    color: Colors.accentDark,
    fontWeight: '600',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  itemDescription: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 13,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
