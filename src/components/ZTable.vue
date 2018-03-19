<template>
  <div class="z-table">
    <div class="table-wrap" :style="{ height: (pageSize + 1) * 36 + 'px'}">
      <el-table v-loading="loading"
        :data="tableData" border stripe size="mini"
        :header-cell-style="{backgroundColor: '#409eff', color: '#fff'}"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column v-for="field in fields" :key="field" :prop="field" :label="field" show-overflow-tooltip/>
      </el-table>
    </div>
    <el-pagination v-if="data.length" background layout="prev, pager, next" :total="data.length" :page-size="pageSize" :current-page.sync="index"/>
  </div>
</template>

<script>
export default {
  name: 'ZTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 7
    }
  },
  computed: {
    tableData () {
      return this.data.slice((this.index - 1) * this.pageSize, this.index * this.pageSize)
    },
    fields () {
      if (!this.data.length) {
        return []
      }
      return Object.keys(this.data[0])
    }
  },
  data () {
    return {
      index: 1
    }
  }
}
</script>

<style lang="css" scoped>
.cell {
  margin: 5px 0;
}
</style>
