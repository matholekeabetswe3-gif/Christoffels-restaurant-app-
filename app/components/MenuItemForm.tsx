// components/MenuItemForm.tsx
// Shared form fields (Dish Name, Description, Course, Price) reused by
// Add_menu_item.tsx and Item_details_Update.tsx so both screens look and
// behave identically.

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Course } from '../context/MenuContext';
import Colors from '../../constants/Colors';

interface Props {
  dishName: string;
  setDishName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  course: Course;
  setCourse: (v: Course) => void;
  price: string;
  setPrice: (v: string) => void;
  errors: { [key: string]: string };
}

export default function MenuItemForm({
  dishName,
  setDishName,
  description,
  setDescription,
  course,
  setCourse,
  price,
  setPrice,
  errors,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={[styles.input, errors.dishName && styles.inputError]}
        placeholder="e.g. Avocado Toast"
        placeholderTextColor={Colors.textLight}
        value={dishName}
        onChangeText={setDishName}
      />
      {errors.dishName ? <Text style={styles.errorText}>{errors.dishName}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea, errors.description && styles.inputError]}
        placeholder="Enter description..."
        placeholderTextColor={Colors.textLight}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      {errors.description ? (
        <Text style={styles.errorText}>{errors.description}</Text>
      ) : null}

      <Text style={styles.label}>Course</Text>
      <View style={[styles.pickerWrapper, errors.course && styles.inputError]}>
        <Picker
          selectedValue={course}
          onValueChange={(value) => setCourse(value as Course)}
          style={styles.picker}
        >
          <Picker.Item label="Select a course..." value="" />
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>
      </View>
      {errors.course ? <Text style={styles.errorText}>{errors.course}</Text> : null}

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={[styles.input, errors.price && styles.inputError]}
        placeholder="0.00"
        placeholderTextColor={Colors.textLight}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
