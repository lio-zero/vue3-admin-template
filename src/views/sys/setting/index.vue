<template>
  <div class="flex justify-center mt-20">
    <el-card class="w-380px">
      <template #header>
        <p>个人信息</p>
      </template>
      <el-form
        :label-position="labelPosition"
        label-width="60px"
        :model="ruleForm"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item label="姓名">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteHandler">删除</el-button>
          <el-button @click="saveForm">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '#/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { isPhone, isEmail } from '@/utils/is'

const userStore = useUserStore()
const labelPosition = ref('right')
const FormData = ref()
const ruleForm: UserInfo = reactive(userStore.getUserInfo)

const validEmail = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入邮箱'))
  } else if (!isEmail(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

const validPhone = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (value.toString().length < 10) {
    callback(new Error('手机号需要11位'))
  } else if (!isPhone(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

const validPass = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else {
    if (ruleForm.password.length < 6) {
      callback(new Error('密码不能少于6位'))
    }
    callback()
  }
}

const validConfirmPwd = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error('两个密码输入不匹配！'))
  } else {
    callback()
  }
}

const rules: object = reactive({
  email: [{ validator: validEmail, trigger: 'blur' }],
  phone: [{ validator: validPhone, trigger: 'blur' }],
  password: [{ validator: validPass, trigger: 'blur' }],
  confirmPwd: [{ validator: validConfirmPwd, trigger: 'blur' }]
})

const deleteHandler = () => {
  ElMessageBox.confirm('是否确认删除用户?', '温馨提示', {
    confirmButtonText: '确实',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

const saveForm = () => {
  FormData.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage({
        message: '保存成功',
        type: 'success'
      })
    } else {
      ElMessage.error('请输入正确的内容')
    }
  })
}
</script>
