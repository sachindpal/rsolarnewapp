module.exports = {
  preset: 'react-native',
 setupFiles: ["<rootDir>/jest/setup.js"],
 transform: {
  "^.+\\.(js|ts)$": "babel-jest",
  '^.+\\.svg$': './svgTransform.js'
},
transformIgnorePatterns: [
  "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-svg|react-native-svg-transformer)"
],
moduleNameMapper: {
  "\\.svg": "<rootDir>/__mocks__/svgMock.js"
}
};
