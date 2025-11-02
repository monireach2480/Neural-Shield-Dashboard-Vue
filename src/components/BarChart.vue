<template>
  <div class="w-full" :style="{ height: (data.length * 50 + 40) + 'px' }">
    <v-chart class="w-full h-full" :option="chartOption" autoresize />
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartOption() {
      const maxValue = Math.max(...this.data.map(d => d.value))
      return {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: '#1f2937',
          borderColor: '#374151',
          borderWidth: 1,
          textStyle: {
            color: '#ffffff'
          },
          formatter: function(params) {
            return params[0].name + ': ' + params[0].value.toLocaleString()
          }
        },
        grid: {
          left: '25%',
          right: '15%',
          top: 10,
          bottom: 10,
          containLabel: false
        },
        xAxis: {
          type: 'value',
          show: false,
          max: maxValue * 1.1,
          min: 0
        },
        yAxis: {
          type: 'category',
          data: this.data.map(d => d.name),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#d1d5db',
            fontSize: 13,
            fontWeight: 500,
            align: 'right',
            margin: 10
          },
          inverse: true
        },
        series: [
          {
            type: 'bar',
            data: this.data.map((d, index) => ({
              value: d.value,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 0,
                  colorStops: [
                    { offset: 0, color: '#dc2626' },
                    { offset: 0.5, color: '#ea580c' },
                    { offset: 1, color: '#f59e0b' }
                  ]
                },
                borderRadius: [0, 4, 4, 0]
              }
            })),
            barWidth: '60%',
            showBackground: true,
            backgroundStyle: {
              color: '#1f2937',
              borderRadius: [0, 4, 4, 0]
            },
            label: {
              show: true,
              position: 'right',
              color: '#9ca3af',
              fontSize: 12,
              fontWeight: 600,
              formatter: '{c}'
            },
            animation: true,
            animationDuration: 1500,
            animationEasing: 'cubicOut',
            animationDelay: function (idx) {
              return idx * 120;
            },
            animationDurationUpdate: 300
          }
        ]
      }
    }
  }
}
</script>