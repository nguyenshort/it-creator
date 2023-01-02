import { createI18n } from 'vue-i18n'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {
        sidebar: {
          projects: 'Projects',
          list: 'List',
          logOut: 'Log Out',
        },
        projects: {
          addNew: 'Add New',
          all: 'All',
          active: 'Active',
          draft: 'Draft',
          blocked: 'Blocked',
          table: {
            name: 'Name',
            status: 'Status',
            category: 'Category',
            active: 'Active',
            createdAt: 'Created At',
            deleteConfirm: 'Are you sure delete this task?',
          }
        },
        project: {
          active: {
            active: 'Active',
            draft: 'Draft',
            disabled: 'Disabled',
          },
          status: {
            done: 'Done',
            prepare: 'Prepare',
            running: 'Running',
            stuck: 'Stuck'
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(i18n)
})
