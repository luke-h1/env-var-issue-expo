import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCurrentApiBaseUrl, updateApiBaseUrl } from "../services/api";
import { cakeService } from "../services/cakeService";
import { storageService } from "../services/storage";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [cakeData, setCakeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [useStagingUrl, setUseStagingUrl] = useState(() =>
    storageService.getUseStagingUrl()
  );

  const [currentApiUrl, setCurrentApiUrl] = useState(() =>
    getCurrentApiBaseUrl()
  );

  const handleFetchCakes = async () => {
    setLoading(true);
    setError(null);
    setCakeData(null);

    try {
      const response = await cakeService.listcakes();
      setCakeData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cakes");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApi = (value: boolean) => {
    setUseStagingUrl(value);
    storageService.setUseStagingUrl(value);
    updateApiBaseUrl();
    setCurrentApiUrl(getCurrentApiBaseUrl());
    setCakeData(null);
    setError(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cake API Demo</Text>

        <View style={styles.spacerMd} />

        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Use staging API</Text>
            <Switch
              value={useStagingUrl}
              onValueChange={handleToggleApi}
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor={useStagingUrl ? "#fff" : "#f4f3f4"}
            />
          </View>
          <View style={styles.spacerSm} />
          <Text style={styles.apiUrlText}>Current API: {currentApiUrl}</Text>
        </View>

        <View style={styles.spacerLg} />

        <TouchableOpacity
          onPress={handleFetchCakes}
          disabled={loading}
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Fetch Cakes"}
          </Text>
        </TouchableOpacity>

        <View style={styles.spacerLg} />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}

        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}

        {cakeData && (
          <View style={styles.card}>
            <Text style={styles.dataTitle}>Response:</Text>
            <View style={styles.spacerSm} />
            <ScrollView style={styles.dataScroll}>
              <Text style={styles.dataText}>
                {JSON.stringify(cakeData, null, 2)}
              </Text>
            </ScrollView>
          </View>
        )}

        <View style={styles.spacerXl} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  spacerSm: {
    height: 8,
  },
  spacerMd: {
    height: 16,
  },
  spacerLg: {
    height: 24,
  },
  spacerXl: {
    height: 40,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  apiUrlText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorCard: {
    backgroundColor: "#ffebee",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    color: "#c62828",
    fontWeight: "600",
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dataScroll: {
    maxHeight: 300,
  },
  dataText: {
    fontSize: 12,
    fontFamily: "monospace",
  },
});
