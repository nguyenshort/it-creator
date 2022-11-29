import {TinyMCE} from "tinymce";

declare global {
    interface Window {
        copyJWT: () => string
    }
}

declare global {
    interface Window {
        tinymce: TinyMCE
    }
}
