<template>
  <!--  <div>-->
  <div class="login-container">
    <span class="set-language" style="position: fixed; top: 0; right: 0">
      <svg-icon
        style="cursor: pointer;margin-right: 5px;font-size:2.23rem"
        icon-class="flagVn"
        @click="handleSetLanguage('vi')"
      />
      <svg-icon
        style="cursor: pointer;font-size:2.23rem"
        icon-class="flagUs"
        @click="handleSetLanguage('en')"
      />
    </span>

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
    >
      <el-form-item>
        <div style="text-align: center" class="title-container">
          <h2 v-if="isLogin" style="color: #333333;font-weight: bold; font-size: 30px" class="title">
            {{ $t('login.title') }}
          </h2>
          <h2 v-if="confirmUserEmail || confirmViaEmail" style="color: #333333;font-weight: bold; font-size: 30px" class="title">
            Xác nhận thông tin
          </h2>
          <h2 v-if="isChangePassword" style="color: #333333;font-weight: bold; font-size: 30px" class="title">
            Thiết lập mật khẩu mới
          </h2>
          <el-col><img class="avatar-container-login" src="@/assets/logo.jpg" alt=""></el-col>
        </div>
      </el-form-item>
      <el-form-item v-if="confirmViaEmail" prop="codeMail">
        <el-input
          id="code-mail"
          ref="codeMail"
          v-model="loginForm.email"
          prefix-icon="el-icon-key"
          size="small"
          placeholder="Mã xác nhận nhận từ mail"
          name="codeMail"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item v-if="confirmUserEmail || isLogin" prop="username">
        <el-input
          id="username"
          ref="username"
          v-model="loginForm.username"
          prefix-icon="el-icon-user-solid"
          size="small"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item v-if="confirmUserEmail" prop="email">
        <el-input
          id="email"
          ref="email"
          v-model="loginForm.email"
          prefix-icon="el-icon-message"
          size="small"
          placeholder="Email đã liên kết với tài khoản"
          name="email"
          type="text"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item v-if="isLogin || isChangePassword" prop="password">
          <el-input
            id="password"
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-unlock"
            size="small"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >
            <span slot="suffix" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-input>
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item v-if="isChangePassword" prop="confirmPassword">
          <el-input ref="confirmPassword" v-model="loginForm.confirmPassword" size="small" type="password" maxlength="200" prefix-icon="el-icon-unlock" :placeholder="$t('login.confirmPassword')" />
        </el-form-item>
      </el-tooltip>

      <el-row :gutter="40">
        <el-col v-if="isChangePassword" style="text-align: center" :span="12">
          <el-button
            type="primary"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="handleCreateNewPassword"
          >
            Thiết lập
          </el-button>
        </el-col>
        <el-col v-if="isChangePassword" style="text-align: center" :span="12">
          <el-button
            type="danger"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="toLogin"
          >
            Huỷ bỏ
          </el-button>
        </el-col>
        <!--        confirmViaEmail start-->
        <el-col v-if="confirmViaEmail" :span="12">
          <el-button
            :loading="loading"
            type="primary"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="toChangePassword"
          >
            Xác nhận
          </el-button>
        </el-col>
        <el-col v-if="confirmViaEmail" :span="12">
          <el-button
            size="small"
            style="width:100%;margin-bottom:15px;"
            type="success"
            :disabled="counting"
            @click="sendMailAgain"
          >
            <countdown v-if="counting" :time="60000" @end="handleCountdownEnd">
              <template slot-scope="props">Gửi lại mail sau {{ props.totalSeconds }}s</template>
            </countdown>
            <span v-else>Gửi lại mail</span>
          </el-button>
        </el-col>
        <!--        confirmViaEmail end-->
        <!--        confirmUserEmail start-->
        <el-col v-if="confirmUserEmail" style="text-align: center" :span="12">
          <el-button
            :loading="loading"
            type="primary"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="toConfirmViaEmail"
          >
            Tiếp tục
          </el-button>
        </el-col>
        <el-col v-if="confirmUserEmail" style="text-align: center" :span="12">
          <el-button
            :loading="loading"
            type="info"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="toLogin"
          >
            Quay lại
          </el-button>
        </el-col>
        <!--        confirmUserEmail end-->
        <!--       login start-->
        <el-col v-if="isLogin" :span="12">
          <el-button
            :loading="loading"
            type="primary"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="handleLogin"
          >
            {{ $t('login.logIn') }}
          </el-button>
        </el-col>
        <el-col v-if="isLogin" :span="12">
          <el-button
            :loading="loading"
            type="success"
            size="small"
            style="width:100%;margin-bottom:15px;"
            @click.native.prevent="handleRegister"
          >
            {{ $t('register') }}
          </el-button>
        </el-col>
        <el-col v-if="isLogin" align="center" @click.native="toConfirmUserEmail"><span
          class="forgot-password"
          style="font-size: 13px; color:#409EFF; cursor: pointer"
        >{{
          $t('login.forgetPassword')
        }} ?</span></el-col>
        <!--       login end-->
      </el-row>
    </el-form>

    <register-dialog :dialog-register-visible="dialogRegisterVisible" @handleClose="dialogRegisterVisible=$event" />
    <div class="footer"><p class="copyright">&copy; Copyright 2020 Vũ Bá Quang - Học viện Kỹ thuật mật mã</p></div>
  </div>

  <!--  </div>-->

</template>

<script>
import { validUsername, validPassword } from '@/utils/regex'
import RegisterDialog from '@/views/login/components/RegisterDialog'

export default {
  name: 'Login',
  components: {
    RegisterDialog
  },
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_username')))
      }
      if (!validUsername(value.trim())) {
        callback(new Error(this.$t('valid_username')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_password')))
      }
      if (!validPassword(value.trim())) {
        callback(new Error(this.$t('valid_password')))
      } else {
        callback()
      }
    }
    return {
      isLogin: true,
      confirmUserEmail: false,
      confirmViaEmail: false,
      isChangePassword: false,
      counting: false,
      dialogRegisterVisible: false,
      loginForm: {
        username: '',
        password: '',
        email: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    toLogin() {
      this.$refs['loginForm'].resetFields()
      this.isLogin = true
      this.confirmUserEmail = false
      this.isChangePassword = false
      this.confirmViaEmail = false
    },
    toConfirmUserEmail() {
      this.$refs['loginForm'].resetFields()
      this.isLogin = false
      this.confirmUserEmail = true
      this.isChangePassword = false
      this.confirmViaEmail = false
    },
    toConfirmViaEmail() {
      this.$store.dispatch('user/confirmUserEmail', { username: this.loginForm.username, email: this.loginForm.email }).then(data => {
        // console.log(data)
        // this.$refs['loginForm'].resetFields()
        this.isLogin = false
        this.confirmUserEmail = false
        this.isChangePassword = false
        this.confirmViaEmail = true
      }).catch(e => {
        console.log(e)
      })
    },
    toChangePassword() {
      this.$refs['loginForm'].resetFields()
      this.isLogin = false
      this.confirmUserEmail = false
      this.isChangePassword = true
      this.confirmViaEmail = false
    },
    handleCreateNewPassword() {
      console.log('Tạo mật khẩu')
    },
    sendMailAgain() {
      this.counting = true
      this.$store.dispatch('user/sendEmailAgain', { username: this.loginForm.username, email: this.loginForm.email }).then(data => {
        console.log(data)
      }).catch(e => {
        console.log(e)
      })
    },
    handleCountdownEnd() {
      this.counting = false
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleRegister() {
      this.dialogRegisterVisible = true
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: this.$t('switch_language_success'),
        type: 'success'
      })
    },
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
.forgot-password:hover {
  text-decoration: underline;
}

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  display: block;
  padding-top: 5%;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 35px;
    background: #fff;
    border-radius: 7px;
    box-shadow: 0px 4px 16px rgba(43, 46, 53, 0.1);
  }
}

.avatar-container-login {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  //background-color: #333333;
}

p.copyright {
  position: absolute;
  width: 100%;
  font-size: 0.7em;
  text-align: center;
  bottom: 0;
}
</style>

