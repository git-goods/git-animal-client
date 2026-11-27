const path = require('path');

const presetExpoDir = path.dirname(
  require.resolve('babel-preset-expo/package.json', {
    paths: [path.dirname(require.resolve('expo/package.json'))],
  }),
);
const transformTypescript = require.resolve('@babel/plugin-transform-typescript', {
  paths: [presetExpoDir],
});

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    overrides: [
      {
        // 워크스페이스 패키지(packages/*)의 `declare` 필드 문법을 Metro 가 변환하도록 한다
        test: (fileName) =>
          !!fileName && fileName.includes(`${path.sep}packages${path.sep}`) && /\.tsx?$/.test(fileName),
        plugins: [[transformTypescript, { allowDeclareFields: true, allowNamespaces: true }]],
      },
    ],
  };
};
