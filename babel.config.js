module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          src: './src',
          // '@constants': './src/constants',
          // '@utils': './src/utils',
          // '@common': './src/common',
          // '@api': './src/api',
          '@screens': './src/screens',
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@styles': './src/styles',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
