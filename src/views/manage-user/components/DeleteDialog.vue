<template>

  <div>
    <el-dialog
      class="header-center dialog-delete-version"
      title="Xóa phiên bản ứng dụng"
      :visible.sync="visibleDialog"
      width="30%"
      @close="handleCancel"
      @open="open"
    >
      <el-col><span>Bạn có chắc chắn muốn xóa người dùng?</span></el-col>
      <el-col style="margin-top: 20px"><span>Nhập <span style="font-size: 15px; color: red">DELETE</span> để xác nhận</span></el-col>
      <el-col style="margin-top: 10px; margin-bottom: 20px"><el-input ref="confirm" v-model="confirm" maxlength="6" @keyup.enter.native="isConfirm() ? handleDelete() : null" /></el-col>
      <span slot="footer">
        <el-button :disabled="!isConfirm()" type="primary" size="mini" @click="handleDelete">Xác nhận</el-button>
        <el-button size="small" @click="handleCancel">Đóng</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>

export default {
  props: {
    dialogDeleteVisible: {
      type: Boolean,
      required: false
    },
    versionsSelected: {
      type: Array,
      require: true,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      confirm: ''
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.dialogDeleteVisible
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
    isConfirm() {
      return this.confirm === 'DELETE'
    },
    open() {
      this.$nextTick(() => {
        this.$refs.confirm.focus()
      })
    },
    convertListVersionToListId() {
      var result = []
      for (var i = 0; i < this.versionsSelected.length; i++) {
        result.push(this.versionsSelected[i].id)
      }
      return result
    },
    handleDelete() {
      this.$store.dispatch('release/deletes', this.convertListVersionToListId()).then(data => {
        this.$message.success('Xóa phiên bản thành công')
        this.handleCancel()
      }).catch(e => {

      })
    },
    handleCancel() {
      this.$emit('handleCancel', false)
      setTimeout(() => {
        this.confirm = ''
      }, 500)
    }
  }
}

</script>
<style scoped>

</style>
