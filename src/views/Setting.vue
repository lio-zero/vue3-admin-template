<template>
  <div class="setting-container">
    <el-form
      status-icon
      ref="FormData"
      class="demo-ruleForm"
      label-width="120px"
      :model="ruleForm"
      :rules="rules"
      :label-position="labelPosition"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.number="ruleForm.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPwd">
        <el-input v-model="ruleForm.comfirmPwd" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
// import { validatePass, validateComfirmPass } from '@/utils/validate'

const store = useStore()
const userInfo = ref(store.state.user_info)
userInfo.value.comfirmPwd = userInfo.value.password
const labelPosition: Ref<string> = ref('right')
const FormData: Ref<null> = ref(null)
const ruleForm: object = reactive(userInfo)
const emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/

const validEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请重新输入邮箱'))
  } else if (!emailReg.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

const validPhone = (rule, value, callback) => {
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

const validPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else {
    if (ruleForm.password.length < 6) {
      callback(new Error('密码不能少于6位'))
    }
    callback()
  }
}

const validComfirmPwd = (rule, value, callback) => {
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
  comfirmPwd: [{ validator: validComfirmPwd, trigger: 'blur' }]
})

const saveForm = formName => {
  FormData.value.validate(valid => {
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

const resetForm = formName => FormData.value.resetFields()
</script>

<style scoped lang="scss">
.setting-container {
  margin: auto;
  max-width: 400px;
  height: 100%;
}
</style>
