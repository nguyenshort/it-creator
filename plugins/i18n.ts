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
          },
          tab: {
            all: 'All',
            info: 'Info',
            members: 'Members',
            progress: 'Progress',
            proposal: 'Proposal',
          },
          info: {
            name: 'Name',
            namePlaceholder: 'Enter project name',
            logo: 'Logo',
            cover: 'Cover',
            uploadCover: 'Upload Cover',
            category: 'Category',
            categoryPlaceholder: 'Select category',
            tech: 'Programing lang, framework',
            estimate: 'Estimated Time',
            type: 'Project Type',
            typePersonal: 'Personal',
            typeEnterprise: 'Enterprise',
            status: 'Status',
            link: 'Link',
            documents: 'Documents',
            ownerInfo: 'Owner Info',
            actions: {
              deleteConfirm: 'Are you sure delete this project?',
              delete: 'Delete',
              update: 'Update'
            }
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(i18n)
})
