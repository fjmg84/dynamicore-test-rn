import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductListScreen = () => {
  const [items, setItems] = useState([]);
  const [newProducto, setNewProducto] = useState("");
  const [newCantidad, setNewCantidad] = useState("");

  const canAdd = useMemo(
    () => newProducto.trim().length > 0 && newCantidad.trim().length > 0,
    [newProducto, newCantidad],
  );

  const handleAdd = () => {
    const trimmedProducto = newProducto.trim();
    const trimmedCantidad = newCantidad.trim();
    if (!trimmedProducto || !trimmedCantidad) {
      return;
    }

    setItems((prev) => [
      { producto: trimmedProducto, cantidad: trimmedCantidad },
      ...prev,
    ]);
    setNewProducto("");
    setNewCantidad("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un producto"
          value={newProducto}
          returnKeyType="done"
          onChangeText={setNewProducto}
          onSubmitEditing={handleAdd}
        />
        <TextInput
          style={styles.input}
          placeholder="Escribe cantidad"
          value={newCantidad}
          keyboardType="numeric"
          inputMode="numeric"
          returnKeyType="done"
          onChangeText={setNewCantidad}
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity
          style={[styles.button, !canAdd && styles.buttonDisabled]}
          onPress={handleAdd}
          disabled={!canAdd}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.producto}</Text>
            <Text style={styles.itemText}>{item.cantidad}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay productos todavía.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1F2937",
  },
  form: {
    gap: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    height: 48,
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  list: {
    paddingBottom: 24,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#144bc2",
  },
  empty: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
  },
});

export default ProductListScreen;
