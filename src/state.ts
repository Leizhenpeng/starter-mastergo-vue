import type { ETestNum } from '#/enum'
export const isDark = ref(false)
export const loadingProcess = ref(false) // 正在核心操作的处理中

export const selectImageNum = ref(0)
export const ifSelectedImage = computed(() => {
  if (selectImageNum.value)
    return selectImageNum.value > 0

  return false
})

export const testConfig = ref<ETestNum>()

const mock = (() => {
  selectImageNum.value = 1
})()
