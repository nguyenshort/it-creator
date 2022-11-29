import { useUpload } from '~/composables/useUpload'
import { useFileDialog, watch } from '#imports'
import { UseFileDialogOptions } from '@vueuse/core'

interface Props extends UseFileDialogOptions {
  endpoint: string
  onStart?: (files?: FileList | null) => void
  onDone?: (files: string[]) => void | Promise<void>
  onErr?: (err: any) => void | Promise<void>
}
export const useUploadFiles = (props: Props) => {
  const upload = useUpload()
  const { open, files } = useFileDialog(props)
  const uploadFiles = async () => {
    try {
      props.onStart?.(files.value)
      const _files = await Promise.all(
        Array.from(files.value || []).map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              upload
                .document(file, props.endpoint)
                .then((url) => {
                  if (url) {
                    resolve(url)
                  } else {
                    reject()
                  }
                })
                .catch(() => {
                  reject()
                })
            })
        )
      )
      await props.onDone?.(_files)
    } catch (e) {
      await props.onErr?.(e)
    }
  }
  watch(files, () => uploadFiles())

  return {
    open
  }
}
