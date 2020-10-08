<template>
  <div>
    <el-table
      class="table-list-version"
      :data="data"
      style="width: 100%;border-top:1px solid #dfe6ec"
      :max-height="485"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column
        type="index"
        label="STT"
        align="center"
        :index="indexMethod"
      />
      <el-table-column
        prop="username"
        label="Tên tài khoản"
      />
      <el-table-column
        prop="name"
        label="Họ và tên"
        align="center"
      />
      <el-table-column
        prop="email"
        label="Email"
        align="center"
        xa
      />
      <el-table-column
        label="Nhóm"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tag v-for="group in row.groups" :key="group + row" class="mb-1 mr-1" type="success" size="small">
            {{ group }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Ngày tạo"
        align="center"
      >
        <template slot-scope="{row}">
          {{ simpleDateFormat(row.releaseAt) }}
        </template>
      </el-table-column>
      />
      <el-table-column
        prop="size"
        label="Kích cỡ"
        align="center"
      />
      <el-table-column
        v-if="isVersionManage || !isVersionManage"
        prop="linkDownload"
        label="Link Download"
      />
    </el-table>

  </div>
</template>
<script>
import TableMixin from '@/views/components/table-mixin'
import { parseVNTime } from '@/utils/index'
export default {
  mixins: [TableMixin],
  props: {
    data: {
      required: true,
      type: Array
    },
    dashboardView: {
      required: false,
      type: Boolean,
      default: false
    },
    isVersionManage: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    indexMethod(index) {
      return this.startIndex + index + 1
    },
    simpleDateFormat(time) {
      time = parseInt(time)
      if ((typeof time) === 'number' || (typeof time) === 'string') {
        return parseVNTime(new Date(time), '{d}/{m}/{Y}').toString()
      }
    },
    handleSelectionChange(val) {
      this.$emit('handlerSelect', val)
    }
  }
}
</script>
<style scoped>
</style>
