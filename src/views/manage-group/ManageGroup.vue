<template>
  <div class="manage-group">

    <el-col><h2>Danh sách nhóm</h2></el-col>
    <el-col><hr></el-col>
    <el-col>
      <el-button
        class="button-add-group"
        type="primary"
        size="small"
        plain
        icon="el-icon-s-custom"
        @click="createGroup"
      >Thêm nhóm</el-button>
    </el-col>
    <el-col v-loading="loadingTableGroup" style="min-height: calc(100vh - 250px);" element-loading-text="Đang tải dữ liệu">
      <el-col>
        <group-table
          :table-data="tableData"
          :condition-sort="conditionSort"
          :options-sort="optionsSort"
          :value-sort="valueSort"
          :groups-selected="groupsSelected"
          @clickIconSort="conditionSort=$event"
          @handleChangeName="handleChangeName"
          @selectionChange="selectionChange"
          @deleteGroups="deleteGroups"
          @deleteGroup="deleteGroup"
          @handleSort="handleSort"
          @authorize="authorize"
        />
      </el-col>
      <el-col class="pagination-group">
        <el-pagination
          :current-page.sync="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="groupsTotal"
          @size-change="handlePaginationChange"
          @current-change="handlePaginationChange"
        />
      </el-col>
    </el-col>
    <rename-group-dialog :group="group" :dialog-rename-visible="dialogRenameVisible" @resetGroup="resetGroup" @cancel="dialogRenameVisible=$event" />
    <delete-group-dialog :groups-selected="groupsSelected" :dialog-delete-visible="dialogDeleteVisible" @resetGroup="resetGroup" @handleCancelDelete="dialogDeleteVisible=$event" />
    <create-group-dialog :dialog-create-visible="dialogCreateVisible" @resetGroup="resetGroup" @handleCancel="dialogCreateVisible=$event" />
    <delete-group-dialog :groups-selected="groupsOneSelect" :dialog-delete-visible="dialogDeleteOneVisible" @resetGroup="resetGroup" @handleCancelDelete="dialogDeleteOneVisible=$event" />
    <group-permission-changing-dialog :dialog-loading-visible="dialogLoadingVisible" :data-table="permissionFeatureData" :dialog-change-permission-visible="dialogChangePermissionVisible" @handleSave="handleSaveChangingPermission" @handleCancel="handleCancelGroupPermissionChangingDialog" />

  </div>
</template>

<script>
import GroupTable from '@/views/manage-group/components/GroupTable'
import RenameGroupDialog from '@/views/manage-group/components/RenameGroupDialog'
import DeleteGroupDialog from '@/views/manage-group/components/DeleteGroupDialog'
import CreateGroupDialog from '@/views/manage-group/components/CreateGroupDialog'
import GroupPermissionChangingDialog from '@/views/manage-group/components/GroupPermissionChangingDialog'
export default {
  name: 'ManageGroup',
  components: { CreateGroupDialog, DeleteGroupDialog, RenameGroupDialog, GroupTable,
    GroupPermissionChangingDialog
    // ,
    // SendVersionDialog
  },

  data() {
    return {
      dialogLoadingVisible: false,
      dialogChangePermissionVisible: false,
      permissionFeatureData: [],
      loadingTableGroup: false,
      groupsOneSelect: [],
      groupsTotal: 0,
      conditionSort: true,
      valueSort: 'Theo tên',
      optionsSort: ['Theo tên', 'Theo ngày tạo'],
      tableData: [],
      group: null,
      versionOptions: [
        { value: 3, text: 'Android' },
        { value: 4, text: 'iOS' }
      ],
      sendAppDlgVisible: false,
      dialogDeleteVisible: false,
      dialogDeleteOneVisible: false,
      dialogRenameVisible: false,
      dialogCreateVisible: false,
      groupsSelected: [],
      groupIsWorking: {},
      page: 1,
      size: 10
    }
  },

  created() {
    this.fetchGroups()
  },
  methods: {
    handleSaveChangingPermission() {
      this.groupIsWorking.roles = this.getRoles(this.permissionFeatureData).toString().replaceAll('[', '').replaceAll(']', '')
      this.$store.dispatch('group/saveOrUpdate', this.groupIsWorking).then(data => {
        this.resetGroup()
        this.dialogChangePermissionVisible = false
      }).catch(e => {
        console.log(e)
        this.loadingBt = false
      })
    },
    handleCancelGroupPermissionChangingDialog(event) {
      this.dialogChangePermissionVisible = event
      this.permissionFeatureData = JSON.parse(JSON.stringify(this.tempPermissionFeatureData))
    },
    authorize(group) {
      this.groupIsWorking = JSON.parse(JSON.stringify(group))
      this.convertFeatureAndPermissionToListObjectList()
      this.dialogChangePermissionVisible = true
    },
    getRoles(permissionFeatureData) {
      var result = []
      for (let i = 0; i < permissionFeatureData.length; i++) {
        for (let j = 0; j < permissionFeatureData[i].roles.length; j++) {
          if (permissionFeatureData[i].roles[j].value === true) {
            result.push(permissionFeatureData[i].code + '_manage_' + permissionFeatureData[i].roles[j].code)
          }
        }
      }
      return result
    },
    setRoles(roles, permissionFeatureData) {
      var result = []
      for (let i = 0; i < roles.length; i++) {
        // debugger
        var feature_permission = roles[i].split('_manage_')
        if (feature_permission.length === 2) {
          var feature = feature_permission[0]
          var permission = feature_permission[1]
          for (let j = 0; j < permissionFeatureData.length; j++) {
            if (permissionFeatureData[j].code === feature) {
              for (let k = 0; k < permissionFeatureData[j].roles.length; k++) {
                if (permissionFeatureData[j].roles[k].code === permission) {
                  permissionFeatureData[j].roles[k].value = true
                }
              }
            }
          }
        }
      }
      result = JSON.parse(JSON.stringify(permissionFeatureData))
      return result
    },
    getRolesByPermissionsFeatures(features, permissions) {
      var permissionFeatureData = []
      for (var i = 0; i < features.data.data.length; i++) {
        var object = {}
        object.label = features.data.data[i].name
        object.code = features.data.data[i].code
        object.roles = []
        for (var j = 0; j < permissions.data.data.length; j++) {
          var ob = { label: permissions.data.data[j].name, code: permissions.data.data[j].code, value: false }
          object.roles.push(ob)
        }
        permissionFeatureData.push(object)
      }
      return permissionFeatureData
    },
    convertFeatureAndPermissionToListObjectList() {
      this.permissionFeatureData = []
      var body = { page: 1, size: 2147483647 }
      this.$store.dispatch('feature/findAll', body).then(features => {
        this.$store.dispatch('permission-store/findAll', body).then(permissions => {
          this.permissionFeatureData = JSON.parse(JSON.stringify(this.getRolesByPermissionsFeatures(features, permissions)))
          this.tempPermissionFeatureData = JSON.parse(JSON.stringify(this.permissionFeatureData))
          this.permissionFeatureData = this.setRoles(this.groupIsWorking.roles.split(','), this.permissionFeatureData)
          console.log(this.permissionFeatureData)
        }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    handleSort(o) {
      this.valueSort = o.sortField
      this.conditionSort = o.conditionSort
      this.fetchGroups()
    },
    resetGroup() {
      this.fetchGroups()
    },
    handlePaginationChange() {
      this.fetchGroups()
    },
    fetchGroups() {
      this.loadingTableGroup = true
      this.tableData = []
      var sortField = null
      if (this.valueSort === 'Theo tên') {
        sortField = 'name'
      } else {
        sortField = 'createdAt'
      }
      var body = { page: this.page, pageSize: this.size, conditionSort: this.conditionSort, sortField: sortField }
      this.$store.dispatch('group/getAll', body).then(data => {
        setTimeout(() => {
          this.loadingTableGroup = false
          this.tableData = data.data.data.content
          this.groupsTotal = data.data.data.totalElements
        }, 1000)
      }).catch(e => {
        console.log(e)
      })
    },
    createGroup() {
      this.dialogCreateVisible = true
    },
    handleChangeName(value) {
      this.group = value
      this.dialogRenameVisible = true
    },
    deleteGroups() {
      this.dialogDeleteVisible = true
    },
    deleteGroup(value) {
      this.groupsOneSelect = []
      this.groupsOneSelect.push(value)
      this.dialogDeleteOneVisible = true
    },
    selectionChange(val) {
      this.groupsSelected = JSON.parse(JSON.stringify(val))
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
    }
  }
}
</script>
<style scoped>
/*.manage-group{*/
/*  margin:0 50px*/
/*}*/
.button-add-group{
  float: right
}
.pagination-group{
  margin-top: 20px;
}
</style>
