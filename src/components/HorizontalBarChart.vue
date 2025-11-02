<template>
  <v-chart class="w-full" :style="{ height: (data.length * 35) + 'px' }" :option="chartOption" autoresize />
</template>

<script>
export default {
  name: 'HorizontalBarChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartOption() {
      const gradients = [
        ['#dc2626', '#ea580c', '#f59e0b'],
        ['#ea580c', '#f59e0b'],
        ['#f59e0b', '#fbbf24'],
        ['#fbbf24', '#eab308'],
        ['#eab308', '#a3e635'],
        ['#a3e635', '#4ade80'],
        ['#4ade80', '#10b981'],
        ['#10b981', '#14b8a6'],
        ['#14b8a6', '#06b6d4'],
        ['#06b6d4', '#0ea5e9'],
        ['#0ea5e9', '#3b82f6'],
        ['#3b82f6', '#6366f1']
      ]
      
      return {
        backgroundColor: 'transparent',
        grid: {
          left: '35%',
          right: '5%',
          top: 10,
          bottom: 10,
          containLabel: false
        },
        xAxis: {
          type: 'value',
          show: false
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
            margin: 15
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
                  colorStops: gradients[index % gradients.length].map((color, i) => ({
                    offset: i / (gradients[index % gradients.length].length - 1),
                    color: color
                  }))
                },
                borderRadius: [0, 3, 3, 0]
              }
            })),
            barWidth: '50%',
            showBackground: true,
            backgroundStyle: {
              color: '#1f2937',
              borderRadius: [0, 3, 3, 0]
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
            animationDelay: function (idx) {
              return idx * 50;
            }
          }
        ]
      }
    }
  }
}
</script>