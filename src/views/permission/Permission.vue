<template>
  <el-button type="primary" @click="handleAddPermission">新增权限</el-button>
  <el-table :data="permissionList" style="width: 100%; margin-top: 30px" row-key="id" border>
    <template #empty>
      <el-empty description="暂无数据" />
    </template>
    <el-table-column align="left" prop="id" label="id" width="220" />
    <!-- <el-table-column align="center" prop="permission" label="权限" width="220"> </el-table-column> -->
    <el-table-column align="center" prop="name" label="名称" width="220" />
    <el-table-column align="center" prop="redirect_url" label="跳转地址" width="220" />
    <el-table-column align="center" prop="description" label="描述" />
    <el-table-column align="center" prop="display_icon" label="ICON" />
    <el-table-column align="center" label="操作" width="220">
      <template #default="scope">
        <el-button size="small" @click="handleAddPermission(scope)">新增</el-button>
        <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination-block">
    <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="permissionList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogType === 'edit' ? '编辑权限' : '新增权限'"
    :before-close="handleClose"
  >
    <el-form :model="permission" label-width="60px" label-position="right">
      <el-form-item label="名称">
        <el-input v-model="permission.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="permission.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="描述"
        />
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="permission.redirect_url" placeholder="跳转地址" />
      </el-form-item>
      <el-form-item label="ICON">
        <el-input v-model="permission.display_icon" placeholder="侧边栏 ICON" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="Permission">
import { Ref } from 'vue'
import {
  addPermission,
  getAllPermission,
  deletePermission,
  updatePermission
} from '@/api/permission'
import { deepClone } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'

const dialogType: Ref<string> = ref('new')
const currentPage: Ref<number> = ref(5)
const dialogVisible: Ref<boolean> = ref(false)
const permission: Ref<any> = ref({})
const permissionList: Ref<object[]> = ref([])

const getChildren = (data: any, result: object[], pid: number): void => {
  for (const item of data) {
    if (item.parent_id === pid) {
      const newItem = { ...item, children: [] }
      result.push(newItem)
      getChildren(data, newItem.children, item.id)
    }
  }
}

// https://blog.csdn.net/qq_37746973/article/details/78662177

const buildTree = (data: object[], pid: number): object[] => {
  const result: object[] = []
  getChildren(data, result, pid)
  return result
}

onMounted(async () => {
  const data: any = await getAllPermission()
  permissionList.value = buildTree(data, 0)
})

const handleEdit = (score: any) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  permission.value = deepClone(score.row)
}

const handleDelete = (score: any) => {
  ElMessageBox.confirm('确定删除该用户权限？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deletePermission({ id: score.row.id })
      ElMessage({
        type: 'success',
        message: '删除完成'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除已取消'
      })
    })
}

const handleClose = (done: any) => {
  ElMessageBox.confirm('您确定要关闭此对话框吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    center: true
  })
    .then(() => {
      done()
    })
    .catch(() => {})
}

const handleAddPermission = (scope: any) => {
  console.log(scope.row)

  if (scope.row) {
    permission.value.parent_id = scope.row.id
    permission.value.level = scope.row.level + 1
  }

  dialogType.value = 'new'
  dialogVisible.value = true
}

const save = async () => {
  if (dialogType.value === 'new') {
    const data = await addPermission(permission.value)
    console.log(data)
  } else {
    const data = await updatePermission(permission.value)
    console.log(data)
  }
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
  dialogVisible.value = false
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.pagination-block {
  padding-top: 20px;
}
</style>
