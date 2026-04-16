const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for Windows "node:sea" folder error
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
