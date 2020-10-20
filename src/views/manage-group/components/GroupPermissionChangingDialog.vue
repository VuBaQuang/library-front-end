<template>

  <div>
    <el-dialog
      class="header-center"
      title="Thay đổi quyền"
      :visible.sync="visibleDialog"
      @close="handleCancel"
    >
      <el-dialog
        width="30%"
        :visible.sync="visibleLoadingDialog"
        append-to-body
        :show-close="false"
      >

        <div style="width: 100%; text-align: center; padding-bottom: 20px"> <i style="font-size: 50px" class="el-icon-loading" /></div>
        <div style="width: 100%; text-align: center; padding-bottom: 50px"><span>Đang cập nhật quyền cho người dùng</span></div>

      </el-dialog>
      <el-dialog
        width="30%"
        title="Thêm tính năng"
        :visible.sync="visibleCreateFeatureDialog"
        append-to-body
      >

        <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
          <el-form-item prop="name" label="Tên">
            <el-input ref="name" v-model="form.name" maxlength="100" />
          </el-form-item>
          <el-form-item prop="code" label="Mã">
            <el-input ref="code" v-model="form.code" maxlength="100" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="handleSaveFeature">Lưu</el-button>
          <el-button class="button_text" type="text" size="small" @click="handleCancelFeature">Hủy</el-button>
        </span>
      </el-dialog>
      <el-col style="margin-bottom: 20px">
        <el-button
          plain
          type="primary"
          size="small"
          style="margin-right: 20px"
          icon="el-icon-circle-plus-outline"
          @click="createFeature()"
        >Thêm tính năng
        </el-button>
        <el-button
          plain
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="createPermission()"
        >Thêm quyền
        </el-button>
      </el-col>
      <el-col style="margin-bottom: 30px"><table-permissions :table-data="dataTable" /></el-col>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSave">Lưu</el-button>
        <el-button class="button_text" type="text" size="small" @click="handleCancel">Hủy</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import TablePermissions from '@/views/manage-group/components/TablePermissions'
export default {
  components: { TablePermissions },
  props: {
    dialogChangePermissionVisible: {
      type: Boolean,
      required: false
    },
    dialogLoadingVisible: {
      type: Boolean,
      required: false
    },
    dataTable: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
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
      visibleCreateFeatureDialog: false,
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
      }
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogChangePermissionVisible
      },
      set(value) {
        return value
      }
    },
    visibleLoadingDialog: {
      get() {
        return this.dialogLoadingVisible
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
    handleSaveFeature() {

    },
    handleCancelFeature() {

    },
    createFeature() {
      this.visibleCreateFeatureDialog = true
    },
    createPermission() {

    },
    handleSave() {
      this.$emit('handleSave', false)
    },
    handleCancel() {
      this.$emit('handleCancel', false)
    }
  }
}

</script>
<style scoped>
</style>
