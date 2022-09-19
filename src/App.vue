<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import logo from './assets/logo.png'

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
    <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
      <div flex="~ center col">
        <img :src="logo" mt-12 w-140px h-140px>

        <div flex="~ row gap-4" mt-12>
          <button btn @click="consoleTry">
            Show Console
          </button>
          <button btn @click="create">
            Manipulate UI
          </button>
          <button btn @click="Test">
            Test Btn
          </button>
        </div>

        <div mxa mt-10 flex="col ~ gap-4 center">
          <n-gradient-text type="success" :size="24">
            Vue 3 + Vite + Naive UI + Uno + VueUse
          </n-gradient-text>
          <n-rate />
        </div>
        <button flex="~ center gap-2" mt-12 @click="cancel">
          <div i-ph-hands-clapping icon-btn />
          <div icon-btn>
            See U Again
          </div>
        </button>
      </div>
    </n-config-provider>
  </div>
</template>

<style>

</style>
