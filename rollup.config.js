import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

import { terser } from "rollup-plugin-terser";

export default {
  input: './src/stocks.ts',
  external: [
    'http',
    'https',
    'url',
    'zlib',
    'assert',
    'stream',
    'tty',
    'util',
    'os'
  ],
  plugins: [
    typescript(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    terser()
  ]
}
