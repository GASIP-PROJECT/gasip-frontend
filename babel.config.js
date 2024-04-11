module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          src: './src',
          // '@common': './src/common',
          '@screens': './src/screens',
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@styles': './src/styles',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@api': './src/api',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
  ],
};
