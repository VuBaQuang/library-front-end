<template>
  <div style="width: 95%;margin: 0px auto;">
    <div v-loading="loadSearchEmployee" element-loading-text="Đang tìm kiếm người dùng" style="min-height: calc(100vh - 250px); ">
      <div v-if="empList && empList.length > 0" style="max-height: 580px; overflow-y: auto; overflow-x: hidden;">
        <div v-for="(emp, index) in empList" :key="index">
          <el-row :gutter="10" class="small-font-size" style="display: flex;align-items: center;">
            <el-col :span="21">
              <div flex="right" class="justify-between-align-center" style="padding: 0 10px">
                <div style="display: flex;justify-content: space-between;max-width: 300px;">
                  <div
                    class="box-center avatarDiv"
                    :style="{backgroundImage: `url(${emp.avatar || defaultAvatar})`}"
                  />
                  <div class="content break-word font-sm" style="min-width: 250px">
                    <div>{{ emp.fullName }}</div>
                    <div class="">{{ emp.employeeCode }}</div>
                    <div class="">{{ emp.email }}</div>
                  </div>
                  <el-row :gutter="30" style="min-width: 200px">
                    <el-col v-for="(group, i) in emp.groups" :key="group+i" style="margin-bottom: 10px" :span="8"><el-tag type="success">{{ group }}</el-tag></el-col>
                  </el-row>
                </div>

              </div>
            </el-col>
            <el-col style="margin-right: 20px" :span="3" align="right">
              <el-button icon="el-icon-info" size="small" round plain @click="watchEmpInfo(emp)">Xem hồ sơ</el-button>
            </el-col>
          </el-row>
          <el-divider class="my-2" />
        </div>
      </div>
      <div v-if="!(empList && empList.length > 0)">
        <p class="color-info text-center">Không có dữ liệu người dùng</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  created() {

  },
  methods: {

    handleSearch() {
      this.$refs['empSearchForm'].validate((valid) => {
        if (valid) {
          this.searchEmp()
          this.$router.push({ path: this.$route.path, query: { search: this.empSearchForm.searchText }})
        } else {
          this.isSubmitted = false
          return
        }
      }
      )
    },
    searchEmp() {
      this.loadSearchEmployee = true
      var listPhone = []
      listPhone.push(this.empSearchForm.searchText)
      var body = { fullName: this.empSearchForm.searchText, email: this.empSearchForm.searchText, phone: listPhone }
      this.$store.dispatch('employee/findAll', body).then(data => {
        setTimeout(() => {
          this.empList = data.data.items
          this.loadSearchEmployee = false
        }, 1000)
      })
    },
    watchEmpInfo(emp) {
      console.log(emp)
      this.$router.push({ path: '/manage-user/detail/' + emp.id })
    }
  }
}
</script>
<style scoped>
.content{
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-between;
}
.el-icon-circle-close {
  margin-top: 10px;
  cursor: pointer;
  margin-right: 10px;
}
.el-icon-circle-close:hover {
  color: #dd1100;
}
</style>
