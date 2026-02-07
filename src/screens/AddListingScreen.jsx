import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import LogoHeader from '../components/common/LogoHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const ORANGE = '#F08E14';
const BORDER = '#E5E7EB';
const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';

export default function AddListingScreen() {
  const navigation = useNavigation();
  const [servicesInput, setServicesInput] = useState('');
  const [services, setServices] = useState(['Catering', 'Catering']);

  const addService = () => {
    if (!servicesInput.trim()) return;
    setServices((prev) => [...prev, servicesInput.trim()]);
    setServicesInput('');
  };

  const removeService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    navigation.navigate('Gallery');
  };

  return (
    <View style={styles.screen}>
      <LogoHeader />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
        <View style={styles.titleRow}>
          <AntDesign name="plus" size={18} color={TEXT_DARK} />
          <Text style={styles.titleText}>Add Business Listing</Text>
        </View>

        <View style={styles.form}>
          <LabeledInput label="Business Name" placeholder="Enter business name" />
          <LabeledInput
            label="Category"
            placeholder="Select category"
            rightIcon={<MaterialIcons name="keyboard-arrow-down" size={20} color={TEXT_LIGHT} />}
          />
          <LabeledInput label="Sub Category" placeholder="Enter phone number" />
          <LabeledInput label="Phone / WhatsApp Number" placeholder="Enter WhatsApp number" />
          <LabeledInput label="Address" placeholder="Enter full address" />
          <LabeledInput
            label="About Business"
            placeholder="Write short description about your business"
            multiline
            numberOfLines={4}
            style={{ height: 120, textAlignVertical: 'top' }}
          />

          <View style={styles.section}>
            <Text style={styles.label}>Services Offered</Text>
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  placeholder="e.g. Room booking etc"
                  placeholderTextColor={TEXT_LIGHT}
                  style={styles.textInput}
                  value={servicesInput}
                  onChangeText={setServicesInput}
                />
              </View>
              <TouchableOpacity onPress={addService} style={styles.addButton} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>Add</Text>
                <MaterialIcons name="add" size={18} fontWeight="bold" color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.chips}>
              {services.map((service, index) => (
                <View key={`${service}-${index}`} style={styles.chip}>
                  <Text style={styles.chipText}>{service}</Text>
                  <TouchableOpacity onPress={() => removeService(index)} style={styles.chipClose}>
                    <Text style={styles.chipCloseText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

        <TouchableOpacity style={styles.submitButton} activeOpacity={0.85} onPress={handleNext}>
            <Text style={styles.submitButtonText}>NEXT</Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function LabeledInput({ label, placeholder, rightIcon, style, multiline, numberOfLines }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={TEXT_LIGHT}
          style={[styles.textInput, style]}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  form: {
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
  },
  rightIcon: {
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: ORANGE,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 4,
    fontSize: 13,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 6,
  },
  chipClose: {
    paddingHorizontal: 4,
  },
  chipCloseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
