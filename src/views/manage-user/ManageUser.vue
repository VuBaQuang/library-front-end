<template>

  <div class="manage-user">
    <el-col><h1>Quản lý người dùng</h1></el-col>
    <el-col>
      <el-divider class="my-4" />
    </el-col>
    <el-col>
      <el-col style="" :span="24">
        <el-form ref="form" :model="form" :rules="rulesForm">
          <el-col v-if="!usersSelected.length>0" v-permission="['admin', 'group_manage']" style="margin-top: 10px; width: 135px; margin-right: 30px">
            <filter-by-group @filterByGroup="filterByGroup" />
          </el-col>
          <el-col v-if="usersSelected.length>0" style="margin-top: 10px; width: 135px; margin-right: 30px">
            <action-user-table :users-selected="usersSelected" :show-popover="false" @resetListUser="filterByGroup" />
          </el-col>
          <el-col v-if="!loadingTableUser" style="margin-right: 10px; max-width: 100px" :span="2">
            <el-button
              plain
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              @click="handleAddUser()"
            >Thêm người dùng
            </el-button>
          </el-col>
          <el-col v-if="isFilter || valueOfFilterByGroup.length>0" style="float: right; margin-top: 10px; max-width: 15px" :span="1">
            <el-tooltip class="item" effect="dark" content="Xóa lọc" placement="top">
              <i style="color: red" class="el-icon-close pointer" @click="clearFilter" />
            </el-tooltip>
          </el-col>
          <el-col v-if="!loadingTableUser" style="float: right; margin-right: 10px; max-width: 100px" :span="2">
            <el-button
              plain
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="handleSearch()"
            >Tìm kiếm
            </el-button>
          </el-col>
          <el-col v-if="!loadingTableUser" style="float: right; margin-right: 10px" :span="6">
            <el-form-item style="padding: 0; margin: -2px 0 0;" prop="inputSearchVersion">
              <el-input
                ref="inputSearchVersion"
                v-model="form.inputSearchUser"
                prefix-icon="el-icon-search"
                size="small"
                maxlength="100"
                placeholder="Tìm kiếm người dùng"
                @keyup.native.enter="handleSearch()"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col style="min-height: calc(100vh - 250px); ">
        <el-col style="margin-top: 20px; min-height: calc(100vh - 250px);" :span="24">
          <user-table v-loading="loadingTableUser" :data="dataUsers" @handlerSelectUser="usersSelected=$event" />
        </el-col>
        <el-col style="margin-top: 20px; margin-bottom: 30px" class="pagination-group">
          <el-pagination
            :current-page.sync="page"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-col>
    </el-col>
    <create-user-dialog :dialog-create-user-visible="visibleCreateUserDialog" @handleCancel="visibleCreateUserDialog=$event" />
  </div>

</template>

<script>
import permission from '@/directive/permission/index.js'
import UserTable from '@/views/manage-user/components/UserTable'
import ActionUserTable from '@/views/manage-user/components/ActionUserTable'
import FilterByGroup from '@/views/manage-user/components/FilterByGroup'
import CreateUserDialog from '@/views/manage-user/components/CreateUserDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'ManageUser',
  directives: { permission },
  components: { CreateUserDialog, ActionUserTable, FilterByGroup, UserTable },
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
    return {
      form: {
        inputSearchUser: ''
      },
      rulesForm: {
        inputSearchUser: [
          { required: true, message: 'Mời bạn nhập tên hoặc tên hoặc số điện thoại', trigger: 'change' },
          { validator: validateVietnamese, trigger: 'change' }]
      },
      usersSelected: [],
      isFilter: false,
      visibleCreateUserDialog: false,
      loadingTableUser: false,
      dataUsers: [],
      totalPagination: 0,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      page: 1
    }
  },
  computed: {
    ...mapGetters([
      'valueOfFilterByGroup'
    ])
  },
  created() {
    this.getAllUser()
  },

  methods: {
    handleAddUser() {
      this.visibleCreateUserDialog = true
    },
    clearFilter() {
      this.form.inputSearchUser = ''
      this.isFilter = false
      this.$store.dispatch('group/setValueOfFilterByGroup', []).then(() => {
        this.getAllUser()
      })
    },
    filterByGroup() {
      this.getAllUser()
    },
    deleteUsers() {

    },
    handleRefresh() {

    },
    handleSearch() {
      this.isFilter = true
      this.page = 1
      this.pageSize = 10
      this.getAllUser()
    },
    handleSizeChange() {
      this.getAllUser()
    },
    handleCurrentChange() {
      this.getAllUser()
    },
    getAllUser() {
      this.loadingTableUser = true
      this.$store.dispatch('user/getAll', {
        page: this.page,
        pageSize: this.pageSize,
        name: this.form.inputSearchUser,
        username: this.form.inputSearchUser,
        email: this.form.inputSearchUser,
        phone: this.form.inputSearchUser,
        groups: this.valueOfFilterByGroup
      }).then(data => {
        setTimeout(() => {
          this.dataUsers = data.data.data.content
          this.totalPagination = parseInt(data.data.data.totalElements)
          this.loadingTableUser = false
        }, 500)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style scoped>
/*.manage-group{*/
/*  margin:0 50px*/
/*}*/
.button-add-group {
  float: right
}

.pagination-group {
  margin-top: 20px;
}
</style>
