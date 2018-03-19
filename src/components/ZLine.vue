<template>
  <div class="z-line" :style="{ width, height }" ref="chart"></div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'ZLine',
  props: {
    title: {
      type: String,
      default: '折线图'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    'data': 'refresh',
    'label': 'refresh',
    'values': 'refresh'
  },
  methods: {
    refresh () {
      if (!this.data.length) {
        return
      }
      const series = this.values.map(value => {
        return {
          name: value,
          type: 'line',
          data: this.data.map(item => item[value])
        }
      })

      this.chart.setOption({
        title: {
          text: this.title
        },
        tooltip: {},
        legend: {},
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: -20
          },
          data: this.data.map(item => item[this.label])
        },
        yAxis: {
          max: value => value.max + (value.max - value.min) / 4,
          min: value => value.min - (value.max - value.min) / 4
        },
        series
      }, true)
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.refresh()
  }
}
</script>

<style lang="css" scoped>
</style>
