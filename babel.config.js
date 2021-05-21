module.exports = (api) => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/env',
        {
          targets: { node: 'current' },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@loadable/babel-plugin',
    ],
  };
};
