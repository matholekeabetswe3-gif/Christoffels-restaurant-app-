// app/(tabs)/Add_menu_item.tsx
// Add Menu Item Screen — matches wireframe Screen 2.
// Includes required-field validation, numeric price check, and a success
// confirmation message before returning the chef to the Menu List.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useMenu, Course } from '../context/MenuContext';
import MenuItemForm from '../components/MenuItemForm';
import Colors from '../../constants/Colors';

export default function AddMenuItem() {
  const router = useRouter();
  const { addMenuItem } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [confirmation, setConfirmation] = useState('');

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

  const handleSave = () => {
    if (!validate()) {
      setConfirmation('');
      return;
    }

    addMenuItem({
      dishName: dishName.trim(),
      description: description.trim(),
      course: course as Course,
      price: Number(price),
    });

    setConfirmation(`"${dishName.trim()}" was added to the menu!`);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});

    setTimeout(() => {
      router.push('/Menu_list');
    }, 900);
  };

  const handleCancel = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});
    setConfirmation('');
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Add Menu Item</Text>

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

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    color: Colors.textLight,
    fontSize: 15,
    fontWeight: '500',
  },
});
