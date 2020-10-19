<template>
  <div style="min-width: 120px;max-width: 120px; margin-left: 1em !important;" class="justify-end-align-center">
    <el-popover trigger="click" placement="right-start" popper-class="action-user">
      <div slot="reference" class="mr-3" style=" color: #1890ff; cursor: pointer">
        Thao tác<i class="el-icon-arrow-down el-icon--right" />
      </div>
      <el-row style="width: 150px;" class="">
        <div class="justify-end-align-center">
          <el-popover
            v-model="hidePopoverGroup"
            v-permission="['admin', 'group_manager']"
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
              @input="actionSearchGroup"
            />
            <!--            <label v-if="!(groups ==null || groups.length === 0)" style="margin-top: 10px" class="">Chọn nhóm:</label>-->
            <el-col align="center">
              <label
                v-if="groups == null || groups.length === 0"
                style="text-align: center; font-size: 12px; font-style: italic"
              >Không có dữ liệu</label>
            </el-col>
            <ul style="margin-top: 5px;" class="group-list-action" @scroll="scrollGroupList">
              <li
                v-for="(group,index) in groups"
                :key="group.id + 'search-group-list'"
                style="margin-top: 5px; margin-bottom: 5px"
                :class="{'is-at-least-one':isExistOne(group),'is-all':isExistAll(group), 'is-delete':isDelete(group)}"
                @mouseover="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
                @click="isDelete(group) ? leaveGroup(group) : isExistAll(group) ? joinGroup(group) : null"
              >

                <span>{{ group.name }}</span>
                <i v-if="isExistAll(group)" style="float: right" class="el-icon-check" />
                <i v-if="isExistOne(group)" style="float: right" class="el-icon-minus" />
                <i v-if="isDelete(group)" style="float: right" class="el-icon-circle-close" />
              </li>
            </ul>
          </el-popover>
        </div>
        <!--        <el-button-->
        <!--          class="dropdown-m"-->
        <!--          style="padding: 7px 0; width: 100%;text-align: left; margin: 0 ; border: unset"-->
        <!--          @click.native="resetPassword()"-->
        <!--        ><p style="margin: 0;padding: 0; padding-left: 10px; "> Đặt lại mật khẩu</p></el-button>-->
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left; margin: 0;  border: unset"
          @click.native="lockUser()"
        ><p style="margin:  0;padding: 0; padding-left: 10px;"> Khóa tài khoản </p></el-button>
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left; margin: 0;  border: unset"
          @click.native="unlockUser()"
        ><p style="margin:  0;padding: 0; padding-left: 10px;"> Mở khóa tài khoản </p></el-button>
        <el-button
          class="dropdown-m"
          style="padding: 7px 0; width: 100%;text-align: left;  margin: 0; border: unset"
          @click.native="deleteUser()"
        ><p style="margin:  0;padding: 0; padding-left: 10px;"> Xóa </p></el-button>
      </el-row>
    </el-popover>
  </div>

</template>

<script>
import permission from '@/directive/permission/index.js'
export default {
  directives: { permission },
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
      hover: false,
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
  computed: {},
  methods: {
    isExistAll(group) {
      return (this.isAll(group) && !group.hover && this.isAll(group)) || (group.hover && this.isAtLeastOne(group)) || (group.hover && !this.isAll(group))
    },
    isExistOne(group) {
      return this.isAtLeastOne(group) && !(group.hover && this.isAtLeastOne(group))
    },
    isDelete(group) {
      return group.hover && this.isAll(group)
    },
    mouseOver(index) {
      this.groups[index].hover = true
      this.groups = JSON.parse(JSON.stringify(this.groups))
    },
    mouseLeave(index) {
      this.groups[index].hover = false
      this.groups = JSON.parse(JSON.stringify(this.groups))
    },
    isAtLeastOne(group) {
      var count = this.countGroupAppearedInUsers(group)
      return parseInt(count) > 0 && parseInt(count) < parseInt(this.usersSelected.length)
    },
    isAll(group) {
      var count = this.countGroupAppearedInUsers(group)
      return parseInt(count) === parseInt(this.usersSelected.length)
    },
    countGroupAppearedInUsers(group) {
      var count = 0
      for (var i = 0; i < this.usersSelected.length; i++) {
        if (this.usersSelected[i].groups !== null && this.usersSelected[i].groups !== undefined) {
          var check = this.usersSelected[i].groups.filter(g => parseInt(g.id) === parseInt(group.id))
          if (check.length > 0) {
            count++
          }
        }
      }
      return count
    },
    joinGroup(group) {
      this.saveOrUpdate({ userIds: this.convertObjectsToIds(this.usersSelected), group: group, isJoinGroup: true })
    },
    leaveGroup(group) {
      this.saveOrUpdate({ userIds: this.convertObjectsToIds(this.usersSelected), group: group, isLeaveGroup: true })
    },
    convertObjectsToIds(listObject) {
      var result = []
      for (var i = 0; i < listObject.length; i++) {
        result.push(listObject[i].id)
      }
      return result
    },
    saveOrUpdate(body) {
      this.$store.dispatch('user/saveOrUpdate', body).then(data => {
        this.$emit('resetListUser', null)
        console.log(data)
      }).catch(e => {
        console.log(e)
      })
    },
    unlockUser() {
      this.saveOrUpdate({ userIds: this.convertObjectsToIds(this.usersSelected), isUnlockUsers: true })
    },
    deleteUser() {
      this.$store.dispatch('user/deletes', this.usersSelected).then(data => {
        this.$emit('resetListUser', null)
      })
    },
    lockUser() {
      this.saveOrUpdate({ userIds: this.convertObjectsToIds(this.usersSelected), isLockUsers: true })
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
