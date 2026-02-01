# Lista de Productos con Mapa - React Native App

Una aplicación desarrollada en React Native y Expo que permite crear lista de productos y mostrar la ubicación del usuario con un sistema de navegación por pestañas.

## 📱 Características

### 🛒 Gestión de Productos

- ✅ Agregar productos con su cantidad
- ✅ Lista dinámica de productos scrolleable
- ✅ Formulario con validación
- ✅ Teclado numérico para cantidades

### 🗺️ Funcionalidades de Mapa

- ✅ Visualización de ubicación actual en tiempo real
- ✅ Botón para actualizar ubicación manualmente
- ✅ Integración con Google Maps en web
- ✅ Manejo de permisos de geolocalización
- ✅ Estados de carga y error informativos

### 🧭 Navegación

- ✅ Navegación por pestañas con iconos
- ✅ Transición fluida entre secciones
- ✅ Interfaz consistente multiplataforma
- ✅ Compatible Android y Web

## 🚀 Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil multiplataforma
- **Expo** - Plataforma para desarrollo React Native
- **React Navigation** - Sistema de navegación con pestañas
- **React Native Maps** - Integración de mapas nativos para mobile
- **Expo Location** - Servicios de geolocalización
- **React Hooks** - useState, useEffect, useMemo para manejo de estado
- **Expo Vector Icons** - Iconografía consistente

## 📋 Requisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI (opcional, se puede usar npx)
- Para funcionalidades de mapa en dispositivos físicos: GPS habilitado

## 🛠️ Instalación

1. Clona o descarga este repositorio
2. Instala las dependencias:

```bash
npm install
```

## 🎯 Ejecución

### Web

```bash
npm run web
```

La aplicación se abrirá en http://localhost:8081

### Android

```bash
npm run android
```

Requiere Android Studio o un dispositivo Android conectado.

### iOS

```bash
npm run ios
```

### Con Expo Go

1. Instala la app **Expo Go** en tu dispositivo móvil
2. Ejecuta:

```bash
npx expo start
```

3. Escanea el código QR con Expo Go (Android) o la cámara (iOS)

## 📖 Uso

### 🛒 Pestaña de Productos

1. **Agregar Producto**:
   - Escribe el nombre del producto en el primer campo
   - Ingresa la cantidad en el segundo campo (aparece teclado numérico)
   - Presiona "Agregar" o Enter

2. **Ver Lista**:
   - Los productos aparecen en una lista scrolleable
   - Cada elemento muestra el producto y su cantidad

3. **Validación**:
   - El botón "Agregar" se deshabilita si algún campo está vacío
   - Los campos se limpian automáticamente después de agregar

### 🗺️ Pestaña de Mapa

1. **Visualización de Ubicación**:
   - La app solicitará permisos de ubicación al abrir el mapa
   - Se mostrará tu ubicación actual con un marcador rojo
   - El mapa se centra automáticamente en tu posición

2. **Actualizar Ubicación**:
   - Usa el botón "Actualizar Ubicación" para refrescar tu posición

3. **Navegación del Mapa**:
   - **Mobile**: Mapa nativo interactivo con zoom y desplazamiento
   - **Web**: Enlace directo a Google Maps con tu ubicación

4. **Manejo de Errores**:
   - Si se deniegan los permisos, aparece un mensaje explicativo
   - Manejo de errores de conectividad o GPS

### 🧭 Navegación

- Usa las pestañas inferiores para cambiar entre "Productos" y "Mapa"
- Los iconos indican la sección activa
- La navegación es fluida y conserva el estado de cada pantalla

## 🏗️ Estructura del Proyecto

```
├── App.js                          # Componente principal con navegación
├── package.json                    # Dependencias y scripts
├── app.json                       # Configuración de Expo
├── assets/                        # Recursos estáticos
└── components/
    ├── ProductListScreen.js       # Pantalla de gestión de productos
    └── MapScreen/
        ├── MapScreen.native.js    # Componente de mapa para mobile
        ├── MapScreen.web.js       # Componente de mapa para web
        └── components/
            └── RefreshLocation.js # Componente de actualizar ubicación
```

## 🔧 Dependencias Principales

```json
{
  "@react-navigation/native": "Navegación entre pantallas",
  "@react-navigation/bottom-tabs": "Pestañas inferiores",
  "react-native-maps": "Mapas nativos",
  "expo-location": "Servicios de geolocalización",
  "@expo/vector-icons": "Iconos vectoriales"
}
```
