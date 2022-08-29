<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="loginName">
        <span class="el-icon-mobile-phone" />
        <el-input
          v-model="loginForm.loginName"
          placeholder="请输入账号"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="el-icon-lock" />
        <el-input
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <span class="el-icon-view" />
        <el-input
          v-model="loginForm.code"
          placeholder="请输入验证码"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <img
            slot="suffix"
            :src="imgURL"
            style="height: 47px; margin-right: -30px"
          >
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getImgCode } from '@/api/login'

export default {
  name: 'Login',
  data() {
    // 验证规则
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码格式错误！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: ''
      },
      loginRules: {
        loginName: [
          { required: true, trigger: 'blur', message: '请填写用户民！' },
          { min: 5, max: 16, trigger: 'blur', message: '用户名为4-10位' },
          { validate: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请填写密码！' },
          { min: 5, max: 16, trigger: 'blur', message: '用户名为4-10位' },
          { validate: validatePassword, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请填写验证码！' },
          { min: 4, max: 4, trigger: 'blur', message: '请输入四位验证码！' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 验证码图片链接
      imgURL: '',
      // 请求验证码Token
      clientToken: 0
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getImgCode()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // TODO: 登录按钮
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/loginForm', {
          ...this.loginForm,
          clientToken: this.clientToken,
          loginType: 0
        })
      } catch (error) {
        this.$message.error('登陆失败！')
        console.log(error)
      }
    },
    // 获取图片验证码
    async getImgCode() {
      this.clientToken = Math.random()
      const data = await getImgCode(this.clientToken)
      // 获取图片地址
      const blob = await new Blob([data], { type: 'image/png' })
      // console.log(blob)
      this.imgURL = URL.createObjectURL(blob)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #999;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('~@/assets/common/background.png');
  background-position: center top;
  background-size: cover;
  overflow: hidden;
  text-align: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0 35px 0;
    margin: 190px auto;
    background-color: #fff;
    border-radius: 10px;
    // overflow: hidden;
    display: inline-block;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      text-align: center;
      margin-top: -40px;
      img {
        width: 96px;
        height: 96px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
