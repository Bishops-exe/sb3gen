import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import {defineConfig} from "rollup";

const entryFile = 'src/index.ts';

export default defineConfig([
  // 1. JavaScript Builds (ESM & UMD)
  {
    input: entryFile,
    output: [
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/default/index.js',
        format: 'umd',
        name: 'sb3gen',
        sourcemap: false,
        plugins: [terser()]

      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false
        }
      })
    ]
  },

  // 2. TypeScript Types Build (.d.ts bundling)
  {
    input: entryFile,
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]);
