<template>
  <div class="login-container center-vertical">
    <el-form
      ref="loginForm"
      class="card card-body bg-light"
      :model="model"
      :rules="rules"
      label-position="left"
    >
      <h2>你好!</h2>
      <h6>请登录您的帐户</h6>
      <div class="form-group">
        <label>用户名</label>
        <input id="user-tf" v-model="model.username" class="form-control" type="text" name="user" />
      </div>
      <div class="form-group">
        <label>密码</label>
        <input
          id="pass-tf"
          v-model="model.password"
          class="form-control"
          type="password"
          name="pass"
        />
      </div>
      <div id="row1">
        <div id="btn_remember" class="btn btn-light btn-left" type="button">
          <el-checkbox v-model="model.rememberMe"> 记住我 </el-checkbox>
        </div>
        <div id="btn_sign_in" class="btn btn-primary" :loading="loading" @click="loginBtn">
          <span class="fa fa-lock"></span>登录
        </div>
      </div>
      <hr />
      <div class="btm-links">
        <div id="forgot-password">
          <router-link to="/login">忘记密码了？</router-link>
        </div>
        <div id="create-account">
          <router-link to="/signup">创建一个帐户</router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="Login">
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
const loginForm = ref(null)
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
@import '@/styles/login.scss';
</style>
