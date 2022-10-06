import { SET_THEME } from '#/eventName'
import { isDark } from '~/state'
import { ui as io } from '#/event'

io?.on(SET_THEME, ({ ifDark }) => {
  isDark.value = ifDark
})
