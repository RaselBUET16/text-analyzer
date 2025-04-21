function createAbsoluteUrl (base, path) {
    if (String(base).endsWith('/')) {
      base = base.slice(0, -1)
    }
    if (String(path).startsWith('/')) {
      path = path.slice(1)
    }
    return `${base}/${path}`
}

module.exports = {
    createAbsoluteUrl
}