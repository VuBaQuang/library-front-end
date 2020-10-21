<template>
  <el-col>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="book.name"
        label="Tên sách"
        width="180"
      />
      <el-table-column
        label="Ngày mượn"
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
        min-width="100px"
      >
        <template slot-scope="{row}">
          {{ statusBorrow(row.status) }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkPermission(['librarian'])"
        label="Thao tác"
        align="center"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <el-button v-if="row.status === 2" plain type="primary" size="mini" @click="accept(row)">Xác nhận</el-button>
          <el-button v-if="row.status === 2" plain type="danger" size="mini" @click="deny(row)">Hủy bỏ</el-button>

          <el-button v-if="row.status === 1 || row.status === 3" type="danger" size="mini" @click="returnBook(row)">Trả sách</el-button>

        </template>
      </el-table-column>
    </el-table>
  </el-col>

</template>

<script>
import checkPermission from '@/utils/permission'
import { parseVNTime } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'BorrowBook',
  props: {},
  data: function() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },

  created() {
    this.tableData = JSON.parse(JSON.stringify(this.user.borrowBooks))
  },
  mounted() {

  },
  destroyed() {

  },

  methods: {
    checkPermission,
    accept(row) {
      this.$confirm('Bạn có chắc muốn trả sách ?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      }).then(() => {
        row.status = 1
        this.$store.dispatch('user/updateBorrowBook', row).then(data => {
          this.$message({
            type: 'success',
            message: 'Xác nhận thành công'
          })
          const { fullPath } = this.$route

          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
          // this.fetchBooks()
        }).catch(e => {

        })
      }).catch(() => {

      })
    },
    deny(row) {
      this.$confirm('Bạn có chắc muốn trả sách ?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      }).then(() => {
        row.status = 4
        this.$store.dispatch('user/updateBorrowBook', row).then(data => {
          this.$message({
            type: 'success',
            message: 'Hủy bỏ thành công'
          })
          const { fullPath } = this.$route

          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
          // this.fetchBooks()
        }).catch(e => {

        })
      }).catch(() => {

      })
    },
    returnBook(row) {
      this.$confirm('Bạn có chắc muốn trả sách ?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      }).then(() => {
        console.log('hihi')
        this.$store.dispatch('user/returnBook', row).then(data => {
          this.$message({
            type: 'success',
            message: 'Trả sách thành công'
          })
          const { fullPath } = this.$route
          row.status = 5
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + fullPath
            })
          })
          // this.fetchBooks()
        }).catch(e => {

        })
      }).catch(() => {

      })
    },
    statusBorrow(value) {
      if (value === 2) {
        return 'Đang đợi xử lý'
      }
      if (value === 1) {
        return 'Đang mượn'
      }
      if (value === 3) {
        return 'Hết hạn'
      }
      if (value === 4) {
        return 'Bị hủy'
      }
      if (value === 5) {
        return 'Đã trả'
      }
    },
    simpleDateFormat(time) {
      if ((typeof time) === 'number' || (typeof time) === 'string') {
        return parseVNTime(new Date(time), '{d}/{m}/{Y}').toString()
      }
    }
  }
}
</script>
