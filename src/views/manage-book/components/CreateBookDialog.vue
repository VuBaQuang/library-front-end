<template>

  <div>
    <el-dialog
      class="header-center"
      title="Thêm sách"
      :visible.sync="visibleDialog"
      width="30%"
      @close="handleCancel"
    >

      <el-radio-group v-model="isNew" style="margin-bottom: 20px">
        <el-radio :label="1">Thêm sách mới</el-radio>
        <el-radio :label="2">Thêm số lượng sách</el-radio>
      </el-radio-group>

      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item v-if="isNew===1" prop="name">
          <el-input ref="name" v-model="form.name" size="small" maxlength="100" placeholder="Tên sách" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input ref="name" v-model="form.code" size="small" maxlength="100" placeholder="Mã sách" />
        </el-form-item>
        <el-form-item v-if="isNew===1" prop="semester">
          <el-select v-model="form.semester" size="small" placeholder="Học kỳ">
            <el-option
              v-for="item in options"
              :key="item.code + item.label"
              :label="item.label"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="count">
          <el-input ref="count" v-model="form.count" type="number" size="small" maxlength="100" placeholder="Số lượng" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loadingBt" type="primary" size="mini" @click="handleCreate">Lưu</el-button>
        <el-button class="button_text" type="text" size="small" @click="handleCancel">Hủy</el-button>
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
        callback(new Error('Chỉ sử dụng kí tự a-z, A-Z, 0-9, tiếng Việt có dấu'))
      } else {
        callback()
      }
    }
    return {
      options: [
        { label: 'Học kỳ 1', code: 1 },
        { label: 'Học kỳ 2', code: 2 },
        { label: 'Học kỳ 3', code: 3 },
        { label: 'Học kỳ 4', code: 4 },
        { label: 'Học kỳ 5', code: 5 },
        { label: 'Học kỳ 6', code: 6 },
        { label: 'Học kỳ 7', code: 7 },
        { label: 'Học kỳ 8', code: 8 },
        { label: 'Học kỳ 9', code: 9 },
        { label: 'Học kỳ 10', code: 10 }
      ],

      loadingBt: false,
      isNew: 1,
      form: {
        name: '',
        semester: '',
        code: '',
        count: 0
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
    // open() {
    //   this.$nextTick(() => {
    //     this.$refs['form'].resetFields()
    //     this.$refs.name.focus()
    //   })
    // },
    handleCreate() {
      this.form.name = this.form.name.trim()
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.loadingBt) {
            return
          }
          this.form.isNew = this.isNew

          this.$store.dispatch('book/saveOrUpdate', this.form).then(data => {
            this.$emit('resetBook', '')
            this.handleCancel()
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
