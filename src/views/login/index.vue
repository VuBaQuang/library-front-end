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
    <el-col><img src="" alt=""></el-col>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
    >
      <div style="text-align: center" class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
      </div>
      <el-form-item prop="username">
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
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
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
      <el-row :gutter="40">
        <el-col :span="12">
          <el-button
            :loading="loading"
            type="primary"
            size="small"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >
            {{ $t('login.logIn') }}
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            :loading="loading"
            type="success"
            size="small"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleRegister"
          >
            {{ $t('register') }}
          </el-button>
        </el-col>
        <el-col align="center"><span class="forgot-password" style="font-size: 13px; color:#409EFF; cursor: pointer">{{ $t('login.forgetPassword') }} ?</span>
        </el-col>
      </el-row>
    </el-form>

    <register-dialog :dialog-register-visible="dialogRegisterVisible" @handleClose="dialogRegisterVisible=$event" />

  </div>

  <!--  </div>-->

</template>

<script>
import { validUsername, validPassword } from '@/utils/regex'
import RegisterDialog from '@/views/login/components/RegisterDialog'
// import axios from 'axios'
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
      dialogRegisterVisible: false,
      loginForm: {
        username: '',
        password: ''
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
</style>

