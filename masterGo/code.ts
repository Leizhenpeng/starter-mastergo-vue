/// <reference types="@mastergo/plugin-utils" />
import { hook as io } from '../common/event'
import { CREATE_RECTANGLES, EXIST, GET_TEHME, NOTIFY, RESIZE, SET_THEME, TEST_ACTION } from '../common/eventName'
mg.showUI(__html__, {
  width: 300,
  height: 400,
})

io?.on(RESIZE, ({ width, height }) => {
  console.log(width, height)
  mg.ui.resize(
    width + 12,
    height + 80,
  )
})
io?.on(NOTIFY, (data) => {
  if (typeof data === 'string')
    mg.notify(data)
})

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

export { }
