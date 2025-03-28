module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@icons': './src/assets/icons',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@context': './src/context',
          '@types': './src/types',
        },
      },
    ],
  ],
};
