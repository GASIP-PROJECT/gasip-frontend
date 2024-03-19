module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          src: './src',
          // '@assets': './src/assets',
          // '@components': './src/components',
          // '@constants': './src/constants',
          // '@utils': './src/utils',
          // '@common': './src/common',
          // '@api': './src/api',
          '@screens': './src/screens',
          '@navigators': './src/navigators',
        },
      },
    ],
  ],
};
