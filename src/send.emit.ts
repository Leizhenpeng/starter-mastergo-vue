import { ui as io } from '#/event'
import { CREATE_RECTANGLES, EXIST, NOTIFY, TEST_ACTION } from '#/eventName'

const consoleTry = () => {
  io?.send(
    NOTIFY, 'This is a notification from the main process',
  )
}
const test = () => {
  io?.send(TEST_ACTION, 'test')
}
const cancel = () => {
  io?.send(EXIST, '')
}
const create = () => {
  io?.send(CREATE_RECTANGLES, { type: 'create-rectangles', count: 5 })
}

export {
  consoleTry,
  test,
  cancel,
  create,

}
