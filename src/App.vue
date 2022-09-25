<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { ui as io } from '../common/event'
import { CREATE_RECTANGLES, EXIST, GET_TEHME, NOTIFY, SET_THEME, TEST_ACTION } from '../common/eventName'
import logo from './assets/logo.png'

const triggerOne = ref('This works!')
const consoleTry = () => {
  io?.send(
    NOTIFY, 'This is a notification from the main process',
  )
}
const Test = () => {
  io?.send(TEST_ACTION, 'test')
}
const cancel = () => {
  io?.send(EXIST, '')
}
const create = () => {
  io?.send(CREATE_RECTANGLES, { type: 'create-rectangles', count: 5 })
}
const isDark = ref(false)
const ifUseDarkTheme = computed(() => {
  if (isDark.value)
    return darkTheme
  return undefined
})
const el = ref(null)
const mainColor = useCssVar('--c-primary', el)
useTitle('masterGo Plugin UI')

io?.on(SET_THEME, ({ ifDark }) => {
  isDark.value = ifDark
})

watch(isDark, () => {
  if (isDark.value)
    document.body.setAttribute('arco-theme', 'dark')
  else
    document.body.removeAttribute('arco-theme')
})

onMounted(() => {
  io?.send(GET_TEHME, '')
})

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  cancel()
})
</script>

<template>
  <div>
    <div flex="~ center col">
      <img :src="logo" mt-12 w-120px h-120px>
      <div flex="~ row gap-4" mt-12>
        <a-button btn type="primary" @click="consoleTry">
          Show Console
        </a-button>
        <a-button type="secondary" btn @click="create">
          Manipulate UI
        </a-button>
        <a-button btn type="secondary" @click="Test">
          Test Btn
        </a-button>
      </div>

      <div mxa mt-10 flex="col ~ gap-4 center">
        <a-typography-text type="primary" bold text-xl>
          Vue 3 + Vite + Acro Design + Uno + VueUse
        </a-typography-text>
      </div>
      <button flex="~ center gap-2" mt-12 @click="cancel">
        <div i-ph-hands-clapping icon-btn />
        <div icon-btn>
          See U Again
        </div>
      </button>
    </div>
  </div>
</template>

<style>

</style>
