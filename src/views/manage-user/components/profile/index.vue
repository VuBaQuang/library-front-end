<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
    <change-password :dialog-change-password-visible="dialogChangePasswordVisible" @handleClose="dialogChangePasswordVisible=$event" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import ChangePassword from '@/views/profile/components/ChangePassword'
export default {
  name: 'Profile',
  components: { ChangePassword, UserCard, Activity, Timeline, Account },
  data() {
    return {
      dialogChangePasswordVisible: false,
      user: {},
      activeTab: 'activity'
    }
  },
  created() {
    // this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'at130444@actvn.edu.vn',
        avatar: this.avatar
      }
    }
  }
}
</script>
