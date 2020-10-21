<template>
  <div>
    <el-col v-if="tableData.length===0" align="center">Không có dữ liệu</el-col>
    <el-table
      v-if="tableData.length>0"
      v-loading="loadingTablePermission"
      :data="tableData"
      style="width: 100%;border-top:1px solid #dfe6ec;"
      max-height="300px"
      class="permission-table"
    >
      <el-table-column width="150px">
        <template slot="header">
          <span style="text-decoration: underline">Tính năng</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <span style="text-decoration: underline">Quyền</span>
        </template>
        <template slot-scope="{row}">
          <el-col v-for="(item, index) in row.roles" :key="item + index" :span="8">
            <el-checkbox v-model="item.value">{{ item.label }}</el-checkbox>
          </el-col>

        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>

export default {
  props: {
    dialogChangePermissionVisible: {
      type: Boolean,
      required: false
    },
    loadingTablePermission: {
      type: Boolean,
      required: false
    },
    tableData: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      permissionCut: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    if (this.tableData.length > 0 && this.tableData[0].roles.length > 0) { this.permissionCut = JSON.parse(JSON.stringify(this.tableData[0].roles.slice(1))) }
  },

  methods: {

    open() {

    },
    handleSave() {

    },
    handleCancel() {

    }
  }
}

</script>
<style scoped>
</style>
