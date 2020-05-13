import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import filesize from 'rollup-plugin-filesize';

const plugins = [
  nodeResolve({
    jsnext: true,
    modulesOnly: true,
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      sucrase: ['transform'],
    },
  }),
  babel({
    babelrc: false,
    presets: [['@babel/env', { modules: false, loose: true }], '@babel/react'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      'transform-react-remove-prop-types',
    ].filter(Boolean),
  }),
];

const devPlugins = plugins.concat([
  replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
]);

const prodPlugins = plugins.concat([
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  uglify(),
  filesize(),
]);

const base = {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'sucrase'],
};

const output = {
  exports: 'named',
  globals: {
    react: 'React',
    sucrase: 'sucrase',
    'react-dom': 'ReactDOM',
  },
};

const makeOutput = (config) => Object.assign({}, output, config);

const withBase = (config) => Object.assign({}, base, config);

export default [
  {
    output: [
      {
        name: 'ReactLive',
        file: 'dist/react-live.min.js',
        format: 'umd',
      },
    ].map(makeOutput),
    plugins: prodPlugins,
  },
  {
    output: [
      {
        name: 'ReactLive',
        file: 'dist/react-live.js',
        format: 'umd',
      },
      {
        file: 'dist/react-live.es.js',
        format: 'es',
      },
      {
        file: 'dist/react-live.cjs.js',
        format: 'cjs',
      },
    ].map(makeOutput),
    plugins: devPlugins,
  },
].map(withBase);
