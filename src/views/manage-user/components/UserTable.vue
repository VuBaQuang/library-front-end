<template>
  <div>
    <el-table
      class="table-list-version"
      :data="data"
      style="width: 100%;border-top:1px solid #dfe6ec"
      size="small"
      max-height="520"
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
      />
      <el-table-column
        prop="phone"
        label="Số điện thoại"
        align="center"
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

      <el-table-column
        label="Ngày tạo"
        align="center"
      >
        <template slot-scope="{row}">
          {{ simpleDateFormat(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="{row}">
          <el-button
            type="info"
            size="mini"
            plain
            icon="el-icon-info"
            @click="viewInfo(row)"
          >Xem</el-button>
          <el-popover v-model="row.visible" style="margin-right: 20px" trigger="click">
            <span slot="reference" class="el-dropdown-link">
              <i style="cursor: pointer" class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-row style="width: 125px">
              <el-button
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left; margin: 0 ; border: unset"
                @click.native="resetPassword(row)"
              ><p style="margin: 0;padding: 0; padding-left: 10px; "> Đặt lại mật khẩu</p></el-button>
              <el-button
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left; margin: 0;  border: unset"
                @click.native="lockUser(row)"
              ><p style="margin:  0;padding: 0; padding-left: 10px;"> Khoá tài khoản </p></el-button>
              <el-button
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left; margin: 0;  border: unset"
                @click.native="unlockUser(row)"
              ><p style="margin:  0;padding: 0; padding-left: 10px;"> Mở khoá tài khoản </p></el-button>
              <el-button
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left;  margin: 0; border: unset"
                @click.native="deleteUser(row)"
              ><p style="margin:  0;padding: 0; padding-left: 10px;"> Xóa </p></el-button>
            </el-row>

          </el-popover>
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
      this.$emit('handlerSelectUser', val)
    }
  }
}
</script>
<style scoped>
</style>
