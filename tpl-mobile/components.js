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
    accent && { borderLeftWidth: 4, borderLeftColor: accent }
  ]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.cyan,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: Theme.bg,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Theme.border,
    marginBottom: 16,
  }
});
