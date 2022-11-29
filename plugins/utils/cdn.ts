//CDN
import { useRuntimeConfig } from "#imports";

export enum CDNLocation {
  LOCAL
}

export const $cdn = (path: string, location = CDNLocation.LOCAL) => {
  const runtime = useRuntimeConfig()

  if (!path) {
    return ''
  }

  if (/^http/.test(path)) {
    return path
  }

  let _path = path.replace(/^\//, '/')

  switch (location) {
    case CDNLocation.LOCAL:
      _path = runtime.public.cdnEndpoint + path
      break
  }

  return _path
}
