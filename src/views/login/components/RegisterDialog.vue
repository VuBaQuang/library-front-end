<template>
  <el-dialog
    class="dialog-register"
    :title="$t('register')"
    :visible.sync="visibleDialog"
    width="600px"
    center
    @close="handleClose"
  >
    <el-form style="" label-width="30px" :model="registerForm" :rules="registerRules">
      <el-form-item prop="username">
        <el-input ref="username" v-model="registerForm.username" maxlength="32" prefix-icon="el-icon-user-solid" :placeholder="$t('login.username')" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input ref="email" v-model="registerForm.email" maxlength="200" prefix-icon="el-icon-message" :placeholder="$t('login.email')" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input ref="password" v-model="registerForm.password" maxlength="200" type="password" prefix-icon="el-icon-unlock" :placeholder="$t('login.password')" />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input ref="password" v-model="registerForm.confirmPassword" maxlength="200" prefix-icon="el-icon-unlock" :placeholder="$t('login.confirmPassword')" />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input ref="phone" v-model="registerForm.phone" maxlength="15" prefix-icon="el-icon-phone" :placeholder="$t('login.phone')" @keypress.native="isNumber($event)" />
      </el-form-item>
      <el-form-item>
        <el-input ref="address" v-model="registerForm.address" maxlength="200" prefix-icon="el-icon-location-information" :placeholder="$t('login.address')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="centerDialogVisible = false">{{ $t('permission.cancel') }}</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">{{ $t('register') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { validPassword, validEmail, validPhone } from '@/utils/regex'

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
        confirmPassword: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
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
