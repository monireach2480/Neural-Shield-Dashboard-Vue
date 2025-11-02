<template>
  <div class="bg-[#2d3139] rounded-xl p-4 overflow-hidden" style="min-height: 450px;">
    <!-- World Map with ECharts -->
    <div class="relative w-full" style="height: 450px; position: relative; min-width: 0;">
      <v-chart 
        v-if="mapReady && mapOption"
        class="w-full h-full" 
        style="display: block; width: 100%; height: 100%;"
        :option="mapOption" 
        autoresize
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-[#1f2937] rounded-lg" style="height: 450px;">
        <span class="text-gray-400">Loading map...</span>
      </div>
      
      <!-- Legend Overlay -->
      <div class="absolute top-3 right-3 bg-[#1f2937]/95 backdrop-blur-sm border border-[#374151] rounded-lg p-3 min-w-[200px] z-10">
        <div class="text-xs text-gray-300 font-semibold mb-2">Threat Intensity</div>
        <div class="space-y-1.5 mb-2">
          <div class="flex items-center gap-2 text-[10px]">
            <div class="w-2.5 h-2.5 rounded-sm bg-[#eab308]"></div>
            <span class="text-gray-400">Reports (YTD)</span>
            <span class="text-primary ml-auto text-[10px]">$10-25k</span>
          </div>
          <div class="flex items-center gap-2 text-[10px]">
            <div class="w-2.5 h-2.5 rounded-sm bg-[#ea580c]"></div>
            <span class="text-gray-400">Financial Loss</span>
            <span class="text-primary ml-auto text-[10px]">$10-25M</span>
          </div>
        </div>
        <div class="h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 mb-1.5"></div>
        <div class="flex justify-between text-[9px] text-gray-500">
          <span>Low: 0%</span>
          <span>High: 100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'WorldMapChart',
  data() {
    return {
      mapReady: false,
      mapOption: null
    }
  },
  async mounted() {
    await this.loadWorldMap()
  },
  methods: {
    async loadWorldMap() {
      try {
        // Fetch world map GeoJSON data
        const response = await fetch('https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/world.json')
        const worldGeoJson = await response.json()
        
        // Register the map
        echarts.registerMap('world', worldGeoJson)
        
        // Initialize map option
        this.mapOption = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            borderWidth: 1,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            },
            formatter: (params) => {
              if (params.seriesType === 'scatter') {
                return params.name + '<br/>Reports: ' + params.value[2].toLocaleString()
              }
              return params.name
            }
          },
          geo: {
            map: 'world',
            roam: false,
            zoom: 1.3,
            center: [0, 10],
            itemStyle: {
              areaColor: '#1f2937',
              borderColor: '#374151',
              borderWidth: 0.5,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
            emphasis: {
              itemStyle: {
                areaColor: '#2d3139',
                borderColor: '#ea580c',
                borderWidth: 1
              },
              label: {
                show: false
              }
            },
            silent: false
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [
                {name: 'USA', value: [-95, 39.5, 8000]},
                {name: 'Europe', value: [10, 50, 5000]},
                {name: 'Asia', value: [100, 35, 7500]},
                {name: 'Australia', value: [133, -25, 3000]},
                {name: 'South America', value: [-55, -15, 2500]}
              ],
              symbolSize: function (val) {
                return Math.max(15, Math.min(40, Math.sqrt(val[2]) / 8));
              },
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    { offset: 0, color: 'rgba(220, 38, 38, 0.9)' },
                    { offset: 0.5, color: 'rgba(234, 88, 12, 0.7)' },
                    { offset: 1, color: 'rgba(234, 179, 8, 0.3)' }
                  ]
                },
                borderColor: '#ea580c',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#ffffff',
                fontSize: 11,
                fontWeight: 'bold',
                offset: [10, 0]
              },
              emphasis: {
                scale: 1.3,
                itemStyle: {
                  shadowBlur: 25,
                  shadowColor: '#ea580c',
                  borderWidth: 3
                },
                label: {
                  fontSize: 13,
                  fontWeight: 'bold'
                }
              },
              animation: true,
              animationDuration: 2000,
              animationEasing: 'elasticOut'
            }
          ],
          animation: true,
          animationDuration: 1500
        }
        
        this.mapReady = true
      } catch (error) {
        console.error('Failed to load world map:', error)
        // Fallback: create a simple map option even if fetch fails
        this.mapOption = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            textStyle: { color: '#ffffff' }
          },
          geo: {
            map: 'world',
            roam: false,
            zoom: 1.3,
            center: [0, 10],
            itemStyle: {
              areaColor: '#1f2937',
              borderColor: '#374151'
            }
          },
          series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
              {name: 'USA', value: [-95, 39.5, 8000]},
              {name: 'Europe', value: [10, 50, 5000]},
              {name: 'Asia', value: [100, 35, 7500]}
            ]
          }]
        }
        this.mapReady = true
      }
    }
  }
}
</script>