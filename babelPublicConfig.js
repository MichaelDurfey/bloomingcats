module.exports = (env) => {
  const config = {
    presets: [
      [
        '@babel/env',
        {
          targets: env.modern ? { esmodules: true } : '>.25%, not dead',
          ...(env.modern && { modules: false }),
          useBuiltIns: 'usage',
          corejs: '3.6.5',
          exclude: env.modern ? ['transform-regenerator'] : [],
        },
      ],
      '@babel/preset-react',
    ],
  };
  return config;
};
