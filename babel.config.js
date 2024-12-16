/**
 * @type {import("@babel/core").ConfigFunction}
 */
export default function (api) {
  api.cache(true)

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // the default option, "classic" does not automatic import anything.
        // https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
      },
    ],
  ]
  const plugins = []

  return {
    presets: presets,
    plugins: plugins,
  }
}
