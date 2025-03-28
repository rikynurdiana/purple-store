const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {},
} = defaultConfig;

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true,
      },
      output: {
        ascii_only: true,
        quote_style: 3,
        wrap_iife: true,
      },
      sourceMap: {
        includeSources: false,
      },
      toplevel: false,
      compress: {
        reduce_funcs: false,
      },
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
