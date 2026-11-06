// app/Item_details_Update.tsx
// Item Detail / Update Screen — matches wireframe Screen 4.
// Loads the tapped item from Menu List, lets the chef edit and Update it,
// or Delete it (with a confirmation prompt), then returns to the Menu List.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMenu, Course } from './context/MenuContext';
import MenuItemForm from './components/MenuItemForm';
import Colors from '../constants/Colors';

export default function ItemDetailsUpdate() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  const existingItem = getMenuItem(id);

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    if (existingItem) {
      setDishName(existingItem.dishName);
      setDescription(existingItem.description);
      setCourse(existingItem.course);
      setPrice(existingItem.price.toString());
    }
  }, [existingItem]);

  if (!existingItem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.notFoundText}>This menu item could not be found.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Menu_list')}>
            <Text style={styles.backButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!dishName.trim()) newErrors.dishName = 'Dish name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!course) newErrors.course = 'Please select a course.';
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Enter a valid price greater than 0.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;

    updateMenuItem({
      id: existingItem.id,
      dishName: dishName.trim(),
      description: description.trim(),
      course: course as Course,
      price: Number(price),
    });

    setConfirmation('Item updated successfully!');
    setTimeout(() => {
      router.push('/Menu_list');
    }, 900);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${existingItem.dishName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMenuItem(existingItem.id);
            router.push('/Menu_list');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{existingItem.dishName}</Text>

          {confirmation ? (
            <View style={styles.confirmationBox}>
              <Text style={styles.confirmationText}>{confirmation}</Text>
            </View>
          ) : null}

          <MenuItemForm
            dishName={dishName}
            setDishName={setDishName}
            description={description}
            setDescription={setDescription}
            course={course as Course}
            setCourse={setCourse}
            price={price}
            setPrice={setPrice}
            errors={errors}
          />

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update Item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Menu_list')}>
            <Text style={styles.backButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  confirmationBox: {
    backgroundColor: '#E7F1E7',
    borderColor: Colors.success,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  confirmationText: {
    color: Colors.success,
    fontWeight: '600',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  updateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: Colors.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backButtonText: {
    color: Colors.textLight,
    fontSize: 15,
    fontWeight: '500',
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
});
