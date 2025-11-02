<template>
  <v-chart class="w-full" :style="{ height: height + 'px' }" :option="chartOption" autoresize />
</template>

<script>
export default {
  name: 'AreaChart',
  props: {
    height: {
      type: Number,
      default: 200
    },
    data: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#ea580c'
    }
  },
  data() {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    }
  },
  computed: {
    chartOption() {
      const hasData = this.data && this.data.length > 0
      const chartData = hasData ? this.data.map(d => d.value) : []
      const labels = hasData ? this.data.map(d => d.month || d.name) : this.months
      
      return {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#374151'
            }
          },
          backgroundColor: '#1f2937',
          borderColor: '#374151',
          borderWidth: 1,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          formatter: (params) => {
            if (params && params[0]) {
              return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value.toLocaleString()}`
            }
            return ''
          }
        },
        grid: {
          left: 40,
          right: 20,
          top: 20,
          bottom: 30,
          containLabel: false
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: labels,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9ca3af',
            fontSize: 11
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9ca3af',
            fontSize: 11,
            formatter: function(value) {
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value
            }
          },
          splitLine: {
            lineStyle: {
              color: '#374151',
              type: 'dashed',
              opacity: 0.3
            }
          }
        },
        series: [{
          name: 'Trend',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2.5,
            color: this.color
          },
          areaStyle: {
            opacity: 0.6,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: this.hexToRgba(this.color, 0.8) },
                { offset: 1, color: this.hexToRgba(this.color, 0.1) }
              ]
            }
          },
          emphasis: {
            focus: 'series'
          },
          animation: true,
          animationDuration: 1500,
          animationEasing: 'cubicOut',
          data: chartData.length > 0 ? chartData : [110, 95, 90, 80, 70, 55, 45, 35, 25, 20]
        }]
      }
    }
  },
  methods: {
    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }
}
</script>