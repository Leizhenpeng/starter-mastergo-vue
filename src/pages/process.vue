<script setup lang="ts">
import { ui as io } from '#/event'
import { EXIST, TEST_ACTION } from '#/eventName'
import { ifSelectedImage, selectImageNum } from '~/state'
const showTitle = computed(() => {
  return `已选中${selectImageNum.value}张图片`
})
const cancel = () => {
  io?.send(EXIST, '')
}
</script>

<template>
  <div pt-4 overflow="hidden">
    <not-selection v-if="!ifSelectedImage" pt-4 />
    <has-selection v-else />
  </div>
</template>

<style scoped>

</style>
