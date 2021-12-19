<!--
 * @Author: your name
 * @Date: 2021-11-30 21:10:19
 * @LastEditTime: 2021-12-13 21:14:44
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-wj\src\views\permission\Role.vue
-->
<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180"> </el-table-column>
    <el-table-column prop="name" label="角色名" width="180"> </el-table-column>
    <el-table-column prop="description" label="描述"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-tree :data="pageList" show-checkbox node-key="id"> </el-tree>

  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/router'
const router = useRouter()
const pageList = []
routes.forEach((item, index) => {
  console.log(item)
  if (item.meta) {
    pageList.push({
      id: index,
      label: item.meta.title
    })
  }
})

const tableData = reactive([
  {
    id: 1,
    name: 'editor',
    description: '普通编辑。可以查看除权限页以外的所有页面'
  },
  {
    id: 2,
    name: '管理员',
    description: '超级管理员。有权查看所有页面'
  },
  {
    id: 3,
    name: 'visitor',
    description: '只是个访客。只能看到主页和文档页'
  }
])
const dialogVisible = ref(false)
const handleEdit = (index, row) => {
  dialogVisible.value = true
  console.log(index, row)
}

const handleDelete = (index, row) => {
  console.log(index, row)
}

// const handleClose = done => {
//   this.$confirm('确认关闭？')
//     .then(_ => {
//       done()
//     })
//     .catch(_ => {})
// }
</script>

<style scoped></style>
