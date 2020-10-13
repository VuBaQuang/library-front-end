<template>

  <div>
    <el-dialog
      class="header-center create-user"
      title="Thêm người dùng"
      :visible.sync="visibleDialog"
      width="600px"
      @close="handleCancel"
      @open="open"
    >
      <el-form ref="form" label-width="150px" label-position="left" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item prop="username" label="Tên đăng nhập" :class="{'is-error':!isCheckName}">
          <el-input ref="username" v-model="form.username" maxlength="100" placeholder="Tên đăng nhập" size="small" @input="checkName" />
          <div v-if="!isCheckName" class="el-form-item__error">
            {{ error.username }}
          </div>
        </el-form-item>
        <el-form-item prop="name" label="Họ và tên">
          <el-input ref="name" v-model="form.name" maxlength="100" placeholder="Họ và tên" size="small" />
        </el-form-item>
        <el-form-item prop="email" label="Email" :class="{'is-error':!isCheckEmail}">
          <el-input ref="email" v-model="form.email" maxlength="100" placeholder="Email" size="small" @input="checkEmail" />
          <div v-if="!isCheckEmail" class="el-form-item__error">
            {{ error.email }}
          </div>
        </el-form-item>
        <el-form-item prop="address" label="Địa chỉ">
          <el-input ref="email" v-model="form.address" maxlength="100" placeholder="Địa chỉ" size="small" />
        </el-form-item>
        <el-form-item prop="phone" label="Số điện thoại">
          <el-input ref="phone" v-model="form.phone" maxlength="20" placeholder="Số điện thoại" size="small" @keypress.native="isNumber()" />
        </el-form-item>
        <el-form-item size="small" prop="group" label="Nhóm">
          <el-select
            v-model="form.groupIds"
            multiple
            collapse-tags
            reserve-keyword
            size="small"
            placeholder="Chọn nhóm"
            @change="changeSelect"
          >
            <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" style="text-align: center">
        <el-button style="margin-right: 30px" icon="el-icon-upload" type="primary" size="small" @click="handleCreate">Lưu</el-button>
        <el-button size="small" @click="handleCancel">Hủy</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>

import { validUsername, validEmail, validPhone } from '@/utils/regex'
export default {
  props: {
    dialogCreateUserVisible: {
      type: Boolean,
      required: false
    }
  },
  data() {
    const validateVietnamese = (rule, value, callback) => {
      var regex = new RegExp('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạả ấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốýồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$')
      if (value.trim().length === 0) {
        callback()
      }
      if (!regex.test(value.trim())) {
        callback(new Error('Chỉ sử dụng kí tự a-z, A-Z, 0-9, tiếng Việt có dấu.'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error(this.$t('required_username')))
      } else if (!validUsername(value.trim())) {
        callback(new Error(this.$t('valid_username')))
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
      error: {
        username: '',
        email: ''
      },
      groups: [],
      group: [],
      g: [],
      isCheckName: true,
      isCheckEmail: true,
      isDecentralization: false,
      features: [],
      permissions: [],
      form: {
        username: '',
        name: '',
        email: '',
        address: '',
        groupIds: []
      },
      rules: {
        username: [
          { required: true, message: 'Bạn chưa nhập tên đăng nhập', trigger: 'change' },
          { validator: validateUsername, trigger: 'change' }],
        name: [
          { required: true, message: 'Bạn chưa nhập tên', trigger: 'change' },
          { validator: validateVietnamese, trigger: 'change' }],
        email: [
          { required: true, message: 'Bạn chưa nhập email', trigger: 'change' },
          { validator: validateEmail, trigger: 'change' }],
        phone: [
          { validator: validatePhone, trigger: 'change' }],
        address: [
          { validator: validateVietnamese, trigger: 'change' }]
      }
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogCreateUserVisible
      },
      set(value) {
        return value
      }
    }
  },
  watch: {

  },
  created() {
    this.fetchGroups()
  },

  methods: {
    checkName() {
      clearTimeout(this.timeoutName)
      this.timeoutName = setTimeout(() => {
        this.$store.dispatch('user/checkExist', { username: this.form.username }).then(data => {
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
        this.$store.dispatch('user/checkExist', { email: this.form.email }).then(data => {
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
    fetchGroups() {
      var body = { page: 1, size: 2147483647 }
      this.$store.dispatch('group/getAll', body).then(data => {
        this.groups = data.data.data.content
      }).catch(e => {
        console.log(e)
      })
    },
    changeSelect() {
    },
    isNumber(evt) {
      evt = evt || window.event; const charCode = evt.which || evt.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      } else { return true } return false
    },

    open() {
      this.$nextTick(() => {
        this.$refs.username.focus()
      })
    },
    handleCreate() {
      this.$refs['form'].validate((valid) => {
        if (valid && this.isCheckEmail && this.isCheckName) {
          this.$store.dispatch('user/saveOrUpdate', this.form).then(data => {
            this.checkEmail()
            this.checkName()
            this.handleCancel()
          }).catch(e => {
            console.log(e)
          })
        }
      })
    },
    handleCancel() {
      this.$emit('handleCancel', false)
      setTimeout(() => {
        this.$refs['form'].resetFields()
      }, 500)
    }
  }
}

</script>
<style scoped>
</style>
