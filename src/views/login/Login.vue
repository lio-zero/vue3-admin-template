<template>
  <div>
    <Dark class="absolute top-4 right-4" />
  </div>
  <div class="login flex justify-center items-center h-screen">
    <el-card class="w-380px">
      <el-form
        ref="loginForm"
        label-width="60px"
        :model="model"
        :rules="rules"
        label-position="top"
      >
        <p class="font-bold mb-2">你好!</p>
        <p class="color-808080 text-13px mb-1">请登录您的帐户</p>

        <el-form-item label="用户名">
          <el-input v-model="model.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="model.password" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button class="btn-half">
            <el-checkbox v-model="model.rememberMe"> 记住我 </el-checkbox>
          </el-button>
          <el-button
            class="btn-half"
            type="primary"
            icon="Lock"
            :loading="loading"
            @click="loginBtn"
          >
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
import { Dark } from '@/components/Dark'
import { validUsername } from '@/utils/validate'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { model } from './data'

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
// const forgetPass = ref(true)
const loginForm = ref<Nullable<HTMLElement>>(null)
const router = useRouter()
const userStore = useUserStore()

const rules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const loginBtn = () => {
  loginForm.value.validate(async (valid: any) => {
    if (valid) {
      await userStore.login(model)
      ElMessage.success('登录成功')
      router.push({ path: '/' })
    } else {
      ElMessage.error('账号密码错误')
    }
  })
}
</script>

<style lang="scss" scoped>
.btn-half {
  width: 48%;
}
</style>
