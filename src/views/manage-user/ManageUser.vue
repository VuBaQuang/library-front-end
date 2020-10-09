<template>
  <div class="manage-version">

    <el-col>
      <user-table :data="dataUsers" />
    </el-col>

  </div>
</template>

<script>
import UserTable from '@/views/manage-user/components/UserTable'
export default {
  name: 'ManageVersion',
  components: { UserTable },
  data() {
    return {
      dataUsers: []
    }
  },

  created() {
    this.getAllUser()
  },
  methods: {
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
