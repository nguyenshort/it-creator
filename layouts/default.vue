<template>
  <a-layout class="default-layout h-screen">
    <a-layout-header class="header -mx-[23px] flex items-center">
      <client-only>
        <nuxt-link to="/dashboard" class="logo flex flex-shrink-0 items-center">
          <img src="/images/logo.svg" alt="" class="w-[32px]" />
          <h1
            class="mb-0 ml-2.5 text-[20px] font-bold text-white"
            style="font-family: Dancing Script, cursive"
          >
            IT Square
          </h1>

        </nuxt-link>
        <a href="https://it.smileeye.edu.vn/" class="text-white ml-3 text-[22px] cursor-pointer block mr-8">
            <Icon
              name="ic:baseline-home"
            />
          </a>
      </client-only>

      <div id="tabs" class="w-full"></div>

      <div id="actions" class="ml-auto flex flex-shrink-0 items-center"></div>

      <button class="ml-5">
        <a-avatar :src="$cdn(app?.user?.avatar)" />
      </button>

    </a-layout-header>
    <client-only>
      <a-layout>
        <a-layout-sider width="220" style="background: #fff">
          <a-menu
              v-model:selectedKeys="selectedKeys2"
              v-model:openKeys="openKeys"
              mode="inline"
              :style="{ height: '100%', borderRight: 0 }"
          >

            <a-sub-menu key="sub1" @click="$router.push('/dashboard')">
              <template #title>
              <span class="flex items-center">
                <Icon name="material-symbols:space-dashboard-rounded" />
                <span class="ml-1.5">
                  {{ $t('sidebar.projects') }}
                </span>
              </span>
              </template>
              <a-menu-item key="1">
                {{ $t('sidebar.list') }}
              </a-menu-item>
            </a-sub-menu>

            <a-menu-item key="sub3" @click="logOut">
              <span class="flex items-center">
                <Icon name="majesticons:logout-half-circle" />
                <span class="ml-1.5">
                  {{ $t('sidebar.logOut') }}
                </span>
              </span>
            </a-menu-item>

          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 24px">
          <a-layout-content
              :style="{
                background: '#fff',
                padding: '24px',
                margin: 0,
                minHeight: '280px'
              }"
          >
            <div class="h-full overflow-y-auto scrollbar-hide">
              <nuxt-page />
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </client-only>

    <div class="change-langs">
      <div class="flex items-center text-[30px] mt-4">
        <div
          class="cursor-pointer transition duration-300 ease-in-out"
          :class="{
              'opacity-40': $i18n.locale !== 'jp'
            }"
          @click="$i18n.locale = 'jp'"
        >
          <Icon name="twemoji:flag-for-flag-japan" />
        </div>

        <div
          class="cursor-pointer transition duration-300 ease-in-out ml-5"
          :class="{
              'opacity-40': $i18n.locale !== 'en'
            }"
          @click="$i18n.locale = 'en'"
        >
          <Icon name="twemoji:flag-for-flag-united-states" />
        </div>

      </div>
    </div>

  </a-layout>
</template>
<script lang="ts" setup>
import {ref, useSubscription, useAppStore} from "#imports"

const selectedKeys2 = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

import { signOut, getAuth } from "firebase/auth"
import { SUB_NOTIFY } from "~/apollo/server/subscriptions/notify.subscription";
import { SubNotify } from "~/apollo/server/subscriptions/__generated__/SubNotify";
import { message } from "ant-design-vue"
import 'ant-design-vue/lib/message/style/index.less'

const app = useAppStore()

const logOut = async () => {
  await app.logOut()
  await signOut(getAuth())
  location.href = '/'
}

const { onResult } = useSubscription<SubNotify>(SUB_NOTIFY)

onResult((result) => {
  if(result.data) {
    if(result.data.subNotify.error) {
      message.error(result.data.subNotify.msg)
    } else {
      message.success(result.data.subNotify.msg)
    }
  }
})


const openNewPage = () => {
  window.open('https://it.smileeye.edu.vn/', '_blank')
}

</script>
<style>
.default-layout .logo {
  width: 133px;
  height: 31px;
}
.site-layout-background {
  background: #fff;
}

.change-langs {
  position: fixed;
  bottom: 15px;
  left: 20px;
}
</style>
