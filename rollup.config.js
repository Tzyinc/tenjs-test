import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	output: {
		file: 'build/index.js',
		format: 'iife',
		sourcemap: true
	},
	external: [],
	plugins: [
		babel({
			babelrc: false,
			presets: [
				'es2016',
				'stage-1'
			],
			plugins: [
				'external-helpers',
				['transform-react-jsx', { pragma:'createElement' }]
			]
		}),
		nodeResolve({ jsnext:true }),
		commonjs()
	]
};
