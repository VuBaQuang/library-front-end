<template>
  <div>
    <el-table
      class="table-list-group"
      :data="tableData"
      style="width: 100%"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection"
        align="left"
        width="40"
      />
      <el-table-column min-width="200">
        <template slot="header">
          <el-col class="label-sort-groups" :span="3"><span>Sắp xếp</span> </el-col>
          <el-col style="min-width: 150px" :span="4">
            <el-select v-model="valueSort" size="mini" placeholder="Chọn" @change="actionSort">
              <el-option
                v-for="item in optionsSort"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :span="1">
            <i
              style="margin-left: 10px; font-size: 24px;font-weight: bold; line-height: 30px; cursor: pointer"
              :class="{ascending:conditionSort,descending:!conditionSort}"
              class="el-icon-back"
              @click="clickIconSort"
            /></el-col>
          <el-col v-if="groupsSelected.length>0" style="text-align: right" :span="5">
            <el-button
              plain
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteGroups()"
            >Xóa</el-button> </el-col>
        </template>
        <template slot-scope="{row}">
          <span>
            <el-link
              style="margin-bottom: 5px;font-weight: bold"
              class="small-font-size"
              :underline="false"
            >{{ row.name }}</el-link>
          </span>
          <span class="block smaller-font-size color-info">
            Tạo lúc {{ convertLongToDateTagCreate(row.createdAt) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="{row}">
          <el-button
            v-permission="['group_manage_edit']"
            type="info"
            size="mini"
            plain
            icon="el-icon-info"
            @click="handleView(row)"
          >Xem</el-button>
          <el-popover v-model="row.visible" style="margin-right: 20px" trigger="click">
            <span slot="reference" class="el-dropdown-link">
              <i style="cursor: pointer" class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-row style="width: 125px">
              <el-button
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left; margin: 0;  border: unset"
                @click.native="authorize(row)"
              ><p style="margin:  0;padding: 0; padding-left: 10px;"> Phân quyền </p></el-button>
              <el-button
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left; margin: 0;  border: unset"
                @click.native="handleChangeName(row)"
              ><p style="margin:  0;padding: 0; padding-left: 10px;"> Đổi tên </p></el-button>
              <el-button
                v-permission="['group_manage_delete']"
                class="dropdown-m"
                style="padding: 5px 0; width: 100%;text-align: left;  margin: 0; border: unset"
                @click.native="handlerDelete(row)"
              ><p style="margin:  0;padding: 0; padding-left: 10px;"> Xóa </p></el-button>
            </el-row>

          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import permission from '@/directive/permission/permission'

export default {
  directives: { permission },
  props: {
    groupsSelected: {
      type: Array,
      require: true,
      default: function() {
        return []
      }
    },
    tableData: {
      type: Array,
      require: true,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      conditionSort: true,
      valueSort: 'Theo tên',
      optionsSort: ['Theo tên', 'Theo ngày tạo'],
      search: ''

    }
  },
  methods: {
    authorize(group) {
      this.$emit('authorize', group)
    },
    handlerDelete(row) {
      this.$emit('deleteGroup', row)
    },
    selectionChange(selection) {
      this.$emit('selectionChange', JSON.parse(JSON.stringify(selection)))
    },
    deleteGroups() {
      this.$emit('deleteGroups', null)
    },
    clickIconSort() {
      this.conditionSort = !this.conditionSort
      this.actionSort()
    },
    actionSort() {
      this.$emit('handleSort', { sortField: this.valueSort, conditionSort: this.conditionSort })
    },
    handleChangeName(row) {
      this.$emit('handleChangeName', row)
    },
    handleView(row) {
      this.$store.dispatch('group/setValueOfFilterByGroup', [row]).then(() => {
        this.$router.push({ path: '/manage-user' })
      })
    },
    convertLongToDateTagCreate(value) {
      var date = new Date(value)
      var hour = date.getHours()
      var minutes = date.getMinutes()
      var hc = 'AM'
      if (hour > 11) {
        hc = 'PM'
        if (hour > 12) {
          hour = hour - 12
        }
      }
      if (minutes < 10) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + ' ' + hour + ':0' + minutes + '' + hc
      } else {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + ' ' + hour + ':' + minutes + '' + hc
      }
    }
  }
}
</script>
<style scoped>
.ascending  {
  -moz-transform:  rotate(90deg);
  -o-transform:  rotate(90deg);
  -webkit-transform:  rotate(90deg);
  transition: transform 0.5s;
  transform: rotate(90deg);
}
.descending{
  -moz-transform:  rotate(270deg);
  -o-transform:  rotate(270deg);
  -webkit-transform:  rotate(270deg);
  transition: transform 0.5s;
  transform: rotate(270deg);
}
.label-sort-groups {
  padding-top: 4px;
}

</style>
