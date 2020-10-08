<template>
  <div class="manage-version">

    <!--    <el-col><h2>Danh sách phiên bản</h2></el-col>-->
    <!--    <el-col style="margin-bottom: 10px"><span style="margin: 5px 0; font-weight: unset; font-size: 0.875rem;">Tổng số phiên bản Android: <span style="color: #409EFF">100000</span></span></el-col>-->
    <!--    <el-col><span style="margin: 5px 0; font-weight: unset; font-size: 0.875rem;">Tổng số phiên bản iOS: <span style="color: #409EFF">100000</span></span></el-col>-->
    <!--    <el-col><br></el-col>-->
    <!--    <el-col><hr></el-col>-->
    <!--    <el-col style="margin-top: 20px">-->
    <!--      <version-list />-->
    <!--    </el-col>-->

  </div>
</template>

<script>
// import VersionList from '@/views/manage-user/components/VersionList'
export default {
  name: 'ManageVersion',
  // components: { VersionList },
  data() {
    return {
      // currentPage: 1
    }
  },

  created() {
    this.getAllUser()
  },
  methods: {
    getAllUser() {
      this.$store.dispatch('user/getAll', { page: 1, pageSize: 10 }).then(data => {
        console.log(data)
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
