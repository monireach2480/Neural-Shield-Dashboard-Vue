<template>
    <div :style="{ height: height + 'px' }">
      <svg :width="width" :height="height" class="w-full">
        <!-- Grid lines -->
        <line 
          v-for="i in 5" 
          :key="'grid-' + i"
          :x1="padding"
          :y1="padding + (chartHeight / 4) * (i - 1)"
          :x2="width - padding"
          :y2="padding + (chartHeight / 4) * (i - 1)"
          stroke="#374151"
          stroke-width="1"
          opacity="0.3"
        />
        
        <!-- Line path -->
        <path
          :d="linePath"
          :stroke="color"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        
        <!-- Data points -->
        <circle
          v-for="(point, i) in dataPoints"
          :key="'point-' + i"
          :cx="point.x"
          :cy="point.y"
          r="4"
          :fill="color"
        />
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LineChart',
    props: {
      data: {
        type: Array,
        required: true,
        default: () => []
      },
      color: {
        type: String,
        default: '#22d3ee'
      },
      height: {
        type: [Number, String],
        default: 200
      }
    },
    data() {
      return {
        width: 400,
        padding: 20
      }
    },
    computed: {
      chartHeight() {
        return this.height - this.padding * 2
      },
      chartWidth() {
        return this.width - this.padding * 2
      },
      maxValue() {
        return Math.max(...this.data.map(d => d.value))
      },
      minValue() {
        return Math.min(...this.data.map(d => d.value))
      },
      dataPoints() {
        const points = []
        this.data.forEach((item, i) => {
          const x = this.padding + (this.chartWidth / (this.data.length - 1)) * i
          const normalizedValue = (item.value - this.minValue) / (this.maxValue - this.minValue)
          const y = this.height - this.padding - normalizedValue * this.chartHeight
          points.push({ x, y })
        })
        return points
      },
      linePath() {
        if (this.dataPoints.length === 0) return ''
        
        let path = `M ${this.dataPoints[0].x} ${this.dataPoints[0].y}`
        
        for (let i = 1; i < this.dataPoints.length; i++) {
          path += ` L ${this.dataPoints[i].x} ${this.dataPoints[i].y}`
        }
        
        return path
      }
    },
    mounted() {
      this.updateWidth()
      window.addEventListener('resize', this.updateWidth)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateWidth)
    },
    methods: {
      updateWidth() {
        this.width = this.$el.clientWidth || 400
      }
    }
  }
  </script>