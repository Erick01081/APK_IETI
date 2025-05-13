import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../../context/theme';

export default function SuccessScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#fff',
    text: isDark ? '#fff' : '#333',
    secondaryText: isDark ? '#aaa' : '#666',
    primary: '#007AFF',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>¡Bien hecho!</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          Tu aplicación ha sido enviada exitosamente
        </Text>
        
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop' }}
          style={styles.image}
        />

        <Text style={[styles.message, { color: colors.secondaryText }]}>
          El empleador revisará tu perfil y se pondrá en contacto contigo pronto.
        </Text>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Volver a la pantalla principal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 