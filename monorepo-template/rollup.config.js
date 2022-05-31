import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'


const masterVersion = require('./package.json').version
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = packageName => path.resolve(packageDir, packageName)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename || path.basename(packageDir)

const outputConfigs = {
  esm: {
    file: resolve(`dist/index.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  }
}

const defaultFormats = ['esm']
const packageFormats = packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfigs[format]))

function createConfig(format, output, plugins = []) {

  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  let entryFile = 'src/index.ts';
  let external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]

  output.sourcemap = !!process.env.SOURCE_MAP
  output.externalLiveBindings = false

  return {
    input: resolve(entryFile),
    output,
    external,
    plugins: [
      json({
        namedExports: false
      }),
      ...createPackagePlugin(output, format),
      ...plugins
    ],
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    treeshake: {
      moduleSideEffects: false
    }
  }
}

function createPackagePlugin(output, format) {
  const tsPlugin = ts({
    tsconfig: resolve('tsconfig.json'),
    cacheRoot: resolve('node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: true,
        declarationMap: true
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  })

  const nodePlugins =
    format === 'cjs'
      ? [ require('@rollup/plugin-commonjs')({ sourceMap: false }),
          require('@rollup/plugin-node-resolve').nodeResolve(),
          ...(format === 'cjs' ? [] : [ require('rollup-plugin-polyfill-node')() ]),
        ]
      : []
  
  return [
    tsPlugin, 
    nodePlugins
  ]
}

export default packageConfigs