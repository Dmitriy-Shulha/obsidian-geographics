import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import resolve from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.ts',
  output: {
    dir: './build',
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default'
  },
  external: ['obsidian'],
  plugins: [
    svelte({
      emitCss: false,
      preprocess: autoPreprocess(),
    }),
    typescript({ sourceMap: true }),
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),
    json()
  ]
};
