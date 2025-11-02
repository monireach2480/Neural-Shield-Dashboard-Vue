import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Import ECharts
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import * as echarts from 'echarts/core'

// Import ECharts components
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  PieChart,
  BarChart,
  LineChart,
  ScatterChart,
  MapChart,
  EffectScatterChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  GeoComponent
} from 'echarts/components'

// Register ECharts components
use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  ScatterChart,
  MapChart,
  EffectScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  GeoComponent
])

// Register Cambodia map
echarts.registerMap('cambodia', {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'Cambodia' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [102.5, 10.5], [107.5, 10.5], [107.5, 14.5], [102.5, 14.5], [102.5, 10.5]
      ]]
    }
  }]
})

// Register world map - load from reliable CDN
fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
  .then(res => res.json())
  .then(worldMapData => {
    echarts.registerMap('world', worldMapData)
    console.log('World map loaded successfully')
  })
  .catch(err => {
    console.warn('Failed to load world map from CDN, using enhanced simplified version:', err)
    // Enhanced simplified world map with better continent representation
    echarts.registerMap('world', {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'North America' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-170, 50], [-50, 50], [-50, 25], [-100, 25], [-100, 15], [-80, 10], [-70, 15], [-60, 10], [-170, 10], [-170, 50]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'South America' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-80, 12], [-35, 12], [-35, -55], [-80, -55], [-80, 12]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Europe' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-10, 70], [40, 70], [40, 35], [-10, 35], [-10, 70]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Africa' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-20, 37], [50, 37], [50, -35], [-20, -35], [-20, 37]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Asia' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [40, 80], [180, 80], [180, -10], [40, -10], [40, 80]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Australia' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [110, -10], [155, -10], [155, -45], [110, -45], [110, -10]
            ]]
          }
        }
      ]
    })
  })

const app = createApp(App)
app.component('v-chart', VChart)
app.use(router)
app.mount('#app')