<template>
  <div class="flex flex-col items-center">
    <v-chart class="w-full" :style="{ height: size + 'px' }" :option="chartOption" autoresize />
  </div>
</template>

<script>
export default {
  name: 'DonutChart',
  props: {
    data: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: 350
    }
  },
  computed: {
    chartOption() {
      return {
        backgroundColor: 'transparent',
        title: {
          text: '100%',
          subtext: 'TOTAL',
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#ea580c',
            fontSize: 32,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#9ca3af',
            fontSize: 12,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}%',
          backgroundColor: '#1f2937',
          borderColor: '#374151',
          textStyle: {
            color: '#ffffff'
          }
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          left: 'center',
          itemGap: 20,
          textStyle: {
            color: '#d1d5db',
            fontSize: 13
          },
          formatter: function(name) {
            const item = this.data.find(d => d.name === name)
            return `${name}: ${item.percentage}%`
          }.bind(this)
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '75%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#2d3139',
              borderWidth: 3
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}\n{d}%',
              color: '#d1d5db',
              fontSize: 12,
              fontWeight: 500
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowColor: 'rgba(234, 88, 12, 0.5)'
              }
            },
            data: this.data.map(item => ({
              name: item.name,
              value: item.percentage,
              itemStyle: {
                color: item.color
              }
            })),
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return idx * 100;
            }
          }
        ]
      }
    }
  }
}
</script>