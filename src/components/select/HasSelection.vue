<script setup lang="ts">
import MainShow from '../logo/MainShow.vue'
import { ui as io } from '#/event'
import { EXIST, TRY_PROCESS } from '#/eventName'
import { loadingProcess, selectImageNum, testConfig } from '~/state'
const showTitle = computed(() => {
  return `已选中${selectImageNum.value}张图片`
})
const coreProcess = () => {
  loadingProcess.value = true
  io?.send(TRY_PROCESS, '')
}
</script>

<template>
  <div w-300px mxa mt-4>
    <n-result status="418" :title="showTitle" description="如果每个人都理解你,那得普通成什么样子">
      <template #icon>
        <MainShow />
      </template>
    </n-result>
    <div flex="~ col gap-2 center" select-none mt-8>
      <div mxa mt-3>
        <n-spin :show="loadingProcess">
          <button
            class="btn icon-btn-base btn-primary ml-0  py-2 w-200px" mxa flex="center ~" @click="coreProcess"
            @keydown.enter="coreProcess"
          >
            <p class="i-ph-telegram-logo-duotone" mr-2 btn-primary />
            <p> 适应图片比例</p>
          </button>
        </n-spin>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
