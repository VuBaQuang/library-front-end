<template>
  <div style="min-width: 120px;max-width: 120px; margin-left: 1em !important;" class="justify-end-align-center">
    <el-popover
      v-model="visiblePopover"
      trigger="click"
      width="300px"
      placement="bottom-start"
      popper-class="popover-filter-by-group"
      @show="showPopoverFilterByGroup"
      @hide="hidePopoverFilter"
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
    hidePopoverFilterByGroup: {
      required: false,
      type: Boolean
    },
    groups: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      groupSearch: '',
      pageSize: 10,
      page: 1
    }
  },
  computed: {
    visiblePopover: {
      get() {
        return this.hidePopoverFilterByGroup
      },
      set(value) {
        return value
      }
    },
    ...mapGetters([
      'valueOfFilterByGroup'
    ])
  },
  created() {

  },
  methods: {
    hidePopoverFilter() {
      this.$emit('hidePopoverFilter', false)
    },
    getAllGroup() {
      this.$emit('getAllGroup', this.groupSearch)
    },
    showPopoverFilterByGroup() {
      this.$emit('showPopoverFilterByGroup', true)
    },
    addOrRemoveGroupToFilters(group) {
      this.$emit('addOrRemoveGroupToFilters', group)
    },

    isThisGroupSelected(groupInput) {
      return this.valueOfFilterByGroup.findIndex(group => group.id === groupInput.id) !== -1
    },
    scrollGroupList(event) {
      this.$emit('scrollGroupList', event)
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
