<template>
  <div id="IndexPage">
    <el-row :gutter="20" :style="{ margin: '10px 0'}">
      <el-col :span="5">
        <el-cascader
          expand-trigger="hover"
          placeholder="请选择工序"
          :show-all-levels="false"
          :options="options"
          v-model="selected"
        />
      </el-col>
      <el-col :span="7">
        <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>
      <el-col :span="3">
        <el-button @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <z-table :data="weeklyData" :loading="loading"/>
    <el-row :gutter="20" v-if="weeklyData.length">
      <el-col :span="12">
        <z-bar title="工序产量图" height="350px" :data="weeklyData" label="日期" :values="['产量']"/>
      </el-col>
      <el-col :span="12">
        <z-line title="工序合格率" height="350px" :data="weeklyData" label="日期" :values="['合格率']"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchProcessOptions, fetchWeeklyData } from '@/api'
import ZTable from '@/components/ZTable'
import ZBar from '@/components/ZBar'
import ZLine from '@/components/ZLine'

export default {
  name: 'IndexPage',
  data () {
    return {
      loading: false,
      selected: [],
      options: [],
      dates: [new Date(Date.now() - 7 * 24 * 3600 * 1000), new Date(Date.now())],
      weeklyData: []
    }
  },
  components: {
    ZTable,
    ZBar,
    ZLine
  },
  computed: {
    groupCode () {
      return this.selected[0]
    },
    processCode () {
      return this.selected[1]
    }
  },
  methods: {
    search () {
      if (!this.processCode) {
        return this.$message({ showClose: true, message: '请选择工序', type: 'error' })
      }
      if (!this.dates) {
        return this.$message({ showClose: true, message: '请选择日期', type: 'error' })
      }
      this.loading = true
      const [startDate, endDate] = this.dates.map(d => d.toLocaleDateString().replace(/\//g, '-'))
      fetchWeeklyData(this.processCode, startDate, endDate).then(data => {
        this.weeklyData = data
        this.loading = false
      })
    },
    initProcessOptions () {
      fetchProcessOptions().then(data => {
        const options = []
        data.map(item => {
          const [value, label, subValue, subLabel] = Object.values(item)
          const index = options.findIndex(opt => opt.label === label)
          if (~index) {
            options[index].children.push({ label: subLabel, value: subValue })
          } else {
            options.push({ label, value, children: [{ label: subLabel, value: subValue }] })
          }
        })
        this.options = options
      })
    }
  },
  created () {
    this.initProcessOptions()
  }
}
</script>

<style lang="css" scoped>
</style>
