export function normalizeRegistryDependency(dep: string, registryBaseUrl: string): string {
  if (/^https?:\/\//.test(dep))
    return dep
  if (dep.startsWith('@'))
    return dep

  return `${registryBaseUrl.replace(/\/+$/, '')}/${dep}.json`
}
