<template>
  <div style="min-width: 120px;max-width: 120px; margin-left: 1em !important;" class="justify-end-align-center">
    <el-popover
      v-model="hidePopoverFilterByGroup"
      trigger="click"
      width="300px"
      placement="bottom-start"
      popper-class="popover-filter-by-group"
      @visible-change="groupSearchDropdownChange"
      @show="showPopoverFilterByGroup"
    >
      <div slot="reference" class="mr-3" style="min-width: 135px;max-width: 135px; color: #1890ff; cursor: pointer">
        Lọc bằng nhóm<i class="el-icon-arrow-down el-icon--right" />
      </div>

      <el-input
        ref="groupSearchInput"
        v-model="groupSearch"
        clearable
        prefix-icon="el-icon-search"
        :placeholder="'Tìm nhóm'"
        size="small"
        style="margin-bottom: 20px;"
        @input="getAllGroup"
      />
      <label v-if="!(groups ==null || groups.length === 0)" style="margin-top: 10px" class="">Chọn nhóm:</label>
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
          :class="{'is-this-group-selected':isThisGroupSelected(group)}"
          @click="addOrRemoveGroupToFilters(group)"
        >
          <span>{{ group.name }}</span>
          <i v-if="isThisGroupSelected(group)" style="float: right" class="el-icon-check" />
        </li>
      </ul>

    </el-popover>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {

  },
  data() {
    return {
      groups: [],
      groupSearch: '',
      hidePopoverFilterByGroup: false,
      pageSize: 10,
      page: 1
    }
  },
  computed: {
    ...mapGetters([
      'valueOfFilterByGroup'
    ])
  },
  created() {

  },
  methods: {
    showPopoverFilterByGroup() {
      this.getAllGroup()
    },
    addOrRemoveGroupToFilters(group) {
      this.loadingTable = true
      clearTimeout(this.timeout)
      var values = []
      if (this.checkGroupInGroups(group, this.valueOfFilterByGroup)) {
        values = JSON.parse(JSON.stringify(this.valueOfFilterByGroup))
        values.splice(this.indexOfGroupInGroups(group, this.valueOfFilterByGroup), 1)
      } else {
        values = JSON.parse(JSON.stringify(this.valueOfFilterByGroup))
        values.push(group)
      }

      this.$store.dispatch('group/setValueOfFilterByGroup', values).then(() => {
        this.hidePopoverFilterByGroup = false
        this.timeout = setTimeout(() => {
          this.$emit('filterByGroup', this.valueOfFilterByGroup)
        }, 500)
      })
    },
    checkGroupInGroups(group, groups) {
      var result = groups.filter(e =>
        e.id === group.id
      )
      return result.length > 0
    },
    indexOfGroupInGroups(group, groups) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].id === group.id) {
          return i
        }
      }
      return -1
    },
    isThisGroupSelected(groupInput) {
      return this.valueOfFilterByGroup.findIndex(group => group.id === groupInput.id) !== -1
    },
    scrollGroupList(event) {
      if (event.target.scrollHeight - event.target.clientHeight === event.target.scrollTop) {
        this.pageSize = this.pageSize + 10
        this.getAllGroup()
      }
    },
    groupSearchDropdownChange(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.groupSearchInput.focus()
        }, 200)
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
<style scoped>
.is-this-group-selected {
  background: #f0f9eb;
  border: solid 1px #e1f3d8 !important;
  border-radius: 4px;
  cursor: pointer;
  color: #67C23A !important;
}

</style>
