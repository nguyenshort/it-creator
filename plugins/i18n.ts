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
          table: {
            name: 'Name',
            status: 'Status',
            category: 'Category',
            active: 'Active',
            createdAt: 'Created At',
            deleteConfirm: 'Are you sure delete this task?',
          }
        },
        tabs: {
          all: 'All',
          active: 'Active',
          draft: 'Draft',
          blocked: 'Blocked',
          info: 'Info',
          members: 'Members',
          progress: 'Progress',
          proposal: 'Proposal',
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
          },
          permissions: {
            updateProject: 'Update Project',
            removeProject: 'Remove Project',
            createRole: 'Create Role',
            updateRole: 'Update Role',
            removeRole: 'Remove Role'
          },
          members: {
            name: 'Name',
            member: 'Member',
            permissions: 'Permissions',
            createdAt: 'Created At',
            action: 'Action',
            modal: {
              title: 'Add New',
              name: 'Role name',
              permissions: 'Permissions',
              count: 'Count',
              des: 'Description',
              user: 'User'
            },
            addNew: 'Add New',
            deleteConfirm: 'Are you sure delete this position?'
          },
          process: {
            addNew: 'Add New',
            modal: {
              title: 'Add New',
              name: 'Name',
              status: 'Status',
              waitting: 'Waitting',
              done: 'Done',
              des: 'Description',
            }
          },
          proposal: {
            cendidate: 'Cendidate',
            position: 'Position',
            status: 'Status',
            resume: 'Resume',
            note: 'Note',
            createdAt: 'Created At',
            action: 'Action',
            waiting: 'Waiting',
            rejected: 'Rejected',
            approved: 'Approved',
            download: 'Download',
            update: 'Update',
            modal: {
              title: 'Update',
              note: 'Note'
            }
          }
        }
      },
      jp: {
        sidebar: {
          projects: 'Projects',
          list: 'List',
          logOut: 'Log Out',
        },
        projects: {
          addNew: 'Add New',
          table: {
            name: 'Name',
            status: 'Status',
            category: 'Category',
            active: 'Active',
            createdAt: 'Created At',
            deleteConfirm: 'Are you sure delete this task?',
          }
        },
        tabs: {
          all: 'All',
          active: 'Active',
          draft: 'Draft',
          blocked: 'Blocked',
          info: 'Info',
          members: 'Members',
          progress: 'Progress',
          proposal: 'Proposal',
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
          },
          permissions: {
            updateProject: 'Update Project',
            removeProject: 'Remove Project',
            createRole: 'Create Role',
            updateRole: 'Update Role',
            removeRole: 'Remove Role'
          },
          members: {
            name: 'Name',
            member: 'Member',
            permissions: 'Permissions',
            createdAt: 'Created At',
            action: 'Action',
            modal: {
              title: 'Add New',
              name: 'Role name',
              permissions: 'Permissions',
              count: 'Count',
              des: 'Description',
              user: 'User'
            },
            addNew: 'Add New',
            deleteConfirm: 'Are you sure delete this position?'
          },
          process: {
            addNew: 'Add New',
            modal: {
              title: 'Add New',
              name: 'Name',
              status: 'Status',
              waitting: 'Waitting',
              done: 'Done',
              des: 'Description',
            }
          },
          proposal: {
            cendidate: 'Cendidate',
            position: 'Position',
            status: 'Status',
            resume: 'Resume',
            note: 'Note',
            createdAt: 'Created At',
            action: 'Action',
            waiting: 'Waiting',
            rejected: 'Rejected',
            approved: 'Approved',
            download: 'Download',
            update: 'Update',
            modal: {
              title: 'Update',
              note: 'Note'
            }
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(i18n)
})
