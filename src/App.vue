<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { Pane } from 'tweakpane'

import * as InfodumpPlugin from 'tweakpane-plugin-infodump'
// import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { CREATE_RECTANGLES, EXIST, GET_TEHME, NOTIFY, RESIZE, SET_THEME, TEST_ACTION } from '../common/eventName'
import { ui as io } from '../common/event'

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
    document.body.setAttribute('class', 'dark')
  else
    document.body.setAttribute('class', 'light')
}, {
  immediate: true,
})

onMounted(() => {
  io?.send(GET_TEHME, '')
})

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  cancel()
})
const PARAMS = {
  factor: 0,
  speed: 50,
  title: 'hello',
  color: '#ff0055',
}

onMounted(() => {
  const pane = new Pane({
    container: document.getElementById('pane')!,
    // title: 'MasterGo Plugin',
    expanded: true,
  })

  pane.registerPlugin(InfodumpPlugin)
  // pane.registerPlugin(EssentialsPlugin)

  // pane.addBlade({
  //   view: 'infodump',
  //   content: 'This is a plugin for MasterGo power by Tweakpane',
  //   border: false,
  //   markdown: false,
  // })

  // const tab = pane.addTab({
  //   pages: [
  //     { title: '快速使用' },
  //     { title: '其他设置' },
  //   ],
  // })

  pane.addInput(PARAMS, 'title')
  pane.addInput(PARAMS, 'speed', {
    min: 0,
    max: 100,
  })
  pane.addInput(PARAMS, 'color')
  const btn = pane.addButton({
    title: 'Console',
    label: '测试 1',
  })
  btn.on('click', () => {
    consoleTry()
  })

  const btn2 = pane.addButton({
    title: 'Create Rectangles',
    label: '测试 2',
  })
  btn2.on('click', () => {
    create()
  })

  const btn3 = pane.addButton({
    title: 'Test',
    label: '测试 3',
  })
  btn3.on('click', () => {
    Test()
  })

  // const f2 = tab.pages[1].addFolder({
  //   title: '高级设置',
  //   expanded: true,
  // })
  // f2.addInput(PARAMS, 'factor', {
  //   options: {
  //     low: 0,
  //     medium: 50,
  //     high: 100,
  //   },
  // })
  // f2.addInput(PARAMS, 'title')

  // const f3 = tab.pages[1].addFolder({
  //   title: '其他设置',
  //   expanded: true,
  // })
  // f3.addInput(PARAMS, 'factor', {
  //   options: {
  //     low: 0,
  //     medium: 50,
  //     high: 100,
  //   },
  // })
  // f3.addInput(PARAMS, 'title')

  // pane.addSeparator()
  // pane.addButton({ title: '关闭' })

  pane.on('change', (ev) => {
    console.log(ev.value)
  })
})
const main = ref()
const { width, height } = useElementSize(main)

watch(() => {
  return [width.value, height.value]
}, (val) => {
  io?.send(RESIZE, { width: val[0], height: val[1] })
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <div bg-transparent flex="~ center row">
    <div id="pane" ref="main" w-240px mxa />
  </div>
</template>

<style>
:root{
  --tp-container-vertical-padding: 20px;
  --tp-blade-spacing: 8px;
}
.dark {
  --tp-base-background-color: hsla(0, 0% 13%, 1);
    --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
    --tp-button-background-color: hsla(230, 7%, 70%, 1.00);
    --tp-button-background-color-active: hsla(230, 7%, 85%, 1.00);
    --tp-button-background-color-focus: hsla(230, 7%, 80%, 1.00);
    --tp-button-background-color-hover: hsla(230, 7%, 75%, 1.00);
    --tp-button-foreground-color: hsla(230, 7%, 17%, 1.00);
    --tp-container-background-color: hsla(230, 7%, 75%, 0.10);
    --tp-container-background-color-active: hsla(230, 7%, 75%, 0.25);
    --tp-container-background-color-focus: hsla(230, 7%, 75%, 0.20);
    --tp-container-background-color-hover: hsla(230, 7%, 75%, 0.15);
    --tp-container-foreground-color: hsla(230, 7%, 75%, 1.00);
    --tp-groove-foreground-color: hsla(230, 7%, 75%, 0.10);
    --tp-input-background-color: hsla(230, 7%, 75%, 0.10);
    --tp-input-background-color-active: hsla(230, 7%, 75%, 0.25);
    --tp-input-background-color-focus: hsla(230, 7%, 75%, 0.20);
    --tp-input-background-color-hover: hsla(230, 7%, 75%, 0.15);
    --tp-input-foreground-color: hsla(230, 7%, 75%, 1.00);
    --tp-label-foreground-color: hsla(230, 7%, 75%, 0.70);
    --tp-monitor-background-color: hsla(230, 7%, 0%, 0.20);
    --tp-monitor-foreground-color: hsla(230, 7%, 75%, 0.70);
  --tp-base-shadow-color: hsla(0, 0%, 0%, 0)
}
/* https: //cocopon.github.io/tweakpane/theming/#builder */
.light{
  --tp-base-background-color: #ffffff;
  --tp-base-shadow-color: hsla(0, 0%, 0%, 0.10);
  --tp-button-background-color: hsla(230, 7%, 75%, 1.00);
  --tp-button-background-color-active: hsla(230, 7%, 60%, 1.00);
  --tp-button-background-color-focus: hsla(230, 7%, 65%, 1.00);
  --tp-button-background-color-hover: hsla(230, 7%, 70%, 1.00);
  --tp-button-foreground-color: hsla(230, 10%, 30%, 1.00);
  --tp-container-background-color: hsla(230, 15%, 30%, 0.20);
  --tp-container-background-color-active: hsla(230, 15%, 30%, 0.32);
  --tp-container-background-color-focus: hsla(230, 15%, 30%, 0.28);
  --tp-container-background-color-hover: hsla(230, 15%, 30%, 0.24);
  --tp-container-foreground-color: hsla(230, 10%, 30%, 1.00);
  --tp-groove-foreground-color: hsla(230, 15%, 30%, 0.10);
  --tp-input-background-color: hsla(230, 15%, 30%, 0.10);
  --tp-input-background-color-active: hsla(230, 15%, 30%, 0.22);
  --tp-input-background-color-focus: hsla(230, 15%, 30%, 0.18);
  --tp-input-background-color-hover: hsla(230, 15%, 30%, 0.14);
  --tp-input-foreground-color: hsla(230, 10%, 30%, 1.00);
  --tp-label-foreground-color: hsla(230, 10%, 30%, 0.70);
  --tp-monitor-background-color: hsla(230, 15%, 30%, 0.10);
  --tp-monitor-foreground-color: hsla(230, 10%, 30%, 0.50);

  --tp-base-shadow-color: hsla(0, 0%, 0%, 0)
  ;

}
</style>
