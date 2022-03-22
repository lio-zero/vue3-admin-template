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
        <input
          id="user-tf"
          v-model="model.username"
          class="form-control"
          type="text"
          name="user"
        />
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
        <div
          id="btn_sign_in"
          class="btn btn-primary"
          :loading="loading"
          @click="loginBtn"
        >
          <span class="fa fa-lock"></span>登录
        </div>
      </div>
      <hr />
      <div class="btm-links">
        <div id="forgot-password">
          <router-link to="/login" @click="forgetPass = false"
            >忘记密码了？</router-link
          >
        </div>
        <div id="create-account">
          <router-link to="/signup">创建一个帐户</router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="Login">
import { Ref } from 'vue'
import { validUsername } from '@/utils/validate.ts'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { User } from '@/types/Login.ts'

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}

const model: User = reactive({
  username: 'lio',
  password: '123456',
  rememberMe: false
})

const store = useStore()
const loading: Ref<boolean> = ref(false)
const forgetPass: Ref<boolean> = ref(true)
const loginForm: any = ref(null)
const router = useRouter()

const rules: any = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const loginBtn = () => {
  loginForm.value.validate(async (valid: any) => {
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
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-image: radial-gradient(
    circle,
    #f2f9fe,
    #ebf7fe,
    #e5f4fe,
    #ddf2fe,
    #d6f0fd
  );
}
h2 {
  margin: 0 0 6px 0;
  font-weight: bold;
}
hr {
  margin: 14px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #fff;
}
ul {
  margin: 4px 0 0 0;
}
label,
h6 {
  color: #808080;
  font-size: 13px;
  font-weight: normal;
  text-shadow: -1px 1px 0 #fff;
}
/*
	login window
*/
.login-container {
  width: 380px;
}
.login-container .btn {
  float: left;
  width: 48%;
  font-size: 0.8rem;
}
.login-container .btn-btm {
  padding: 0;
}
.login-container .btn-left {
  margin-right: 4%;
}
.login-container #btn_sign_in {
  color: #fff;
}

.login-container #btn_remember {
  background: #fff;
  border: 1px solid #ced4da;
}
.login-container #btn_remember:hover {
  background: #f8f9fa;
}
.login-container h6,
.login-container label {
  font-size: 0.8rem;
}
.login-container h6,
.login-container label,
.login-container #btn_remember {
  color: #808080;
  text-shadow: -1px 1px 0 #fff;
}
.login-container .fa {
  padding-right: 10px;
}
.login-container hr {
  clear: left;
}
.login-container .btm-links {
  font-size: 0.8rem;
  margin: 2px 0 0 0;
}
.login-container .btm-links #forgot-password {
  float: left;
  margin-left: 16px;
}
.login-container .btm-links #create-account {
  float: right;
  margin-right: 20px;
}
#account-form-container label {
  text-align: right;
  margin-top: 2px;
}
#account-form-container input,
#account-form-container select {
  font-size: 0.875rem;
}
#account-form-container .col-sm-9 {
  padding-left: 0;
}
#account-form-container .margin-zero {
  margin-bottom: 0;
}
#account-form-container .form-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#account-form-container .form-buttons > :not(:last-child) {
  margin-right: 0.5rem;
}
/*
	modal windows
*/
.modal .modal-dialog {
  width: 480px;
}
.modal .form-group {
  margin-bottom: 0px;
}
.modal .alert {
  margin-top: 10px;
  margin-bottom: 0;
  padding: 8px 15px 8px 15px;
}
.modal .alert-dismissable,
.modal .close {
  right: -4px;
}
.modal p {
  margin: 0;
  padding: 0;
}
.modal .modal-footer button {
  width: 80px;
}
.center-vertical {
  top: 50%;
  left: 50%;
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.el-checkbox {
  height: 0;
}
// .btn {
//   height: 36px;
// }
</style>
