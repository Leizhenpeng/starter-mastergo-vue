/// <reference types="@mastergo/plugin-utils" />
import { selectImagePoolNum, testConfig, updateSelection } from '@/state'
import { hook as io } from '#/event'
import { CHANGE_SELECT_IMG_NUM, CONFIG_CHANGE, CONFIG_REFRESH, CREATE_RECTANGLES, EXIST, GET_TEHME, NOTIFY, SET_THEME, TEST_ACTION, UI_READY, WARN } from '#/eventName'
import { getConfig, updateConfig } from '@/utils'
mg.showUI(__html__, {
  width: 450,
  height: 600,
})

io?.on(NOTIFY, (data) => {
  if (typeof data === 'string') {
    mg.notify(data, {
      position: 'bottom',
    })
  }
})

io?.on(WARN, (data) => {
  if (typeof data === 'string') {
    mg.notify(data, {
      position: 'bottom',
      type: 'warning',
    })
  }
})
mg.on(
  'themechange',
  (theme: any) => {
    const ifDark = theme === 'dark' ? 1 : 0
    io?.send(SET_THEME, { ifDark })
  },
)
io?.on(GET_TEHME, () => {
  const mg_ = mg as any
  const ifDark = mg_.themeColor === 'dark' ? 1 : 0
  io?.send(SET_THEME, { ifDark })
})

io?.on(TEST_ACTION, () => {
  mg.notify('test code execute successful!')
})

io?.on(EXIST, () => {
  mg.closePlugin()
})

io?.on(CREATE_RECTANGLES, ({ count }) => {
  const nodes = [] as any
  for (let i = 0; i < count; i++) {
    const rect = mg.createRectangle()
    rect.x = i * 150
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0, a: 1 } }]
    mg.document.currentPage.appendChild(rect)
    nodes.push(rect)
  }
  mg.document.currentPage.selection = nodes
  mg.viewport.scrollAndZoomIntoView(nodes)
})

// ui 加载完成
io?.on(UI_READY, async () => {
  testConfig.value = await getConfig()
  io?.send(CONFIG_REFRESH, testConfig.value)
  updateSelection()
})

// 配置改变
io?.on(CONFIG_CHANGE, (testConfigNew) => {
  testConfig.value = testConfigNew
  updateConfig(testConfigNew)
})

watchDebounced(selectImagePoolNum, () => {
  io?.send(CHANGE_SELECT_IMG_NUM, {
    num: selectImagePoolNum.value,
  })
}, {
  debounce: 100,
})

export { }
