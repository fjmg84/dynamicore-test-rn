import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import RefreshLocation from "./components/RefreshLocation";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const getLocation = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permisos de ubicación denegados");
        setLoading(false);
        Alert.alert(
          "Permisos requeridos",
          "Esta aplicación necesita acceso a la ubicación para mostrar tu posición en el mapa.",
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
      setErrorMsg("Error al obtener la ubicación");
      Alert.alert("Error", "No se pudo obtener la ubicación actual");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, [refreshTrigger]);

  if (!location && !loading && errorMsg) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No hay ubicación disponible</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setErrorMsg(null);
            setTimeout(() => {
              setLocation(null);
            }, 100);
          }}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Ubicación</Text>

      <View style={styles.webContainer}>
        <Text style={styles.webMapTitle}>🗺️ Vista de Mapa</Text>
        <Text style={styles.webMapSubtitle}>
          Los mapas nativos no están disponibles en web.
        </Text>

        {location && (
          <View style={styles.webLocationContainer}>
            <Text style={styles.webLocationTitle}>📍 Tu ubicación:</Text>
            <Text style={styles.coordinateText}>
              Latitud: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordinateText}>
              Longitud: {location.longitude.toFixed(6)}
            </Text>

            <TouchableOpacity
              style={styles.webMapButton}
              onPress={() => {
                const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
                Linking.openURL(url);
              }}
            >
              <Text style={styles.webMapButtonText}>🌍 Ver en Google Maps</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {location && (
        <RefreshLocation
          onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: "#1F2937",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  coordinateText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },

  // Estilos específicos para web
  webContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  webMapTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  webMapSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  webLocationContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
    maxWidth: 400,
  },
  webLocationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  webMapButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  webMapButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MapScreen;
