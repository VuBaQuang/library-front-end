<template>
  <el-popover
    v-model="hidePopoverFilterByGroup"
    trigger="click"
    placement="bottom"
    popper-class="popover-filter-by-group"
    @visible-change="groupSearchDropdownChange"
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
      class="mb-2"
      @input="getAllGroup"
    />
    <label v-if="!(groups ==null || groups.length === 0)" class="d-block mb-1 font-sm color-text-regular">Chọn nhóm:</label>
    <el-col align="center">
      <label v-if="groups ==null || groups.length === 0" style="text-align: center; font-size: 12px; font-style: italic">Không có dữ liệu</label>
    </el-col>

    <ul style="margin-top: 0;" class="group-list" @scroll="scrollGroupList">
      <li
        v-for="(group) in groups"
        :key="group.id + 'search-group-list'"
        class="justify-between"
        :class="{'color-success':isThisGroupSelected(group)}"
        @click="addOrRemoveGroupToFilters(group)"
      >
        <span>{{ group.name }}</span>
        <i v-if="isThisGroupSelected(group)" class="el-icon-check" />
      </li>
    </ul>

  </el-popover>
</template>
<script>

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
  methods: {
    addOrRemoveGroupToFilters(group) {

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

    }
  }
}
</script>
<style scoped>
</style>
