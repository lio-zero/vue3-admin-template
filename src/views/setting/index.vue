<template>
  <div class="setting-container">
    <div class="center-vertical" id="account-form-container">
      <el-form
        ref="FormData"
        status-icon
        class="demo-ruleForm card card-body bg-light"
        id="account-form"
        label-width="120px"
        :model="ruleForm"
        :rules="rules"
        :label-position="labelPosition"
      >
        <h6>个人信息</h6>
        <hr />
        <div class="form-group row">
          <label class="col-sm-3 col-form-label col-form-label-sm">姓名</label>
          <div class="col-sm-9">
            <input class="form-control" type="text" name="name" v-model="ruleForm.name" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label col-form-label-sm">邮箱</label>
          <div class="col-sm-9">
            <input class="form-control" type="email" name="email" v-model="ruleForm.email" />
          </div>
        </div>
        <hr />
        <div class="form-group row">
          <label class="col-sm-3 col-form-label col-form-label-sm">用户名</label>
          <div class="col-sm-9">
            <input
              class="form-control disabled"
              type="text"
              name="user"
              v-model="ruleForm.username"
            />
          </div>
        </div>
        <div class="form-group row margin-zero">
          <label class="col-sm-3 col-form-label col-form-label-sm">密码</label>
          <div class="col-sm-9">
            <input class="form-control" type="password" name="pass" v-model="ruleForm.password" />
          </div>
        </div>
        <hr />
        <div class="form-buttons">
          <div class="btn btn-outline-dark" id="account-form-btn1">删除</div>
          <div class="btn btn-primary" id="account-form-btn2" @click="saveForm">更新</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '#/store'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
// import { validatePass, validateComfirmPass } from '@/utils/validate'

const userStore = useUserStore()

const labelPosition = ref('right')
const FormData = ref()
const ruleForm: UserInfo = reactive(userStore.getUserInfo)
// const emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
const emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/

const validEmail = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请重新输入邮箱'))
  } else if (!emailReg.test(value)) {
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
  } else if (!phoneReg.test(value)) {
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

<style scoped lang="scss">
@import '@/styles/login.scss';
.center-vertical {
  width: 440px;
}
</style>
