<template>
  <div class="manage-group">

    <el-col><h2>Danh sách tài liệu</h2></el-col>
    <el-col><hr></el-col>
    <el-col v-if="bookIsSelected.length>0" :span="4">
      <el-button
        style="float: left"
        type="danger"
        size="small"
        plain
        icon="el-icon-s-custom"
        @click="deletesBook"
      >Xóa</el-button>
    </el-col>
    <el-col v-if="!bookIsSelected.length>0" align="left" :span="4"><p /></el-col>
    <el-col :span="20">
      <el-button
        v-permission="['book_manage_edit']"
        class="button-add-group"
        type="primary"
        size="small"
        plain
        icon="el-icon-s-custom"
        @click="createBook"
      >Thêm sách</el-button>
    </el-col>

    <el-col v-loading="loadingTable" style="min-height: calc(100vh - 250px);margin-top: 10px" element-loading-text="Đang tải dữ liệu">
      <el-col>
        <book-table :data="tableData" @handlerSelectBook="handlerSelectBook" />
      </el-col>
      <el-col class="pagination-group">
        <el-pagination
          :current-page.sync="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="booksTotal"
          @size-change="handlePaginationChange"
          @current-change="handlePaginationChange"
        />
      </el-col>
    </el-col>
    <!--    <delete-group-dialog :groups-selected="groupsSelected" :dialog-delete-visible="dialogDeleteVisible" @resetGroup="resetGroup" @handleCancelDelete="dialogDeleteVisible=$event" />-->
    <create-book-dialog :dialog-create-visible="dialogCreateVisible" @resetBook="resetBook" @handleCancel="dialogCreateVisible=$event" />
    <!--    <delete-group-dialog :groups-selected="groupsOneSelect" :dialog-delete-visible="dialogDeleteOneVisible" @resetGroup="resetGroup" @handleCancelDelete="dialogDeleteOneVisible=$event" />-->
  </div>
</template>

<script>
import CreateBookDialog from '@/views/manage-book/components/CreateBookDialog'
import BookTable from '@/views/manage-book/components/BookTable'
import permission from '@/directive/permission/permission'

export default {
  name: 'ManageGroup',
  directives: { permission },
  components: {
    BookTable, CreateBookDialog
    // SendVersionDialog
  },

  data() {
    return {
      dialogLoadingVisible: false,
      conditionSort: true,
      valueSort: 'Theo tên',
      optionsSort: ['Theo tên', 'Theo ngày tạo'],
      tableData: [],
      loadingTable: [],
      group: null,
      dialogDeleteVisible: false,
      dialogRenameVisible: false,
      dialogCreateVisible: false,
      bookIsSelected: [],
      booksTotal: 0,
      page: 1,
      size: 10
    }
  },

  created() {
    this.fetchBooks()
  },
  methods: {
    deletesBook() {
      this.$confirm('Bạn có chắc muốn xóa sách ?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('book/deletes', this.convertListBookToListId()).then(data => {
          this.$message({
            type: 'success',
            message: 'Xóa thành công'
          })
          this.fetchBooks()
        }).catch(e => {

        })
      }).catch(() => {

      })
    },
    convertListBookToListId() {
      var result = []
      for (var i = 0; i < this.bookIsSelected.length; i++) {
        result.push(this.bookIsSelected[i].id)
      }
      return result
    },
    handlerSelectBook(val) {
      this.bookIsSelected = JSON.parse(JSON.stringify(val))
    },
    resetBook() {
      this.fetchBooks()
    },
    handlePaginationChange() {
      this.fetchBooks()
    },
    fetchBooks() {
      this.loadingTable = true
      this.tableData = []
      var body = { page: this.page, pageSize: this.size }
      this.$store.dispatch('book/getAll', body).then(data => {
        setTimeout(() => {
          this.loadingTable = false
          this.tableData = data.data.data.content
          this.booksTotal = data.data.data.totalElements
        }, 1000)
      }).catch(e => {
        console.log(e)
      })
    },
    createBook() {
      this.dialogCreateVisible = true
    },
    handleChangeName(value) {
      this.book = value
      this.dialogRenameVisible = true
    },
    deleteGroups() {
      this.dialogDeleteVisible = true
    },
    deleteGroup(value) {
      this.groupsOneSelect = []
      this.groupsOneSelect.push(value)
      this.dialogDeleteOneVisible = true
    },
    selectionChange(val) {
      this.booksSelected = JSON.parse(JSON.stringify(val))
    }
  }
}
</script>
<style scoped>
/*.manage-group{*/
/*  margin:0 50px*/
/*}*/
.button-add-group{
  float: right
}
.pagination-group{
  margin-top: 20px;
}
</style>
