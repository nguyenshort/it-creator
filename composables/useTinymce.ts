import {EditorSettings} from "tinymce"
import { useUpload } from "~/composables/useUpload"
import { useNuxtApp } from "#imports"

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

interface Props {
  options?: Partial<EditorSettings>

  autoInit?: boolean

  initValue?: string
}
export const useTinymce = (props?: Props) => {

  const value = ref('')

  const getEditor = () => {
    const id = props?.options?.selector?.split('#')?.[1]
    return id ? window.tinymce.get(id) : null
  }

  const upload = useUpload()
  const { $cdn } = useNuxtApp()

  const images_upload_handler = async (blobInfo: BlobInfo) =>
    new Promise((resolve, reject) => {
      upload
        .image(blobInfo.blob(), 'freesize')
        .then((res) => {
          resolve($cdn(res))
        })
        .catch((err) => {
          reject(err)
        })
    })

  const init = async () => {

    if(!props?.options?.selector && !props?.options?.selector?.startsWith('#')) return

    const settingDefault: EditorSettings = {
      height: 700,
      plugins:
        'advlist autolink lists link image charmap preview anchor pagebreak lists table emoticons autosave quickbars media',
      toolbar1:
        'undo redo | blocks fontfamily | ' +
        'bold italic forecolor backcolor | alignleft aligncenter ' +
        'alignright alignjustify',
      toolbar2:
        'bullist numlist outdent indent | ' +
        'table media image emoticons | removeformat restoredraft help',
      toolbar_mode: 'floating',
      file_picker_types: 'image',
      contextmenu: 'link image video table',
      external_plugins: {}
    }

    await window.tinymce.init({
      ...settingDefault,
      ... props?.options,
      images_upload_handler
    })

    setContent(props?.initValue || '')

    const editor = getEditor()
    if(editor) {
      editor.setContent(props?.initValue || '')
      editor.on('input', () => {
        value.value = editor.getContent()
      })
    }
  }

  const setContent = (text: string) => {
    const editor = getEditor()
    if(editor) {
      editor.setContent(text)
    }
  }

  const getContent = () => {
    const editor = getEditor()
    if(editor) {
      return editor.getContent()
    }
    return ''
  }

  onMounted(() => nextTick(() => props?.autoInit && init()))
  onUnmounted(() => getEditor()?.destroy())


  return {
    init,
    value,
    setContent,
    getContent
  }
}
