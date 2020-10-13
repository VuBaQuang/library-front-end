<template>

  <div>
    <el-dialog
      class="header-center"
      title="Bạn có chắc không?"
      :visible.sync="visibleDialog"
      width="33%"
      @close="handleCancelDelete"
    >
      <span>Nhóm bị xóa sẽ không thể khôi phục.</span>
      <br>
      <br>
      <span>Vẫn thực hiện xóa nhóm đã chọn?</span>
      <span slot="footer">
        <el-divider class="my-3" />
        <div style="text-align: right">
          <el-button type="danger" size="mini" @click="handleDelete">Xóa</el-button>
          <el-button class="button_text" type="text" size="small" @click="handleCancelDelete">Hủy</el-button>
        </div>

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
    groupsSelected: {
      type: Array,
      require: true,
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
    handleDelete() {
      this.$emit('handleDelete')
      this.$store.dispatch('group/deletes', this.convertListGroupToListId()).then(() => {
        this.$emit('resetGroup', '')
        this.handleCancelDelete()
      }).catch(e => {
        console.log(e)
      })
    },
    handleCancelDelete() {
      this.$emit('handleCancelDelete', false)
    },
    convertListGroupToListId() {
      var result = []
      for (var i = 0; i < this.groupsSelected.length; i++) {
        result.push(this.groupsSelected[i].id)
      }
      return result
    }
  }
}

</script>
<style scoped>

</style>
