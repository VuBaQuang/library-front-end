
<template>
  <div class="d-inline-block">
    <el-button
      v-if="!isGroupFiltered"
      icon="el-icon-plus"
      class="mb-1"
      type="primary"
      size="small"
      plain
      @click="createGroup"
    >Thêm nhóm</el-button>
    <div v-if="isGroupFiltered " class="justify-between-align-center">
      <div v-if="!loadingTable" class="font-sm d-inline-block mb-1" style="min-width: 200px">
        Có {{ userTotal }} người dùng trong nhóm &nbsp;&nbsp;</div>
      <div class="d-inline-block">
        <div v-if="loadingTable" class="font-sm d-inline-block mb-1" style="min-width: 200px" />
        <el-tag
          v-for="group in valueOfFilterByGroup"
          :key="group.id + 'filteredGroups'"
          size="small"
          type="success"
          class="mr-1 mb-1"
          closable
          @close="addOrRemoveGroupToFilters(group)"
        >
          {{ group.name }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    valueOfFilterByGroup: {
      required: false,
      type: Array,
      default: function() {
        return []
      }
    },
    isGroupFiltered: {
      required: false,
      type: Boolean,
      default: false
    },
    loadingTable: {
      required: false,
      type: Boolean,
      default: false
    },
    userTotal: {
      required: false,
      type: Number,
      default: 0
    }
  },
  computed: {

  },
  methods: {
    createGroup() {

    },
    addOrRemoveGroupToFilters(group) {

    }
  }
}
</script>
