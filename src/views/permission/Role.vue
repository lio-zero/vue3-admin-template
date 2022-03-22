<template>
  <el-button type="primary" @click="handleAddRole">新增角色</el-button>
  <el-table :data="tableData" border style="width: 100%; margin-top: 30px">
    <template #empty>
      <el-empty description="暂无数据"></el-empty>
    </template>
    <el-table-column
      align="center"
      prop="id"
      label="id"
      width="80"
    ></el-table-column>
    <el-table-column
      align="center"
      prop="name"
      label="姓名"
      width="220"
    ></el-table-column>
    <el-table-column
      align="center"
      prop="email"
      label="邮箱"
      width="220"
    ></el-table-column>
    <el-table-column align="center" prop="phone" label="手机"></el-table-column>
    <el-table-column
      align="center"
      prop="userGroup"
      label="用户组"
    ></el-table-column>
    <el-table-column align="center" prop="status" label="状态">
      <template #default="scope">
        <el-icon
          class="align-middle mr-2"
          :color="scope.row.status ? '#67C23A' : '#F56C6C'"
        >
          <circle-check-filled v-if="scope.row.status" />
          <circle-close-filled v-else />
        </el-icon>
        <span class="align-middle">{{
          scope.row.status ? '正常' : '禁用'
        }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="220">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogType === 'edit' ? '编辑角色' : '新增角色'"
    :before-close="handleClose"
  >
    <el-form :model="role" label-width="80px" label-position="left">
      <el-form-item label="用户组">
        <el-input v-model="role.name" placeholder="用户组" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="role.display_name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="role.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="描述"
        />
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          ref="tree"
          :data="pageList"
          :check-strictly="checkStrictly"
          :props="defaultProps"
          show-checkbox
          node-key="path"
        >
        </el-tree>
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

<script setup lang="ts" name="Role">
import { Ref } from 'vue'
import { addRole, getAllRole, deleteRole, updateRole } from '@/api/role'
import { routes } from '@/router'
import { resolve } from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'
import { deepClone } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'

type RoleType = {
  name?: string
  display_name?: string
  description?: string
}

const dialogType = ref('new')
const dialogVisible = ref(false)
const tree = ref()
const checkStrictly = ref(false)
const role: Ref<RoleType> = ref({})
const tableData: any = ref(null)
const defaultProps = reactive({
  children: 'children',
  label: 'title'
})

onMounted(async () => {
  tableData.value = await getAllRole()
})

const onlyOneShowingChild = (
  children: RouteRecordRaw[] = [],
  parent: RouteRecordRaw
) => {
  let onlyOneChild = null
  const showingChildren = children.filter((item: any) => !item.hidden)
  // 当只有一个路由时，默认情况下会显示该子路由
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    onlyOneChild.path = resolve(parent.path, onlyOneChild.path)
    return onlyOneChild
  }
  // 如果没有要显示的子路由，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '' }
    return onlyOneChild
  }
  return false
}

const generateRoutes = (routes: RouteRecordRaw[] = [], basePath = '/') => {
  const res: RouteRecordRaw[] = []
  for (let route of routes) {
    if (route.hidden) {
      continue
    }
    const onlyOneShowingChild2 = onlyOneShowingChild(route.children, route)

    if (route.children && onlyOneShowingChild2 && !route.alwaysShow) {
      route = onlyOneShowingChild2
    }

    const data: RouteRecordRaw = {
      path: resolve(basePath, route.path),
      title: route.meta && route.meta.title
    } as any as RouteRecordRaw
    // 递归子路由
    if (route.children) {
      data.children = generateRoutes(route.children, data.path)
    }
    res.push(data)
  }
  return res
}

const generateArr = routes => {
  let data = []
  routes.forEach((route: any) => {
    data.push(route)
    if (route.children) {
      const temp = generateArr(route.children)
      if (temp.length > 0) {
        data = [...data, ...temp]
      }
    }
  })
  return data
}

const handleEdit = (score: any) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  checkStrictly.value = true
  role.value = deepClone(score.row)
  nextTick(() => {
    const routes = generateRoutes(role.value.routes)
    tree.value.setCheckedNodes(generateArr(routes))
    // 设置节点的选中状态不影响其父节点和子节点
    checkStrictly.value = false
  })
}

const pageList = generateRoutes(routes)

const handleDelete = (score: any) => {
  ElMessageBox.confirm('确定删除该用户权限？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteRole({ id: score.row.id })
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

const handleAddRole = () => {
  if (tree.value) {
    tree.value.setCheckedNodes([])
  }

  dialogType.value = 'new'
  dialogVisible.value = true
}

const save = async () => {
  // console.log(role.value)
  // console.log(pageList)
  // return
  if (dialogType.value === 'new') {
    const data = await addRole(role.value)

    console.log(data)
  } else {
    const data = await updateRole(role.value)
    console.log(data)
  }
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
  dialogVisible.value = false
}
</script>

<style scoped></style>
