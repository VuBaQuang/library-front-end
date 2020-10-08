<template>
  <el-dialog
    class="dialog-register"
    :title="$t('register')"
    :visible.sync="visibleDialog"
    width="600px"
    center
    @close="handleClose"
  >
    <el-form ref="registerForm" style="" label-width="30px" :model="registerForm" :rules="registerRules">
      <el-form-item prop="username" :class="{'is-error':!isCheckName}">
        <el-input ref="username" v-model="registerForm.username" name="username" maxlength="32" prefix-icon="el-icon-user-solid" :placeholder="$t('login.username')" @input="checkName" />
        <div v-if="!isCheckName" class="el-form-item__error">
          {{ error.username }}
        </div>
      </el-form-item>
      <el-form-item prop="email">
        <el-input ref="email" v-model="registerForm.email" maxlength="200" prefix-icon="el-icon-message" :placeholder="$t('login.email')" @input="checkEmail" />
        <div v-if="!isCheckEmail" class="el-form-item__error">
          {{ error.email }}
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <el-input ref="password" v-model="registerForm.password" name="password" maxlength="200" type="password" prefix-icon="el-icon-unlock" :placeholder="$t('login.password')" />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input ref="password" v-model="registerForm.confirmPassword" type="password" maxlength="200" prefix-icon="el-icon-unlock" :placeholder="$t('login.confirmPassword')" />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input ref="phone" v-model="registerForm.phone" maxlength="15" prefix-icon="el-icon-phone" :placeholder="$t('login.phone')" @keypress.native="isNumber($event)" />
      </el-form-item>
      <el-form-item>
        <el-input ref="address" v-model="registerForm.address" maxlength="200" prefix-icon="el-icon-location-information" :placeholder="$t('login.address')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleRegister()">{{ $t('register') }}</el-button>
      <el-button type="danger" @click="handleClose">{{ $t('permission.cancel') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { validUsername, validPassword, validEmail, validPhone } from '@/utils/regex'

export default {
  name: 'RegisterDialog',
  props: {
    dialogRegisterVisible: {
      type: Boolean,
      required: false
    }
  },
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_username')))
      } else if (!validUsername(value.trim())) {
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
    const validateConfirmPassword = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_confirmPassword')))
      }
      if ((value.trim() !== this.registerForm.password)) {
        callback(new Error(this.$t('valid_confirmPassword')))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_email')))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('valid_email')))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_phone')))
      }
      if (!validPhone(value)) {
        callback(new Error(this.$t('valid_phone')))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        phone: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }],
        email: [{ required: true, trigger: 'change', validator: validateEmail }],
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        confirmPassword: [{ required: true, trigger: 'change', validator: validateConfirmPassword }]
      },
      error: {
        username: '',
        email: ''
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      timeoutName: null,
      timeoutEmail: null,
      isCheckName: true,
      isCheckEmail: true
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogRegisterVisible
      },
      set(value) {
        return value
      }
    }
  },

  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // if (this.registerForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.registerForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },

  methods: {
    checkName() {
      clearTimeout(this.timeoutName)
      this.timeoutName = setTimeout(() => {
        this.$store.dispatch('user/checkExist', { username: this.registerForm.username }).then(data => {
          if (data.data.status === 'EXIST') {
            this.isCheckName = false
            this.error.username = data.data.message
          }
          if (data.data.status === 'NOT_EXIST') { this.isCheckName = true }
        }).catch(e => {
          console.log(e)
        })
      }, 500)
    },
    checkEmail() {
      clearTimeout(this.timeoutEmail)
      this.timeoutEmail = setTimeout(() => {
        this.$store.dispatch('user/checkExist', { email: this.registerForm.email }).then(data => {
          if (data.data.status === 'EXIST') {
            this.isCheckEmail = false
            this.error.email = data.data.message
          }
          if (data.data.status === 'NOT_EXIST') { this.isCheckEmail = true }
        }).catch(e => {
          console.log(e)
        })
      }, 500)
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which || evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    handleClose() {
      this.$emit('handleClose', false)
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid && this.isCheckName && this.isCheckEmail) {
          this.$store.dispatch('user/register', this.registerForm).then(() => {
            this.$emit('handleClose', false)
          }).catch(e => {
            console.log(e)
          })
        }
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
    }

  }
}
</script>
