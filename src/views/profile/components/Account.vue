<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {

  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    submit() {
      this.user.isUpdateInfo = true
      this.$store.dispatch('user/saveOrUpdate', this.user).then(data => {
        console.log(data)
      })
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
