import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import image from 'rollup-plugin-image';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife',
    sourcemap: true,
  },
  external: [],
  plugins: [
    babel({
      babelrc: false,
      presets: [
        'es2016',
        'stage-1',
      ],
      plugins: [
        'external-helpers',
        ['transform-react-jsx', {pragma: 'createElement'}],
      ],
    }),
    nodeResolve({jsnext: true}),
    commonjs(),
    image({
    output: `build/images`, // default the root
    extensions: /\.(png|jpg|jpeg|gif|svg)$/,
    // support png|jpg|jpeg|gif|svg, and it's alse the default value
    limit: 8192, // default 8192(8k)
    exclude: 'node_modules/**',
  }),
  ],
};
