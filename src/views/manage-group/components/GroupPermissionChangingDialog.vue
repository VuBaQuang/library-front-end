<template>

  <div>
    <el-dialog
      class="header-center"
      title="Thay đổi quyền"
      :visible.sync="visibleDialog"
      @close="handleCancel"
      @open="open"
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
      <table-permissions :table-data="dataTable" />
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
    return {
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

    open() {

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
