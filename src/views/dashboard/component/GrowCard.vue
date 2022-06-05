<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <el-card class="md:w-1/4 w-full !md:mt-0 !mt-4" :class="[index + 1 < 4 && '!md:mr-4']">
        <template #header>
          <div>
            <span>{{ item.title }}</span>
            <!-- <el-tag :color="item.color">{{ item.action }}</el-tag> -->
          </div>
        </template>
        <el-skeleton :loading="loading" :rows="3" animated>
          <template #default>
            <div class="py-4 px-4 flex justify-between">
              <CountTo prefix="$" :startVal="1" :endVal="item.value" class="text-2xl" />
              <Icon :icon="item.icon" :size="40" />
            </div>

            <div class="p-2 px-4 flex justify-between">
              <span>总{{ item.title }}</span>
              <CountTo prefix="$" :startVal="1" :endVal="item.total" />
            </div>
          </template>
        </el-skeleton>
      </el-card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { CountTo } from '@/components/CountTo/index'
import { Icon } from '@/components/Icon'
import { growCardList } from '../data'

defineProps({
  loading: {
    type: Boolean
  }
})
</script>
