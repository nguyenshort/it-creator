<template>
  <div class="h-screen w-full relative flex justify-center items-center">
    <img class="w-full h-full object-cover absolute top-0 left-0 z-10" alt="" src="/images/login.jpg" />

    <div class="w-[400px] rounded-md bg-white px-5 pt-4 shadow-lg z-20">
      <div class="mb-1 flex w-full items-center justify-center">
        <img src="/images/logo.png" alt="" class="w-[64px]" />
        <h1
            class="mb-0 text-[28px] font-bold text-primary-500"
            style="font-family: Dancing Script, cursive"
        >
          IT Square
        </h1>
      </div>

      <a-spin :spinning="false">
        <a-form
            :model="formState"
            name="basic"
            layout="vertical"
            autocomplete="off"
            @finish="onFinish"
            @finish-failed="onFinishFailed"
        >
          <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
              label="Password"
              name="password"
              :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item>
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-center">
                <button class="scale-95 transform" @click.prevent.stop="googleSignIn">
                  <img width="25" height="25" src="/images/logo/gg.png" alt="" />
                </button>
                <button class="ml-5 -translate-y-0.5 transform">
                  <img
                      src="/images/logo/apple.png"
                      alt=""
                      class="h-[25px] w-auto object-cover"
                  />
                </button>
              </div>
              <a-button type="primary" html-type="submit">Submit</a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-spin>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { definePageMeta, reactive } from '#imports'

definePageMeta({
  layout: 'blank'
})

import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const googleSignIn = () => signInWithPopup(getAuth(), new GoogleAuthProvider())
</script>

<style scoped></style>
