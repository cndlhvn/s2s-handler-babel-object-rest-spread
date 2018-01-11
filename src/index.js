import { transform } from 'babel-core'
import { getPluginName } from 's2s-helper-get-plugin-name'

export default function babelHandler(code, { eventPath, plugin, filename }){

  if (!plugin || !plugin.plugin) {
    throw new Error('required plugin')
  }

  const opts = plugin.plugin
  const fromOpts = { from: eventPath }

  const lastPlugin = Array.isArray(opts)
    ? [opts[0], { ...opts[1], ...fromOpts }]
    : [opts, fromOpts]

  const { code: result } = transform(code, {
    filename,
    babelrc: false,
    plugins: ['babel-plugin-syntax-object-rest-spread',lastPlugin]
  })

  return {
    code: result ? result.trim() : '',
    meta: {
      handlerName: 'babel/object-rest-spread',
      pluginName: getPluginName(lastPlugin[0])
    },
  }
}
