const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@brand-primary': '#1DA57A',
        '@brand-primary-tap': '#1DA57A',
      },
    },
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
);