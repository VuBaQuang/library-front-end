<template>
  <div>
    <el-table
      class="table-list-version"
      :data="data"
      style="width: 100%;border-top:1px solid #dfe6ec;min-height: calc(100vh - 250px);"
      max-height="540px"
      :row-class-name="rowClassName"
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
        label="Họ và tên"
      />
      <el-table-column
        align="center"
        prop="username"
        min-width="200px"
        label="Tên tài khoản"
      />
      <el-table-column
        width="200px"
        prop="email"
        label="Email"
        align="center"
      />
      <el-table-column
        prop="phone"
        min-width="200px"
        label="Số điện thoại"
        align="center"
      />
      <el-table-column
        label="Nhóm"
        min-width="300px"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tag v-for="group in row.groups" :key="group.id +'groupTable'" style="margin: 5px 5px" type="success" size="small">
            {{ group.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="Địa chỉ"
        min-width="200px"
        align="center"
      />
      <el-table-column
        label="Ngày tạo"
        align="center"
        min-width="100px"
      >
        <template slot-scope="{row}">
          {{ simpleDateFormat(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Trạng thái"
        align="center"
        width="100px"
      >
        <template slot-scope="{row}">
          <i v-if="row.isLock!==1" class="el-icon-lock" style="color: red" />
          <i v-if="row.isLock===1" class="el-icon-unlock" style="color: green" />
        </template>
      </el-table-column>
      <!--      <el-table-column width="100px" fixed="right" align="right">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <el-button-->
      <!--            type="info"-->
      <!--            size="mini"-->
      <!--            plain-->
      <!--            icon="el-icon-info"-->
      <!--            @click="viewInfo(row)"-->
      <!--          >Xem</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
    rowClassName({ row, rowIndex }) {
      if (row.isLock !== 1) {
        return 'user-is-block'
      }
    },
    indexMethod(index) {
      return this.startIndex + index + 1
    },
    simpleDateFormat(time) {
      if ((typeof time) === 'number' || (typeof time) === 'string') {
        return parseVNTime(new Date(time), '{d}/{m}/{Y}').toString()
      }
    },
    handleSelectionChange(val) {
      this.$emit('handlerSelectUser', val)
    }
  }
}
</script>
<style scoped>

</style>
