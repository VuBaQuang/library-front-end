<template>
  <div style="width: 95%;margin: 0 auto;">
    <h2 class="text-center">Tìm kiếm sách</h2>
    <div style="margin-bottom: 50px">
      <el-form
        ref="empSearchForm"
        :model="form"
        style="margin: 1rem auto;width: 70%;"
        @submit.native.prevent="handleSearch"
      >
        <el-form-item prop="searchText">

          <el-input
            ref="textSearch"
            v-model="form.searchText"
            maxlength="100"
            placeholder="Nhập tên hoặc mã sách hoặc học kỳ"
          >
            <i v-if="form.searchText.length>0" slot="suffix" class="el-icon-circle-close" @click="clearSearch" />
            <el-button
              slot="append"
              type="info"
              icon="el-icon-search"
              size="small"
              plain
              @click="handleSearch"
            />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loadSearch" element-loading-text="Đang tìm kiếm sách" style="min-height: calc(100vh - 250px); ">
      <div v-if="books && books.length > 0" style="max-height: 580px; overflow-y: auto; overflow-x: hidden;">
        <div v-for="(book, index) in books" :key="index + book">
          <el-row :gutter="10" class="small-font-size" style="display: flex;align-items: center;">
            <el-col :span="21">
              <div flex="right" class="justify-between-align-center" style="padding: 0 10px">
                <div style="display: flex;justify-content: space-between;max-width: 300px;">
                  <div
                    class="box-center avatarDiv"
                    :style="{backgroundImage: `url(${urlImage})`}"
                  />
                  <div class="content break-word font-sm" style="min-width: 250px">
                    <div style="font-size: 18px">{{ book.name }}</div>
                    <div style="font-size: 13px">Học kỳ {{ book.semester }}</div>
                    <div style="font-size: 13px" class="">Số lượng còn lại: {{ book.count }}</div>
                  </div>
                  <!--                  <el-row :gutter="30" style="min-width: 200px">-->
                  <!--                    <el-col v-for="(group, i) in emp.groups" :key="group+i" style="margin-bottom: 10px" :span="8"><el-tag type="success">{{ group }}</el-tag></el-col>-->
                  <!--                  </el-row>-->
                </div>

              </div>
            </el-col>
            <el-col style="margin-right: 20px" :span="3" align="right">
              <el-button icon="el-icon-info" size="small" round plain @click="borrow(book)">Mượn sách</el-button>
            </el-col>
          </el-row>
          <el-divider class="my-2" />
        </div>
      </div>
      <div v-if="!(books && books.length > 0)">
        <p class="color-info text-center">Không có dữ liệu sách</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        searchText: ''
      },
      books: [],
      booksTotal: 0,
      loadSearch: false,
      urlImage: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.fetchBooks()
  },
  methods: {
    clearSearch() {
      this.form.searchText = ''
    },
    handleSearch() {
      this.fetchBooks()
    },
    borrow(book) {
      if (book.count <= 0) {
        this.$message.error('Số lượng sách đã hết, vui lòng mượn lại sau')
      }

      this.$confirm('Bạn có chắc muốn mượn sách ?', 'Xác nhận', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      }).then(() => {
        this.user.book = book
        this.$store.dispatch('user/borrowBook', this.user).then(data => {
          this.fetchBooks()
        }).catch(e => {
          console.log(e)
        })
      }).catch(() => {

      })
    },
    fetchBooks() {
      this.loadSearch = true
      this.tableData = []
      var body = { page: this.page, pageSize: this.size, valueSearchBook: this.form.searchText }
      this.$store.dispatch('book/getAll', body).then(data => {
        setTimeout(() => {
          this.loadSearch = false
          this.books = data.data.data.content
          this.booksTotal = data.data.data.totalElements
        }, 1000)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-between;
}

.el-icon-circle-close {
  margin-top: 10px;
  cursor: pointer;
  margin-right: 10px;
}

.el-icon-circle-close:hover {
  color: #dd1100;
}
</style>
