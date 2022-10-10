import { getSelectedImageNodes } from '@/utils'

export const selectionNow = ref()
export function updateSelection() {
  selectionNow.value = mg.document.currentPage.selection
}

export const selectImageNodePool = ref()

watchDebounced(selectionNow, (selection) => {
  const selectedImages = getSelectedImageNodes(selection)
  selectImageNodePool.value = selectedImages
}, {
  immediate: true,
  debounce: 100,
})

export const selectImagePoolNum = computed(() => {
  if (selectImageNodePool.value)
    return selectImageNodePool.value.length

  return 0
})

export const testConfig = ref();
