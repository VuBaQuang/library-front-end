
<template>
  <div>
    <el-popover trigger="click" placement="right-start" popper-class="action-user">
      <div slot="reference" class="mr-3" style=" color: #1890ff; cursor: pointer">
        Thao tác<i class="el-icon-arrow-down el-icon--right" />
      </div>
      <el-row style="width: 150px;" class="">
        <div class="justify-end-align-center">
          <el-popover
            v-model="hidePopoverGroup"
            trigger="click"
            width="300px"
            placement="right-start"
            popper-class="popover-user-table-action"
            @hide="isAddOrOutGroup=false"
            @show="showPopoverJoinOrLeaveGroup"
          >
            <el-button
              slot="reference"
              class="dropdown-m"
              :class="{'click-hight-light':isAddOrOutGroup}"
              style="padding: 7px 0; width: 100%;text-align: left; margin: 0;border: unset"
              @click="isAddOrOutGroup=!isAddOrOutGroup"
            ><p style="margin:  0;padding: 0; padding-left: 10px;">Thêm hoặc rời nhóm</p></el-button>

            <el-input
              ref="groupSearchInput"
              v-model="groupSearch"
              clearable
              prefix-icon="el-icon-search"
              :placeholder="'Tìm nhóm'"
              size="small"
              style="margin-bottom: 20px;"
              @input="actionSearchGroup"
            />
            <!--            <label v-if="!(groups ==null || groups.length === 0)" style="margin-top: 10px" class="">Chọn nhóm:</label>-->
            <el-col align="center">
              <label
                v-if="groups == null || groups.length === 0"
                style="text-align: center; font-size: 12px; font-style: italic"
              >Không có dữ liệu</label>
            </el-col>
            <ul style="margin-top: 5px;" class="group-list" @scroll="scrollGroupList">
              <li
                v-for="(group) in groups"
                :key="group.id + 'search-group-list'"
                style="margin-top: 5px; margin-bottom: 5px"
                @click="joinOrLeaveGroup(group)"
              >
                <!--                :class="{'is-at-least-one':isAtLeastOne(group),'is-all':isAll(group)}"-->
                <span>{{ group.name }}</span>
                <!--                <i v-if="isAll(group)" style="float: right" class="el-icon-check" />-->
                <!--                <i v-if="isAtLeastOne(group)" style="float: right" class="el-icon-minus" />-->
              </li>
            </ul>
          </el-popover>
        </div>
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left; margin: 0 ; border: unset"
          @click.native="resetPassword(row)"
        ><p style="margin: 0;padding: 0; padding-left: 10px; "> Đặt lại mật khẩu</p></el-button>
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left; margin: 0;  border: unset"
          @click.native="lockUser(row)"
        ><p style="margin:  0;padding: 0; padding-left: 10px;"> Khoá tài khoản </p></el-button>
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left; margin: 0;  border: unset"
          @click.native="unlockUser(row)"
        ><p style="margin:  0;padding: 0; padding-left: 10px;"> Mở khoá tài khoản </p></el-button>
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left;  margin: 0; border: unset"
          @click.native="deleteUser(row)"
        ><p style="margin:  0;padding: 0; padding-left: 10px;"> Xóa </p></el-button>
      </el-row>
    </el-popover>
  </div>

</template>

<script>

export default {
  props: {
    showPopover: {
      required: false,
      type: Boolean,
      default: false
    },
    usersSelected: {
      required: false,
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      groupSearchInput: '',
      hidePopoverGroup: false,
      groupSearch: '',
      groups: [],
      isAddOrOutGroup: false,
      pageSize: 10,
      page: 1,
      timeoutSeachGroup: null
    }
  },
  computed: {

  },
  methods: {
    joinOrLeaveGroup() {

    },
    resetPassword() {

    },
    unlockUser() {

    },
    deleteUser() {

    },
    lockUser() {

    },

    actionSearchGroup() {
      clearTimeout(this.timeoutSeachGroup)
      this.timeout = setTimeout(() => {
        this.getAllGroup()
      }, 500)
    },
    showPopoverJoinOrLeaveGroup() {
      this.getAllGroup()
    },
    scrollGroupList(event) {
      if (event.target.scrollHeight - event.target.clientHeight === event.target.scrollTop) {
        this.pageSize = this.pageSize + 10
        this.getAllGroup()
      }
    },
    getAllGroup() {
      this.$store.dispatch('group/getAll', { page: this.page, pageSize: this.pageSize }).then(data => {
        this.groups = data.data.data.content
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
