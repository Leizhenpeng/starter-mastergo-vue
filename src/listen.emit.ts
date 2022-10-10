import { CHANGE_SELECT_IMG_NUM, REFRESH_REPLACE_PRECENT, SET_THEME } from '#/eventName'
import { isDark, loadingProcess, selectImageNum } from '~/state'
import { ui as io } from '#/event'

io?.on(SET_THEME, ({ ifDark }) => {
  isDark.value = ifDark
})

io?.on(CHANGE_SELECT_IMG_NUM, ({ num }) => {
  selectImageNum.value = num as number
})

io?.on(REFRESH_REPLACE_PRECENT, () => {
  loadingProcess.value = false
})
