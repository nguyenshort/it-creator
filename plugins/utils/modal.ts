import { useEventBus } from "#imports";

export const $modal = () => {
  const mitter = useEventBus<string>('modal')

  return {
    open: (name: string, payload: any = undefined) => mitter.emit( 'Modal-' + name, payload),
    off: (name: string) => mitter.emit('Modal-' + name + '-Dispose')
  }
}
