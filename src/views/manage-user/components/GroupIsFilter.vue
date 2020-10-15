
<template>
  <div>
    <div v-if="isGroupFiltered" class="justify-between-align-center" style="position: relative">
      <div v-if="!loadingTable" class="font-sm d-inline-block mb-1" style="min-width: 200px;font-size: 14px;position: absolute; top:0">
        Có {{ userTotal }} người dùng trong nhóm</div>
      <div style="min-width: 200px;margin-left: 200px">
        <div style="min-width: 200px;" />
        <el-tag
          v-for="group in valueOfFilterByGroup"
          :key="group.id + 'filteredGroups'"
          size="small"
          type="success"
          style="margin: 0 5px 5px 0"
          closable
          @close="removeGroupToFilters(group)"
        >
          {{ group.name }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  props: {
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
    ...mapGetters([
      'valueOfFilterByGroup'
    ])
  },
  methods: {
    createGroup() {

    },
    removeGroupToFilters(group) {
      this.$emit('removeGroupToFilters', group)
    }
  }
}
</script>
<style>
.justify-between-align-center{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.font-sm {
  font-size: 0.875rem;
}
.d-inline-block{
  display: inline-block !important;
}
</style>
