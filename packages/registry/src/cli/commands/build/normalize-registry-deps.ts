export function normalizeRegistryDependency(dep: string, namespace: string): string {
  if (/^https?:\/\//.test(dep))
    return dep
  if (dep.startsWith('@'))
    return dep
  if (dep.includes('/'))
    return dep

  return `${namespace.replace(/\/+$/, '')}/${dep}`
}
