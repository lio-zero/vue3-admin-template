<template>
  <el-button type="primary" @click="handleAddRole">新增角色</el-button>
  <el-table :data="tableData" border style="width: 100%; margin-top: 30px">
    <el-table-column align="center" prop="id" label="id" width="220">
    </el-table-column>
    <el-table-column align="center" prop="name" label="角色" width="220">
    </el-table-column>
    <el-table-column align="center" prop="description" label="描述">
    </el-table-column>
    <el-table-column align="center" label="操作" width="220">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope)"
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
      <el-form-item label="角色">
        <el-input v-model="role.name" placeholder="角色" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="role.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="角色描述"
        />
      </el-form-item>
      <el-form-item label="菜单">
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
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { routes } from '@/router'
import { resolve } from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'
import { deepClone } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'

const defaultRole = {
  id: '',
  name: '',
  description: '',
  routes: []
}
const dialogType = ref('new')
const dialogVisible = ref(false)
const tree = ref()
const checkStrictly = ref(false)
const role = ref(Object.assign({}, defaultRole))
const defaultProps = reactive({
  children: 'children',
  label: 'title'
})
const tableData = reactive([
  {
    id: 1,
    name: 'editor',
    description: '普通编辑。可以查看除权限页以外的所有页面'
  },
  {
    id: 2,
    name: 'admin',
    description: '超级管理员。有权查看所有页面'
  },
  {
    id: 3,
    name: 'visitor',
    description: '只是个访客。只能看到主页和文档页'
  }
])

const onlyOneShowingChild = (
  children: RouteRecordRaw[] = [],
  parent: RouteRecordRaw
) => {
  let onlyOneChild = null
  const showingChildren = children.filter(item => !item.hidden)
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

const handleDelete = (index: any, row: any) => {
  ElMessageBox.confirm('确定删除该用户权限？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
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
</script>

<style scoped></style>
