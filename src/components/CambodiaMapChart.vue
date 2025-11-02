<template>
  <div class="bg-gradient-to-br from-[#1a1f2e] to-[#2d3139] rounded-xl p-4 shadow-2xl border border-[#374151]/30 w-full overflow-hidden">
    <div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-4 w-full">
      <!-- Cambodia Map & Activity Feed -->
      <div class="space-y-3">
        <!-- Map -->
        <div class="relative bg-[#0f1419] rounded-lg p-3 border border-[#374151]/20" style="height: 420px; min-height: 420px; position: relative; min-width: 0;">
          <v-chart 
            v-if="mapOption" 
            class="w-full h-full" 
            style="display: block; width: 100%; height: 100%; min-height: 420px; min-width: 0;"
            :option="mapOption" 
            autoresize 
          />
          <div v-else class="w-full h-full flex items-center justify-center" style="height: 420px; min-height: 420px;">
            <span class="text-gray-400">Loading map...</span>
          </div>
        </div>
        
        <!-- Recent Threat Activity -->
        <div class="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-lg p-3 border border-[#374151]/30">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
              <h3 class="text-sm font-bold text-gray-200 uppercase tracking-wider">Recent Threat Activity</h3>
            </div>
            <div class="text-xs text-gray-500">Last 24 hours</div>
          </div>
          
          <div class="space-y-2">
            <div v-for="(activity, index) in recentActivities" :key="index" 
                 class="flex items-start gap-2 p-2.5 bg-[#0f1419] rounded-lg border border-[#374151]/20 hover:border-orange-500/30 transition-all">
              <div class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" :class="activity.severity === 'critical' ? 'bg-red-500' : activity.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2 mb-1">
                  <div class="text-sm text-gray-300 font-medium">{{ activity.title }}</div>
                  <div class="text-xs text-gray-500 whitespace-nowrap">{{ activity.time }}</div>
                </div>
                <div class="text-xs text-gray-500">{{ activity.location }} • {{ activity.type }}</div>
              </div>
              <div class="px-2 py-1 rounded text-xs font-semibold flex-shrink-0" 
                   :class="activity.severity === 'critical' ? 'bg-red-500/10 text-red-400' : activity.severity === 'high' ? 'bg-orange-500/10 text-orange-400' : 'bg-yellow-500/10 text-yellow-400'">
                {{ activity.count }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Hotspots Panel -->
      <div class="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-lg p-4 h-fit border border-[#374151]/30 shadow-lg overflow-auto max-h-[440px]">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
          <h3 class="text-sm font-bold text-gray-200 uppercase tracking-wider">Top Threat Hotspots</h3>
        </div>
        
        <div class="space-y-2 mb-3">
          <div 
            v-for="(hotspot, index) in hotspots" 
            :key="index"
            class="group relative overflow-hidden bg-gradient-to-r from-[#2d3139] to-[#1f2937] rounded-lg p-3 hover:from-[#374151] hover:to-[#2d3139] transition-all duration-300 cursor-pointer border border-[#374151]/20 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-orange-500/30 flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-bold text-white truncate">{{ hotspot.name }}</div>
                <div class="text-xs text-orange-400 font-semibold">{{ hotspot.value.toLocaleString() }} incidents</div>
              </div>
              <svg :width="70" :height="35" class="flex-shrink-0">
                <defs>
                  <linearGradient :id="'gradient-' + index" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" :style="{stopColor: hotspot.color, stopOpacity: 0.3}" />
                    <stop offset="100%" :style="{stopColor: hotspot.color, stopOpacity: 1}" />
                  </linearGradient>
                </defs>
                <polyline 
                  :points="hotspot.trend" 
                  fill="none" 
                  :stroke="`url(#gradient-${index})`"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="drop-shadow-lg"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="relative overflow-hidden bg-gradient-to-br from-[#2d3139] to-[#1f2937] rounded-lg p-3 border border-[#374151]/20">
          <div class="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl"></div>
          <div class="relative">
            <div class="text-[10px] text-gray-400 mb-1.5 font-bold uppercase tracking-wide flex items-center gap-1.5">
              <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              Threat Intensity Legend
            </div>
            <div class="relative h-2.5 rounded-full overflow-hidden shadow-inner mb-2">
              <div class="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-600"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div class="flex justify-between text-[9px] text-gray-500 font-semibold">
              <span class="flex items-center gap-1">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Low: 0%
              </span>
              <span class="flex items-center gap-1">
                <div class="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                High: 100%
              </span>
            </div>
          </div>
        </div>

        <!-- Data Sources & Update Status Widget -->
        <div class="mt-3 bg-gradient-to-br from-[#2d3139] to-[#1f2937] rounded-lg p-3 border border-[#374151]/20">
          <div class="flex items-center justify-between mb-2">
            <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Data Sources
            </div>
            <div class="text-[10px] text-gray-500">Updated <span class="text-gray-300 font-semibold">15 min</span> ago</div>
          </div>
          <div class="flex flex-wrap gap-1.5 mb-2">
            <span class="px-2 py-1 text-[10px] rounded bg-[#0f1419] text-gray-300 border border-[#374151]/30">NeuralShield</span>
            <span class="px-2 py-1 text-[10px] rounded bg-[#0f1419] text-gray-300 border border-[#374151]/30">APWG</span>
            <span class="px-2 py-1 text-[10px] rounded bg-[#0f1419] text-gray-300 border border-[#374151]/30">IC3</span>
            <span class="px-2 py-1 text-[10px] rounded bg-[#0f1419] text-gray-300 border border-[#374151]/30">PhishTank</span>
            <span class="px-2 py-1 text-[10px] rounded bg-[#0f1419] text-gray-300 border border-[#374151]/30">CERT</span>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[10px] text-gray-400">
              <span>Freshness</span>
              <span class="text-gray-300 font-semibold">92%</span>
            </div>
            <div class="h-1.5 w-full rounded bg-[#0f1419] overflow-hidden">
              <div class="h-full w-[92%] bg-gradient-to-r from-emerald-500 via-yellow-400 to-orange-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'CambodiaMapChart',
  data() {
    return {
      hotspots: [
        { name: 'PHNOM PENH', value: 267000, trend: '0,30 15,25 30,28 45,20 60,15', color: '#dc2626' },
        { name: 'SIEM REAP', value: 98000, trend: '0,25 15,23 30,24 45,20 60,18', color: '#ea580c' },
        { name: 'SIHANOUKVILLE', value: 76000, trend: '0,28 15,26 30,23 45,22 60,20', color: '#f59e0b' }
      ],
      mapOption: null,
      provinceData: [
        { name: 'Phnom Penh', value: 267000 },
        { name: 'Siem Reap', value: 98000 },
        { name: 'Sihanoukville', value: 76000 },
        { name: 'Kandal', value: 54000 },
        { name: 'Battambang', value: 42000 },
        { name: 'Kampong Cham', value: 38000 },
        { name: 'Kampong Speu', value: 28000 },
        { name: 'Prey Veng', value: 25000 },
        { name: 'Takeo', value: 22000 },
        { name: 'Kampot', value: 18000 },
        { name: 'Pursat', value: 15000 },
        { name: 'Kampong Chhnang', value: 12000 },
        { name: 'Kampong Thom', value: 11000 },
        { name: 'Kratie', value: 9000 },
        { name: 'Banteay Meanchey', value: 8500 },
        { name: 'Svay Rieng', value: 7200 },
        { name: 'Koh Kong', value: 6500 },
        { name: 'Preah Vihear', value: 5800 },
        { name: 'Oddar Meanchey', value: 4500 },
        { name: 'Stung Treng', value: 3800 },
        { name: 'Mondulkiri', value: 2900 },
        { name: 'Ratanakiri', value: 2500 },
        { name: 'Pailin', value: 2100 },
        { name: 'Kep', value: 1500 },
        { name: 'Tboung Khmum', value: 8900 }
      ],
      recentActivities: [
        { title: 'Mass phishing campaign detected targeting banking sector', location: 'Phnom Penh', type: 'Email Phishing', severity: 'critical', count: '1,247', time: '12 min ago' },
        { title: 'SMS scam surge reported in tourist areas', location: 'Siem Reap', type: 'SMS Fraud', severity: 'high', count: '584', time: '28 min ago' },
        { title: 'Fake e-commerce websites identified', location: 'Sihanoukville', type: 'Website Fraud', severity: 'high', count: '392', time: '1 hr ago' },
        { title: 'Social media impersonation attacks increasing', location: 'Kandal', type: 'Social Engineering', severity: 'medium', count: '267', time: '2 hrs ago' },
        { title: 'Cryptocurrency investment scams detected', location: 'Battambang', type: 'Financial Fraud', severity: 'critical', count: '178', time: '3 hrs ago' }
      ]
    }
  },
  created() {
    this.initMap()
  },
  methods: {
    initMap() {
      // Register detailed Cambodia map with all provinces
      echarts.registerMap('cambodia', {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Banteay Meanchey' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [102.57, 13.58], [102.83, 13.81], [103.17, 14.11], [103.51, 14.27],
              [103.86, 14.12], [103.92, 13.76], [103.58, 13.42], [103.24, 13.28],
              [102.89, 13.35], [102.57, 13.58]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Battambang' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [102.34, 12.89], [102.57, 13.58], [102.89, 13.35], [103.24, 13.28],
              [103.51, 12.95], [103.42, 12.51], [103.08, 12.32], [102.74, 12.45],
              [102.34, 12.89]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kampong Cham' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.12, 11.95], [105.45, 12.28], [105.78, 12.45], [106.12, 12.28],
              [106.25, 11.95], [106.08, 11.62], [105.75, 11.45], [105.42, 11.52],
              [105.12, 11.95]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kampong Chhnang' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.12, 11.85], [104.45, 12.18], [104.78, 12.35], [105.12, 12.18],
              [105.08, 11.78], [104.75, 11.52], [104.42, 11.58], [104.12, 11.85]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kampong Speu' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [103.78, 11.28], [104.12, 11.52], [104.45, 11.68], [104.78, 11.52],
              [104.75, 11.18], [104.42, 10.85], [104.08, 10.78], [103.78, 11.28]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kampong Thom' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.45, 12.18], [104.78, 12.51], [105.12, 12.85], [105.45, 13.08],
              [105.78, 12.95], [105.75, 12.52], [105.42, 12.18], [105.08, 11.95],
              [104.78, 12.05], [104.45, 12.18]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kampot' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.08, 10.58], [104.42, 10.78], [104.75, 10.92], [105.08, 10.78],
              [105.12, 10.45], [104.92, 10.15], [104.58, 10.08], [104.25, 10.25],
              [104.08, 10.58]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kandal' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.58, 11.18], [104.92, 11.45], [105.25, 11.62], [105.42, 11.52],
              [105.45, 11.18], [105.25, 10.85], [104.92, 10.78], [104.58, 10.95],
              [104.58, 11.18]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kep' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.25, 10.25], [104.42, 10.35], [104.58, 10.25], [104.58, 10.08],
              [104.42, 9.98], [104.25, 10.05], [104.25, 10.25]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Koh Kong' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [102.58, 11.12], [102.92, 11.45], [103.25, 11.78], [103.58, 11.68],
              [103.78, 11.28], [103.58, 10.78], [103.25, 10.45], [102.92, 10.38],
              [102.58, 10.58], [102.58, 11.12]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Kratie' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.78, 12.45], [106.12, 12.78], [106.45, 13.08], [106.78, 13.18],
              [107.08, 12.95], [107.12, 12.52], [106.78, 12.18], [106.45, 11.95],
              [106.12, 11.88], [105.78, 12.05], [105.78, 12.45]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Mondulkiri' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [106.45, 11.95], [106.78, 12.18], [107.12, 12.35], [107.45, 12.28],
              [107.62, 11.95], [107.55, 11.52], [107.25, 11.18], [106.92, 11.08],
              [106.58, 11.25], [106.45, 11.62], [106.45, 11.95]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Oddar Meanchey' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [103.51, 14.27], [103.85, 14.42], [104.18, 14.55], [104.52, 14.68],
              [104.75, 14.52], [104.68, 14.18], [104.35, 13.95], [104.02, 13.88],
              [103.68, 14.02], [103.51, 14.27]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Pailin' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [102.58, 12.78], [102.75, 12.95], [102.92, 12.88], [102.92, 12.65],
              [102.75, 12.52], [102.58, 12.58], [102.58, 12.78]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Phnom Penh' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.82, 11.48], [104.98, 11.62], [105.15, 11.55], [105.08, 11.38],
              [104.92, 11.32], [104.82, 11.48]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Preah Vihear' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.52, 14.68], [104.85, 14.55], [105.18, 14.42], [105.52, 14.28],
              [105.78, 13.95], [105.68, 13.52], [105.35, 13.28], [105.02, 13.35],
              [104.68, 13.52], [104.52, 13.88], [104.52, 14.68]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Prey Veng' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.42, 11.52], [105.75, 11.45], [106.08, 11.35], [106.25, 11.08],
              [106.18, 10.75], [105.85, 10.65], [105.52, 10.78], [105.25, 11.08],
              [105.25, 11.38], [105.42, 11.52]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Pursat' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [103.08, 12.32], [103.42, 12.51], [103.75, 12.68], [104.08, 12.78],
              [104.42, 12.68], [104.45, 12.18], [104.12, 11.85], [103.78, 11.68],
              [103.45, 11.78], [103.12, 11.95], [103.08, 12.32]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Ratanakiri' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [106.78, 13.18], [107.12, 13.42], [107.45, 13.68], [107.62, 14.12],
              [107.38, 14.42], [107.08, 14.28], [106.75, 13.95], [106.45, 13.68],
              [106.45, 13.35], [106.78, 13.18]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Siem Reap' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [103.58, 13.42], [103.92, 13.76], [104.25, 13.95], [104.58, 14.08],
              [104.85, 13.95], [105.02, 13.68], [105.02, 13.28], [104.68, 12.95],
              [104.35, 12.88], [104.02, 12.95], [103.68, 13.08], [103.58, 13.42]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Sihanoukville' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [103.42, 10.52], [103.68, 10.72], [103.95, 10.68], [104.08, 10.45],
              [103.95, 10.22], [103.68, 10.15], [103.42, 10.28], [103.42, 10.52]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Stung Treng' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.52, 14.28], [105.85, 14.15], [106.18, 13.95], [106.45, 13.68],
              [106.45, 13.35], [106.18, 13.18], [105.85, 13.28], [105.52, 13.48],
              [105.52, 14.28]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Svay Rieng' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.85, 10.65], [106.18, 10.75], [106.52, 10.95], [106.72, 11.05],
              [106.72, 10.72], [106.52, 10.52], [106.18, 10.38], [105.85, 10.45],
              [105.85, 10.65]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Takeo' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [104.42, 10.85], [104.75, 11.08], [105.08, 11.18], [105.25, 10.95],
              [105.18, 10.62], [104.85, 10.45], [104.52, 10.38], [104.25, 10.52],
              [104.25, 10.75], [104.42, 10.85]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Tboung Khmum' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.78, 12.05], [106.08, 11.88], [106.38, 11.72], [106.58, 11.52],
              [106.52, 11.18], [106.25, 11.08], [105.95, 11.18], [105.75, 11.45],
              [105.78, 12.05]
            ]]
          }
        }
      ]
    })

    this.mapOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15, 20, 25, 0.95)',
          borderColor: '#ea580c',
          borderWidth: 2,
          padding: 16,
          textStyle: {
            color: '#ffffff',
            fontSize: 14
          },
          formatter: function(params) {
            if (params.value) {
              return '<div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #fb923c;">' + params.name + '</div>' +
                     '<div style="display: flex; align-items: center; gap: 8px;">' +
                     '<div style="width: 8px; height: 8px; background: linear-gradient(135deg, #ea580c, #dc2626); border-radius: 50%;"></div>' +
                     '<span style="color: #d1d5db;">Threat Reports:</span> <strong style="color: #fb923c;">' + params.value.toLocaleString() + '</strong>' +
                     '</div>'
            }
            return '<div style="font-weight: bold; color: #ffffff;">' + params.name + '</div>' +
                   '<div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">Province</div>'
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 270000,
          inRange: {
            color: ['#10b981', '#84cc16', '#eab308', '#f59e0b', '#fb923c', '#f97316', '#ea580c', '#dc2626', '#991b1b']
          }
        },
        series: [
          {
            name: 'Threat Distribution',
            type: 'map',
            map: 'cambodia',
            roam: true,
            layoutCenter: ['50%', '50%'],
            layoutSize: '95%',
            scaleLimit: {
              min: 1,
              max: 4
            },
            data: this.provinceData,
            itemStyle: {
              borderColor: '#1e293b',
              borderWidth: 2.5,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowOffsetY: 5
            },
            emphasis: {
              itemStyle: {
                borderColor: '#fbbf24',
                borderWidth: 3,
                shadowBlur: 25,
                shadowColor: 'rgba(251, 191, 36, 0.6)'
              },
              label: {
                show: true,
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 'bold',
                backgroundColor: 'rgba(15, 20, 25, 0.95)',
                padding: [8, 14],
                borderRadius: 8,
                borderColor: '#ea580c',
                borderWidth: 2
              }
            },
            label: {
              show: true,
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 600,
              formatter: '{b}'
            },
            select: {
              disabled: false,
              itemStyle: {
                borderColor: '#fbbf24',
                borderWidth: 3
              }
            }
          },
          {
            name: 'City Markers',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [
              {name: 'Phnom Penh', value: [104.9160, 11.5564, 267000]},
              {name: 'Siem Reap', value: [103.8590, 13.3633, 98000]},
              {name: 'Sihanoukville', value: [103.5097, 10.6095, 76000]}
            ],
            symbolSize: function (val) {
              return Math.max(20, Math.min(45, Math.sqrt(val[2]) / 22));
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 4,
              period: 4,
              color: 'rgba(251, 191, 36, 0.5)'
            },
            itemStyle: {
              color: '#fbbf24',
              borderColor: '#fde047',
              borderWidth: 3,
              shadowBlur: 35,
              shadowColor: 'rgba(251, 191, 36, 0.8)'
            },
            label: {
              show: true,
              formatter: '{b}',
              position: 'top',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'bold',
              offset: [0, -10],
              backgroundColor: 'rgba(15, 20, 25, 0.95)',
              padding: [7, 12],
              borderRadius: 8,
              borderColor: '#ea580c',
              borderWidth: 2,
              shadowBlur: 12,
              shadowColor: 'rgba(234, 88, 12, 0.6)'
            },
            zlevel: 2
          }
        ],
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicOut'
      }
    }
  }
}
</script>

<style scoped>
.v-chart {
  width: 100%;
  height: 100%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>