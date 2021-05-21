module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: { esmodules: true },
        useBuiltIns: 'usage',
        corejs: '3.6.5',
      },
    ],
    '@babel/preset-react',
  ],
};
