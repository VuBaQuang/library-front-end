<template>
  <div>
    <el-dialog
      class="header-center"
      title="Bạn muốn đổi tên nhóm là gì?"
      :visible.sync="visibleDialog"
      width="30%"
      @close="cancel"
      @open="open"
    >
      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
        <div style="margin-bottom: 10px">
          <span style="font-weight: bold">Tên nhóm</span>
          <span style="float: right;" class="smaller-font-size">{{ form.name.length }}/100</span>
        </div>
        <el-form-item prop="name">
          <el-input ref="name" v-model="form.name" maxlength="100" @keyup.enter.native="change" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-divider class="my-1" />
        <div style="text-align: right">
          <el-button type="primary" size="mini" @click="change">Đổi tên</el-button>
          <el-button class="button_text" type="text" size="small" @click="cancel">Hủy</el-button>
        </div>

        <!--        <el-button size="small" type="primary" @click="change">Đổi tên</el-button>-->
        <!--        <el-button size="small" @click="cancel">Hủy</el-button>-->
      </span>
    </el-dialog>
  </div>

</template>
<script>

export default {
  props: {
    dialogRenameVisible: {
      type: Boolean,
      required: false
    },
    group: {
      type: Object,
      default: null
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
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: 'Bạn chưa nhập tên', trigger: 'change' },
          { validator: validateName, trigger: 'change' }]
      }
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogRenameVisible
      },
      set(value) {
        return value
      }
    }
  },

  watch: {

  },
  created() {

  },
  methods: {
    open() {
      this.form.name = this.group.name.trim()
      this.$nextTick(() => {
        this.$refs.name.focus()
      })
    },
    change() {
      this.form.name = this.form.name.trim()
      if (this.form.name.toUpperCase() === this.group.name.toUpperCase()) {
        this.cancel()
      } else {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            var body = JSON.parse(JSON.stringify(this.group))
            body.name = this.form.name
            this.$store.dispatch('group/saveOrUpdate', body).then(() => {
              this.$emit('resetGroup', '')
            }).catch(e => {
              // this.$emit('resetGroup', '')
              console.log(e)
            })
            this.cancel()
          }
        })
      }
    },
    cancel() {
      this.$emit('cancel', false)
    }
  }
}

</script>
<style scoped>

</style>
