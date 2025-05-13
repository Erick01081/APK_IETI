import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image, TextInput, Alert, Modal, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const applications = [
  {
    id: '1',
    jobTitle: 'Ayudante de Mudanza',
    date: '2024-02-15',
    status: 'Pending',
  },
  {
    id: '2',
    jobTitle: 'Mantenimiento de Jardín',
    date: '2024-02-10',
    status: 'Accepted',
  },
  {
    id: '3',
    jobTitle: 'Montaje de Evento',
    date: '2024-02-05',
    status: 'Completed',
  },
];

// Interfaz para las ciudades
interface City {
  id: string;
  name: string;
  department: string;
}

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#fff',
    text: isDark ? '#fff' : '#333',
    secondaryText: isDark ? '#aaa' : '#666',
    cardBackground: isDark ? '#1e1e1e' : '#f8f9fa',
    primary: '#007AFF',
    border: isDark ? '#333' : '#ddd',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+57 300 123 4567',
    location: 'Bogotá, Cundinamarca',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    bio: 'Soy un profesional con experiencia en trabajos manuales y servicios al cliente. Me especializo en mudanzas, mantenimiento de jardines y montaje de eventos. Me caracterizo por ser puntual, responsable y comprometido con cada trabajo que realizo.',
    skills: ['Mudanzas', 'Jardinería', 'Montaje de Eventos']
  });

  const [tempData, setTempData] = useState(profileData);
  const [citiesModalVisible, setCitiesModalVisible] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para cargar ciudades de Colombia
  useEffect(() => {
    // Simulación de carga de ciudades desde una API
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        // En producción, aquí harías la llamada a la API real
        // const response = await fetch('https://api.ejemplo.com/ciudades-colombia');
        // const data = await response.json();

        // Por ahora, simularemos con datos estáticos
        const colombianCities: City[] = [
          { id: '1', name: 'Bogotá', department: 'Cundinamarca' },
          { id: '2', name: 'Medellín', department: 'Antioquia' },
          { id: '3', name: 'Cali', department: 'Valle del Cauca' },
          { id: '4', name: 'Barranquilla', department: 'Atlántico' },
          { id: '5', name: 'Cartagena', department: 'Bolívar' },
          { id: '6', name: 'Santa Marta', department: 'Magdalena' },
          { id: '7', name: 'Bucaramanga', department: 'Santander' },
          { id: '8', name: 'Pereira', department: 'Risaralda' },
          { id: '9', name: 'Manizales', department: 'Caldas' },
          { id: '10', name: 'Villavicencio', department: 'Meta' },
          { id: '11', name: 'Pasto', department: 'Nariño' },
          { id: '12', name: 'Neiva', department: 'Huila' },
          { id: '13', name: 'Armenia', department: 'Quindío' },
          { id: '14', name: 'Popayán', department: 'Cauca' },
          { id: '15', name: 'Ibagué', department: 'Tolima' },
          { id: '16', name: 'Tunja', department: 'Boyacá' },
          { id: '17', name: 'Valledupar', department: 'Cesar' },
          { id: '18', name: 'Montería', department: 'Córdoba' },
          { id: '19', name: 'Sincelejo', department: 'Sucre' },
          { id: '20', name: 'Riohacha', department: 'La Guajira' },
        ];

        setCities(colombianCities);
        setFilteredCities(colombianCities);
      } catch (error) {
        console.error('Error al cargar ciudades:', error);
        Alert.alert('Error', 'No se pudieron cargar las ciudades de Colombia');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Filtrar ciudades basado en la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCities(cities);
    } else {
      const filtered = cities.filter(
        city =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchQuery, cities]);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleSelectCity = (city: City) => {
    setTempData({ ...tempData, location: `${city.name}, ${city.department}` });
    setCitiesModalVisible(false);
  };

  const handleAvatarChange = async () => {
    if (!isEditing) return;

    // Solicitar permiso para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería de imágenes.');
      return;
    }

    // Configuración del selector de imágenes
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        // Actualizar la imagen de perfil en los datos temporales
        setTempData({
          ...tempData,
          avatar: result.assets[0].uri
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
      console.error('Error al seleccionar imagen:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 16,
      paddingTop: 60,
      borderBottomWidth: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    content: {
      padding: 16,
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: 24,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    profileLocation: {
      fontSize: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    infoCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    infoLabel: {
      fontSize: 16,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '500',
    },
    bioText: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 20,
    },
    skillsContainer: {
      marginTop: 10,
    },
    skillsTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
    },
    skillsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    skillTag: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    skillText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    applicationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    applicationTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    applicationStatus: {
      fontSize: 14,
      fontWeight: '500',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    settingLabel: {
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalContent: {
      flex: 1,
      marginTop: 100,
      marginBottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchContainer: {
      padding: 16,
      borderBottomWidth: 1,
    },
    searchInput: {
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    cityItem: {
      padding: 16,
      borderBottomWidth: 1,
    },
    cityName: {
      fontSize: 16,
      fontWeight: '500',
    },
    cityDepartment: {
      fontSize: 14,
      marginTop: 4,
    },
    editAvatarOverlay: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editButton: {
      marginTop: 8,
      padding: 8,
    },
    editButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    statusContainer: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending':
        return {
          backgroundColor: isDark ? '#423500' : '#fff3cd',
          color: isDark ? '#ffd700' : '#856404',
        };
      case 'Accepted':
        return {
          backgroundColor: isDark ? '#1e4620' : '#d4edda',
          color: isDark ? '#4caf50' : '#155724',
        };
      case 'Completed':
        return {
          backgroundColor: isDark ? '#1a365d' : '#cce5ff',
          color: isDark ? '#63b3ed' : '#004085',
        };
      default:
        return {
          backgroundColor: colors.cardBackground,
          color: colors.text,
        };
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Perfil</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleAvatarChange}>
              <Image
                source={{ uri: isEditing ? tempData.avatar : profileData.avatar }}
                style={styles.profileImage}
              />
              {isEditing && (
                <View style={styles.editAvatarOverlay}>
                  <Ionicons name="camera" size={24} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
            {isEditing ? (
              <TextInput
                style={[styles.profileName, { color: colors.text }]}
                value={tempData.name}
                onChangeText={(text) => setTempData({ ...tempData, name: text })}
              />
            ) : (
              <Text style={[styles.profileName, { color: colors.text }]}>{profileData.name}</Text>
            )}
            <TouchableOpacity 
              onPress={() => isEditing ? handleSave() : setIsEditing(true)}
              style={styles.editButton}
            >
              <Text style={[styles.editButtonText, { color: colors.primary }]}>
                {isEditing ? 'Guardar' : 'Editar Perfil'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Información Personal</Text>
            <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
              <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Nombre</Text>
                {isEditing ? (
                  <TextInput
                    style={[styles.infoValue, { color: colors.text }]}
                    value={tempData.name}
                    onChangeText={(text) => setTempData({ ...tempData, name: text })}
                  />
                ) : (
                  <Text style={[styles.infoValue, { color: colors.text }]}>{profileData.name}</Text>
                )}
              </View>
              <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Correo</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{profileData.email}</Text>
              </View>
              <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Teléfono</Text>
                {isEditing ? (
                  <TextInput
                    style={[styles.infoValue, { color: colors.text }]}
                    value={tempData.phone}
                    onChangeText={(text) => setTempData({ ...tempData, phone: text })}
                  />
                ) : (
                  <Text style={[styles.infoValue, { color: colors.text }]}>{profileData.phone}</Text>
                )}
              </View>
              <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>Ubicación</Text>
                {isEditing ? (
                  <TouchableOpacity onPress={() => setCitiesModalVisible(true)}>
                    <Text style={[styles.infoValue, { color: colors.primary }]}>{tempData.location}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[styles.infoValue, { color: colors.text }]}>{profileData.location}</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sobre Mí</Text>
            <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
              {isEditing ? (
                <TextInput
                  style={[styles.bioText, { color: colors.text }]}
                  value={tempData.bio}
                  onChangeText={(text) => setTempData({ ...tempData, bio: text })}
                  multiline
                  numberOfLines={4}
                />
              ) : (
                <Text style={[styles.bioText, { color: colors.text }]}>{profileData.bio}</Text>
              )}
              <View style={styles.skillsContainer}>
                <Text style={[styles.skillsTitle, { color: colors.text }]}>Habilidades:</Text>
                <View style={styles.skillsList}>
                  {profileData.skills.map((skill, index) => (
                    <View key={index} style={[styles.skillTag, { backgroundColor: colors.primary }]}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Historial de Aplicaciones</Text>
            {applications.map((application) => (
              <View key={application.id} style={[styles.applicationItem, { borderBottomColor: colors.border }]}>
                <Text style={[styles.applicationTitle, { color: colors.text }]}>{application.jobTitle}</Text>
                <View style={[styles.statusContainer, getStatusStyle(application.status)]}>
                  <Text style={[styles.applicationStatus, { color: getStatusStyle(application.status).color }]}>
                    {application.status === 'Pending' ? 'Pendiente' : 
                     application.status === 'Accepted' ? 'Aceptado' : 'Completado'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuración</Text>
            <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Modo Oscuro</Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDark ? '#007AFF' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal para seleccionar ciudades */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={citiesModalVisible}
        onRequestClose={() => setCitiesModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Seleccionar Ciudad</Text>
              <TouchableOpacity onPress={() => setCitiesModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.searchContainer, { borderBottomColor: colors.border }]}>
              <TextInput
                style={[styles.searchInput, { 
                  backgroundColor: colors.cardBackground,
                  color: colors.text,
                }]}
                placeholder="Buscar ciudad o departamento..."
                placeholderTextColor={colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={{ color: colors.text }}>Cargando ciudades...</Text>
              </View>
            ) : (
              <FlatList
                data={filteredCities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.cityItem, { borderBottomColor: colors.border }]}
                    onPress={() => handleSelectCity(item)}
                  >
                    <Text style={[styles.cityName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.cityDepartment, { color: colors.secondaryText }]}>{item.department}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: colors.text }}>
                      No se encontraron ciudades con ese nombre
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}