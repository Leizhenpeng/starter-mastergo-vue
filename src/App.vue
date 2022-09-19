<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import logo from './assets/logo-acro.png'

const triggerOne = ref('This works!')
const consoleTry = () => {
  parent.postMessage({ type: 'apply-code', triggerOne: triggerOne.value }
    , '*')
}

const Test = () => {
  parent.postMessage({ type: 'test' }
    , '*')
}

const cancel = () => {
  parent.postMessage({ type: 'cancel' }, '*')
}
const create = () => {
  parent.postMessage({ type: 'create-rectangles', count: 5 }, '*')
}
const isDark = ref(true)
const ifUseDarkTheme = computed(() => {
  if (isDark.value)
    return darkTheme
  return undefined
})
const el = ref(null)
const mainColor = useCssVar('--c-primary', el)
useTitle('masterGo Plugin UI')

const themeOverrides = computed(() => {
  /**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const custom: GlobalThemeOverrides = {
    common: {
      primaryColor: mainColor.value,
      primaryColorHover: mainColor.value,
      successColor: mainColor.value,
    },
    Button: {
      textColor: mainColor.value,
      textColorFocus: mainColor.value,
      color: mainColor.value,
      borderHover: mainColor.value,
      borderPressed: mainColor.value,
    },
  }
  return custom
})
window.addEventListener('message', (event: any) => {
  const { data } = event
  if (data.name === 'setTheme') {
    const { ifDark } = data
    isDark.value = ifDark
  }
})
watch(isDark, () => {
  if (isDark.value)
    document.body.setAttribute('arco-theme', 'dark')

  else
    document.body.removeAttribute('arco-theme')
})
onMounted(() => {
  parent.postMessage({ type: 'init' }, '*')
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
