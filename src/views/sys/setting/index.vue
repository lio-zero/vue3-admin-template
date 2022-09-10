<script setup lang="ts" name="Setting">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { isEmail } from '@/utils/is'

const userStore = useUserStore()
const labelPosition = ref('right')
const ruleFormRef = ref()
const ruleForm = reactive(userStore.getUserInfo)

const validEmail = (_rule: any, value: string, callback: any) => {
  if (value === '')
    callback(new Error('请重新输入邮箱'))
  else if (!isEmail(value))
    callback(new Error('请输入正确的邮箱'))
  else
    callback()
}

const validRealName = (_rule: any, value: string, callback: any) => {
  if (value === '')
    callback(new Error('请输入真实姓名'))
  else
    callback()
}

const validUsername = (_rule: any, value: string, callback: any) => {
  if (value === '')
    callback(new Error('请输入用户名'))
  else
    callback()
}

const validPass = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  }
  else {
    if (ruleForm.password.length < 6)
      callback(new Error('密码不能少于6位'))

    callback()
  }
}

const rules = reactive<FormRules>({
  realName: [{ validator: validRealName, trigger: 'blur' }],
  email: [{ validator: validEmail, trigger: 'blur' }],
  username: [{ validator: validUsername, trigger: 'blur' }],
  password: [{ validator: validPass, trigger: 'blur' }],
})

const deleteHandler = () => {
  ElMessageBox.confirm('是否确认删除用户?', '温馨提示', {
    confirmButtonText: '确实',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

const saveForm = async (formEl: FormInstance) => {
  if (!formEl)
    return
  await formEl.validate((valid, _fields) => {
    if (valid) {
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
    }
    else {
      ElMessage.error('请输入正确的内容')
    }
  })
}
</script>

<template>
  <div class="flex justify-center mt-20">
    <el-card class="w-380px">
      <template #header>
        <p>个人信息</p>
      </template>
      <el-form
        ref="ruleFormRef"
        :label-position="labelPosition"
        label-width="60px"
        :model="ruleForm"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteHandler">
            删除
          </el-button>
          <el-button @click="saveForm(ruleFormRef)">
            更新
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
