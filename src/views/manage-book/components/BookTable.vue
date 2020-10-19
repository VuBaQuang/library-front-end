<template>
  <div>
    <el-table
      class="table-list-version"
      :data="data"
      style="width: 100%;border-top:1px solid #dfe6ec;"
      max-height="540px"
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
        align="center"
        prop="name"
        min-width="200px"
        label="Tên sách"
      />
      <el-table-column
        align="center"
        prop="code"
        min-width="200px"
        label="Mã sách"
      />
      <el-table-column
        width="200px"
        prop="count"
        label="Số lượng"
        align="center"
      />
      <el-table-column
        min-width="200px"
        label="Kỳ học"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.semester!=null ?'Kỳ học '+ row.semester:'' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Ngày tạo"
        align="center"
        min-width="100px"
      >
        <template slot-scope="{row}">
          {{ simpleDateFormat(row.createdAt) }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { parseVNTime } from '@/utils'
export default {
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      startIndex: 0
    }
  },
  methods: {
    indexMethod(index) {
      return this.startIndex + index + 1
    },
    simpleDateFormat(time) {
      if ((typeof time) === 'number' || (typeof time) === 'string') {
        return parseVNTime(new Date(time), '{d}/{m}/{Y}').toString()
      }
    },
    handleSelectionChange(val) {
      this.$emit('handlerSelectBook', val)
    }
  }
}
</script>
<style scoped>

</style>
