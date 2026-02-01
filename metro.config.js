const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolver problemas de importación en web
config.resolver.platforms = ['native', 'web', 'android', 'ios'];

// Configuración para web
config.resolver.alias = {
  ...config.resolver.alias,
  // Solo para asegurar que no haya conflictos en web
  'react-native-maps': false
};

module.exports = config;