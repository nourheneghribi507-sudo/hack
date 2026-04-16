import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Needs installation if using real Expo

export const Theme = {
  bg: '#020617',
  card: 'rgba(15, 23, 42, 0.4)',
  cyan: '#00f5d4',
  magenta: '#d946ef',
  blue: '#3b82f6',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  border: 'rgba(255, 255, 255, 0.08)',
};

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

export const CyberButton = ({ title, onPress, style, loading }) => (
  <TouchableOpacity 
    style={[styles.button, style, loading && { opacity: 0.7 }]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.buttonText}>{loading ? 'PROCESSING...' : title}</Text>
  </TouchableOpacity>
);

export const CyberCard = ({ children, style, accent }) => (
  <View style={[
    styles.card, 
    style, 
    accent && { borderLeftWidth: 3, borderLeftColor: accent }
  ]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.cyan,
    paddingVertical: isSmallDevice ? 12 : 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: Theme.bg,
    fontWeight: '800',
    fontSize: isSmallDevice ? 12 : 14,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 20,
    padding: isSmallDevice ? 16 : 20,
    borderWidth: 1,
    borderColor: Theme.border,
    marginBottom: 12,
  }
});
