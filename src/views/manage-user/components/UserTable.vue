<template>
  <div>
    <el-table
      class="table-list-version"
      :data="data"
      style="width: 100%;border-top:1px solid #dfe6ec"
      size="small"
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
          <el-tag class="mb-1 mr-1" type="success" size="small">
            {{ row.roles }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        label="Ngày tạo"-->
      <!--        align="center"-->
      <!--      >-->
      <!--        <template slot-scope="{row}">-->
      <!--          {{ simpleDateFormat(row.releaseAt) }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      />-->
      <!--      <el-table-column-->
      <!--        prop="size"-->
      <!--        label="Kích cỡ"-->
      <!--        align="center"-->
      <!--      />-->
      <!--      <el-table-column-->
      <!--        v-if="isVersionManage || !isVersionManage"-->
      <!--        prop="linkDownload"-->
      <!--        label="Link Download"-->
      <!--      />-->
    </el-table>

  </div>
</template>
<script>
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
    // simpleDateFormat(time) {
    //   time = parseInt(time)
    //   if ((typeof time) === 'number' || (typeof time) === 'string') {
    //     return parseVNTime(new Date(time), '{d}/{m}/{Y}').toString()
    //   }
    // },
    handleSelectionChange(val) {
      this.$emit('handlerSelect', val)
    }
  }
}
</script>
<style scoped>
</style>
