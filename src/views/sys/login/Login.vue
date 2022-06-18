<template>
  <div>
    <Dark class="absolute top-4 right-4" />
  </div>
  <div class="flex items-center justify-center h-screen login">
    <el-card class="w-380px">
      <el-form
        ref="loginForm"
        label-width="60px"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <p class="mb-2 font-bold">你好!</p>
        <p class="mb-1 color-808080 text-13px">请登录您的帐户</p>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button class="btn-half">
            <el-checkbox v-model="formData.rememberMe"> 记住我 </el-checkbox>
          </el-button>
          <el-button class="btn-half" type="primary" icon="Lock" :loading="loading" @click="login">
            登录
          </el-button>
        </el-form-item>

        <el-divider />
        <div class="flex justify-around mt-1 text-13px">
          <router-link class="forgot-password" to="/login">忘记密码了？</router-link>
          <router-link class="create-account" to="/signup">创建一个帐户</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="Login">
import type { FormRules, FormInstance } from 'element-plus'
import { validUsername } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { formData } from './data'

const validateUsername = (_rule: any, value: string, callback: any) => {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}

const validatePassword = (_rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}

const loading = ref(false)
const loginForm = ref<HTMLFormElement | null>(null)
const router = useRouter()
const userStore = useUserStore()

const rules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const login = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, _fields) => {
    if (valid) {
      await userStore.login(formData)
      ElMessage.success('登录成功')
      router.push({ path: '/' })
    } else {
      ElMessage.error('用户名、密码错误')
    }
  })
}
</script>

<style lang="scss" scoped>
.btn-half {
  width: 48%;
}
</style>
