<template>
  <el-dialog
    class="dialog-register"
    :title="$t('register')"
    :visible.sync="visibleDialog"
    width="600px"
    center
    @close="handleClose"
  >
    <el-form style="" label-width="30px" :model="registerForm">
      <el-form-item>
        <el-input ref="username" v-model="registerForm.username" prefix-icon="el-icon-user-solid" :placeholder="$t('login.username')" />
      </el-form-item>
      <el-form-item>
        <el-input ref="username" v-model="registerForm.email" prefix-icon="el-icon-message" :placeholder="$t('login.email')" />
      </el-form-item>
      <el-form-item>
        <el-input ref="password" v-model="registerForm.password" prefix-icon="el-icon-unlock" :placeholder="$t('login.password')" />
      </el-form-item>
      <el-form-item>
        <el-input ref="password" v-model="registerForm.confirmPassword" prefix-icon="el-icon-unlock" :placeholder="$t('login.confirmPassword')" />
      </el-form-item>
      <el-form-item>
        <el-input ref="username" v-model="registerForm.phone" prefix-icon="el-icon-phone" :placeholder="$t('login.phone')" @keypress.native="isNumber($event)" />
      </el-form-item>
      <el-form-item>
        <el-input ref="username" v-model="registerForm.address" prefix-icon="el-icon-location-information" :placeholder="$t('login.address')" />
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
      if (!validUsername(value)) {
        callback(new Error(this.$t('required_username')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_password')))
      }
      if (value.length < 8) {
        callback(new Error(this.$t('valid_password')))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: ''
      },
      registerRules: {
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
