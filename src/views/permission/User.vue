<template>
  <el-button type="primary" @click="handleAddUser">新增用户</el-button>
  <el-table :data="tableData" border style="width: 100%; margin-top: 30px">
    <template #empty>
      <el-empty description="暂无数据" />
    </template>
    <el-table-column align="center" prop="id" label="ID" width="80" />
    <el-table-column align="center" prop="name" label="用户名" width="120" />
    <el-table-column align="center" prop="email" label="邮箱" width="200" />
    <el-table-column align="center" prop="phone" label="手机号" />
    <el-table-column align="center" prop="group" label="组" />
    <el-table-column align="center" prop="status" label="状态">
      <template #default="scope">
        <el-icon class="align-middle mr-2" :color="scope.row.status ? '#67C23A' : '#F56C6C'">
          <CircleCheckFilled v-if="scope.row.status" />
          <CircleCloseFilled v-else />
        </el-icon>
        <span class="align-middle">{{ scope.row.status ? '正常' : '禁用' }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="created_at" label="创建时间" />
    <el-table-column align="center" label="操作" width="220">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogType === 'edit' ? '编辑用户' : '新增用户'"
    :before-close="handleClose"
  >
    <el-form :model="user" label-width="80px" label-position="left">
      <el-form-item label="姓名">
        <el-input v-model="user.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="user.phone" placeholder="11位手机号码" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="user.group" placeholder="请选择用户组">
          <template #empty>
            <el-empty description="暂无数据" :image-size="40" />
          </template>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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

<script setup lang="ts" name="User">
import { Ref } from 'vue'
import { addUser, getAllUser, deleteUser, updateUser } from '@/api/user'
import { deepClone } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getAllRole } from '@/api/role'

interface userGroup {
  value?: string
  label?: string
}

const router = useRouter()
let user: Ref<any> = ref({})
const dialogType = ref('new')
const dialogVisible = ref(false)
const options: userGroup[] = []
const tableData: any = ref(null)

onMounted(async () => {
  tableData.value = await getAllUser()
  const data = await getAllRole()
  data.forEach(item => {
    options.push({
      value: item.display_name,
      label: item.display_name
    })
  })
})

const handleEdit = (score: any) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  user.value = deepClone(score.row)
}

const handleDelete = (score: any) => {
  ElMessageBox.confirm('确定删除该用户权限？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteUser({ id: score.row.id })
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

const handleClose = (done: any) => done()

const handleAddUser = () => {
  user.value = {}
  dialogType.value = 'new'
  dialogVisible.value = true
}

const save = async () => {
  if (dialogType.value === 'new') {
    const data = await addUser(user.value)
    console.log(data)
  } else {
    const data = await updateUser(user.value)
    console.log(data)
  }
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
  router.go(0)
  dialogVisible.value = false
}
</script>
