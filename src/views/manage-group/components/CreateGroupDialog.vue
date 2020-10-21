<template>

  <div>
    <el-dialog
      class="header-center"
      title="Bạn muốn đặt tên nhóm là gì?"
      :visible.sync="visibleDialog"
      width="30%"
      @close="handleCancel"
      @open="open"
    >
      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
        <div style="margin-bottom: 10px">
          <span style="font-weight: bold">Tên nhóm</span>
          <span style="float: right">{{ form.name.length }}/100</span>
        </div>

        <el-form-item prop="name">
          <el-input ref="name" v-model="form.name" maxlength="100" @keyup.enter.native="handleCreate" />
        </el-form-item>

        <div style="margin-bottom: 10px">
          <span style="font-weight: bold">Mã nhóm</span>
          <span style="float: right">{{ form.code.length }}/100</span>
        </div>

        <el-form-item prop="code">
          <el-input ref="code" v-model="form.code" maxlength="100" @keyup.enter.native="handleCreate" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">

        <el-divider class="my-1" />
        <div>
          <el-button :loading="loadingBt" type="primary" size="mini" @click="handleCreate">Lưu</el-button>
          <el-button class="button_text" type="text" size="small" @click="handleCancel">Hủy</el-button>
        </div>

      </span>
    </el-dialog>
  </div>

</template>
<script>

export default {
  props: {
    dialogCreateVisible: {
      type: Boolean,
      required: false
    }

  },
  data() {
    const validateName = (rule, value, callback) => {
      var regex = new RegExp('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưạả ấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốýồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$')
      if (!regex.test(value.trim())) {
        callback(new Error('Chỉ sử dụng kí tự a-z, A-Z, 0-9, tiếng Việt có dấu.'))
      } else {
        callback()
      }
    }
    return {
      loadingBt: false,
      form: {
        name: '',
        code: ''
      },
      rules: {
        name: [
          { required: true, message: 'Bạn chưa nhập tên', trigger: 'change' },
          { validator: validateName, trigger: 'change' }],
        code: [
          { required: true, message: 'Bạn chưa nhập mã', trigger: 'change' },
          { validator: validateName, trigger: 'change' }]
      },
      applicationId: null
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogCreateVisible
      },
      set(value) {
        return value
      }
    }
  },
  watch: {

  },
  created() {
    this.applicationId = Number(this.$route.params.applicationId)
  },

  methods: {
    open() {
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
        this.$refs.name.focus()
      })
    },
    handleCreate() {
      this.form.name = this.form.name.trim()
      this.form.code = this.form.code.trim()
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.loadingBt) {
            return
          }
          this.loadingBt = true
          this.$store.dispatch('group/saveOrUpdate', this.form).then(data => {
            this.$message.success('Thêm nhóm thành công')
            this.handleCancel()
            this.$emit('resetGroup', '')
          }).catch(e => {
            console.log(e)
            this.loadingBt = false
          })
        }
      })
    },
    handleCancel() {
      this.$emit('handleCancel', false)
      setTimeout(() => {
        this.$refs['form'].resetFields()
        this.loadingBt = false
      }, 500)
    }
  }
}

</script>
<style scoped>
</style>
