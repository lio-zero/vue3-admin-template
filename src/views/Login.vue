<template>
  <div class="login-container">
    <div class="login-item">
      <el-card v-if="forgetPass" header="请先登录">
        <el-form ref="loginForm" :model="model" :rules="rules" label-position="left">
          <el-form-item prop="username">
            <el-input v-model="model.username" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="model.password" type="password" prefix-icon="el-icon-lock" />
          </el-form-item>
          <el-form-item prop="username">
            <el-checkbox v-model="checked">记住我</el-checkbox>
            <el-button type="text" class="forgetPass" @click="forgetPass = false">
              忘记密码？
            </el-button>
          </el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 20px"
            :loading="loading"
            type="primary"
            @click="loginBtn"
          >
            登录
          </el-button>
        </el-form>
      </el-card>
      <el-card v-else header="请先登录">
        <el-form ref="loginForm" :model="model" :rules="rules" label-position="left">
          <el-form-item prop="username">
            <el-input v-model="model.username" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="model.username" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="model.password" type="password" prefix-icon="el-icon-lock" />
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-button @click="forgetPass = true"> 去登录 </el-button>
            </el-col>
            <el-col :span="16">
              <el-button
                style="width: 100%; margin-bottom: 20px"
                :loading="loading"
                type="primary"
                @click="login"
              >
                登录
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { validUsername } from '@/utils/validate.ts'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login, getUserInfo } from '@/api/login.ts'
import { useStore } from 'vuex'
import Cookies from 'js-cookie'

const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}

interface User {
  username: string
  password: string
}

const model: User = reactive({
  username: 'lio',
  password: '123456'
})

const store = useStore()
const redirect: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)
const checked: Ref<boolean> = ref(false)
const forgetPass: Ref<boolean> = ref(true)

const rules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const loginForm: Ref<null> = ref(null)
const router = useRouter()

const loginBtn = () => {
  loginForm.value.validate(async valid => {
    if (valid) {
      await store.dispatch('login', model)
      ElMessage.success('登录成功')
      router.push({ path: '/' })
    } else {
      ElMessage.error('账号密码错误')
    }
  })
}
</script>
<style lang="scss" scoped>
:v-deep(.el-input__inner) {
  padding: 20px 40px;
}
.login-container {
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  height: 100vh;
}

.login-item {
  margin: auto;
  width: 400px;
}

.forgetPass {
  float: right;
  color: #409eff;
}
</style>
