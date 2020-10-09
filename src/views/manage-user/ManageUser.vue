<template>

  <div class="manage-user" style="padding-left: 50px;padding-right: 50px">
    <el-col><h1>Quản lý người dùng</h1></el-col>
    <el-col><el-divider class="my-4" /></el-col>
    <el-col>
      <el-col style="" :span="24">
        <el-form ref="form" :model="form" :rules="rulesForm">
          <el-col style="margin-top: 10px" :span="2">
            <filter-by-group />
          </el-col>
          <el-col v-if="usersSelected.length>0" style="width: 80px; margin-left: 30px" :span="2">
            <el-button
              plain
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="deleteUsers()"
            >Xóa
            </el-button>
          </el-col>

          <el-col v-if="!loadingTableUser" style="float: right; margin-right: 10px; max-width: 91px" :span="2">
            <el-button
              plain
              type="success"
              size="small"
              icon="el-icon-refresh"
              @click="handleRefresh()"
            >Refresh
            </el-button>

          </el-col><el-col v-if="!loadingTableUser" style="float: right; margin-right: 10px; max-width: 100px" :span="2">
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
              <el-input ref="inputSearchVersion" v-model="form.inputSearchUser" prefix-icon="el-icon-search" size="small" maxlength="100" placeholder="Tìm kiếm người dùng" @keyup.native.enter="handleSearch()" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col v-loading="loadingTableUser" style="min-height: calc(100vh - 250px); ">
        <el-col style="margin-top: 20px" :span="24">
          <user-table :data="dataUsers" @handlerSelectUser="usersSelected=$event" />
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

  </div>

</template>

<script>
import UserTable from '@/views/manage-user/components/UserTable'
// import GroupIsFilter from '@/views/manage-user/components/GroupIsFilter'
import FilterByGroup from '@/views/manage-user/components/FilterByGroup'
export default {
  name: 'ManageVersion',
  components: { FilterByGroup, UserTable },
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
      loadingTableUser: false,
      dataUsers: [],
      totalPagination: 0,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      page: 1
    }
  },

  created() {
    this.getAllUser()
  },
  methods: {
    deleteUsers() {

    },
    handleRefresh() {

    },
    handleSearch() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    getAllUser() {
      this.$store.dispatch('user/getAll', { page: 1, pageSize: 10 }).then(data => {
        console.log(data)
        this.dataUsers = data.data.data.content
      }).catch(e => {
        console.log(e)
      })
    }
    // handleSizeChange(val) {
    //   console.log(`${val} items per page`)
    // },
    // handleCurrentChange(val) {
    //   console.log(`current page: ${val}`)
    // }
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
