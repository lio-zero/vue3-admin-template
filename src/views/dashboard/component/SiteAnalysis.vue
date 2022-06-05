<template>
  <el-card>
    <el-tabs v-model="activeKey">
      <el-tab-pane v-for="tab in tabListTitle" :key="tab.key" :label="tab.tab" :name="tab.key">
        <el-skeleton v-bind="$attrs" :rows="5" animated>
          <template #default>
            <VisitAnalysis v-if="activeKey === 'tab1'" />
            <VisitAnalysisBar v-if="activeKey === 'tab2'" />
          </template>
        </el-skeleton>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script lang="ts" setup>
import VisitAnalysis from './VisitAnalysis.vue'
import VisitAnalysisBar from './VisitAnalysisBar.vue'

const activeKey = ref('tab1')

const tabListTitle = [
  {
    key: 'tab1',
    tab: '流量趋势'
  },
  {
    key: 'tab2',
    tab: '访问量'
  }
]
</script>
