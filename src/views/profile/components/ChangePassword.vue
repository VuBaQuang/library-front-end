<template>
  <el-dialog
    title="Đổi mật khẩu"
    :visible.sync="visibleDialog"
    width="30%"
    :before-close="handleClose"
  >
    <el-form style="margin-right: 20px" label-width="30px" :model="changePasswordForm" :rules="changePasswordRules">
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="changePasswordForm.oldPassword"
          name="password"
          maxlength="200"
          type="password"
          prefix-icon="el-icon-unlock"
          :placeholder="$t('login.oldPassword')"
        />
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input
          ref="newPassword"
          v-model="changePasswordForm.newPassword"
          name="newPassword"
          maxlength="200"
          type="password"
          prefix-icon="el-icon-unlock"
          :placeholder="$t('login.newPassword')"
        />
      </el-form-item>
      <el-form-item prop="confirmNewPassword">
        <el-input
          ref="confirmNewPassword"
          v-model="changePasswordForm.confirmNewPassword"
          type="password"
          maxlength="200"
          prefix-icon="el-icon-unlock"
          :placeholder="$t('login.confirmNewPassword')"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Hủy</el-button>
      <el-button type="primary" @click="handleChange">Đổi mật khẩu</el-button>
    </span>
  </el-dialog>

</template>

<script>

import { validPassword } from '@/utils/regex'
import { mapGetters } from 'vuex'

export default {
  name: 'ChangePassword',
  props: {
    dialogChangePasswordVisible: {
      type: Boolean,
      required: false
    }
  },
  data: function() {
    const validateNewPassword = (rule, value, callback) => {
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
        callback(new Error(this.$t('valid_confirmPassword')))
      }
      if ((value.trim() !== this.changePasswordForm.newPassword)) {
        callback(new Error(this.$t('valid_confirmPassword')))
      } else {
        callback()
      }
    }
    return {
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      changePasswordRules: {
        newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }],
        confirmNewPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      }
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogChangePasswordVisible
      },
      set(value) {
        return value
      }
    },
    ...mapGetters([
      'name',
      'username',
      'avatar',
      'roles'
    ])
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
    handleChange() {
      var body = { username: this.username, password: this.changePasswordForm.oldPassword, newPassword: this.changePasswordForm.newPassword }
      this.$store.dispatch('user/changePassword', body).then((data) => {
        // console.log(data)
        if (data.message === 'Password invalid') {
          this.$message.error('Mật khẩu cũ không chính xác')
          // this.$notify.error('')
        } else {
          this.$router.push({ path: `/login` })
        }

        // this.loading = false
      })
        .catch(() => {
          this.loading = false
        })
    },
    handleClose() {
      this.$emit('handleClose', false)
    }

  }
}
</script>
