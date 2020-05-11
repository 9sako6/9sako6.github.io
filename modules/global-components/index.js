// source: https://github.com/nuxt/nuxtjs.org/blob/master/modules/components/index.js
const { join, basename } = require('path')
const globby = require('globby')

export default async function () {
  const { options } = this.nuxt

  const dir = options.dir.components || 'components'
  const componentsDir = join(options.srcDir, dir)

  let globalComponents = await globby('**/*.global.(vue|js)', {
    cwd: componentsDir,
    asbsolute: true,
    onlyFiles: true
  })
  globalComponents = globalComponents.map((path) => {
    return {
      name: basename(path).replace(/\.global\.(vue|js)$/, ''),
      path: `~/${dir}/${path}`
    }
  })

  this.addPlugin({
    src: join(__dirname, 'global-components.plugin.js'),
    options: {
      globalComponents
    }
  })
}
