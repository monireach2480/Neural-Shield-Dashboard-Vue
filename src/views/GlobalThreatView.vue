<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <div>
      <h2 class="text-4xl font-bold text-white mb-2">Global Threat Distribution</h2>
      <p class="text-gray-400 text-lg">Real-time phishing and scam incidents worldwide</p>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KPICard 
        :icon="FileText"
        label="TOTAL REPORTS"
        value="15,347"
        subtitle="YTD 2024"
        :trend="18"
      />
      <KPICard 
        :icon="Users"
        label="VICTIMS AFFECTED"
        value="42,816"
        subtitle="Individuals"
        :trend="8"
      />
      <KPICard 
        :icon="DollarSign"
        label="FINANCIAL LOSS"
        value="$34.2M"
        subtitle="USD Total"
        :trend="12"
      />
      <div class="h-full">
        <RiskLevel level="Critical" scope="Global" />
      </div>
    </div>

    <!-- World Map Full Width -->
    <WorldMapChart />

    <!-- News Full Width -->
    <TrendingNews />

    <!-- Trend Insights Section -->
    <div>
      <h3 class="text-2xl font-bold text-white mb-4">Trend Insights</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <!-- Global Incident Trends -->
        <div class="bg-[#2d3139] rounded-xl p-6 min-h-[260px]">
          <h4 class="text-sm font-semibold text-gray-400 mb-4">Global Incident Trends (2024-2025)</h4>
          <LineChart 
            :data="incidentTrends"
            color="#22d3ee"
            height="200"
          />
        </div>

        <!-- Global Financial Loss -->
        <div class="bg-[#2d3139] rounded-xl p-6 min-h-[260px]">
          <h4 class="text-sm font-semibold text-gray-400 mb-4">Global Financial Loss (>$25k)</h4>
          <AreaChart 
            :data="financialLossTrends"
            color="#ef4444"
            height="200"
          />
        </div>

        <!-- Global Financial Loss by Month -->
        <div class="bg-[#2d3139] rounded-xl p-6 min-h-[260px]">
          <h4 class="text-sm font-semibold text-gray-400 mb-4">Global Financial Loss by Month</h4>
          <AreaChart 
            :data="monthlyLossTrends"
            color="#f97316"
            height="200"
          />
        </div>
      </div>
    </div>

    <!-- Bottom: Threat Sources -->
    <div class="bg-[#2d3139] rounded-xl p-6">
      <div class="mb-4">
        <h3 class="text-2xl font-bold text-white mb-2">Top Global Threat Sources</h3>
        <p class="text-sm text-gray-400">Leading indicators by country, sector, and attack vector</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div class="bg-[#1f2937] rounded-xl p-6 overflow-hidden">
          <h4 class="text-lg font-semibold text-gray-300 mb-4">Top Countries</h4>
          <BarChart :data="topCountries" />
        </div>
        
        <div class="bg-[#1f2937] rounded-xl p-6 overflow-hidden">
          <h4 class="text-lg font-semibold text-gray-300 mb-4">Industry Sectors</h4>
          <BarChart :data="industrySectors" />
        </div>
        
        <div class="bg-[#1f2937] rounded-xl p-6 overflow-hidden">
          <h4 class="text-lg font-semibold text-gray-300 mb-4">Attack Vectors</h4>
          <BarChart :data="attackVectors" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FileText, Users, DollarSign } from 'lucide-vue-next'
import WorldMapChart from '../components/WorldMapChart.vue'
import KPICard from '../components/KPICard.vue'
import RiskLevel from '../components/RiskLevel.vue'
import TrendingNews from '../components/TrendingNews.vue'
import BarChart from '../components/BarChart.vue'
import LineChart from '../components/LineChart.vue'
import AreaChart from '../components/AreaChart.vue'

export default {
  name: 'GlobalThreatView',
  components: { 
    WorldMapChart, 
    KPICard, 
    RiskLevel, 
    TrendingNews, 
    BarChart,
    LineChart,
    AreaChart
  },
  data() {
    return {
      FileText, Users, DollarSign,
      
      // Trend data
      incidentTrends: [
        { month: 'Jan 2024', value: 1850 },
        { month: 'Feb', value: 1720 },
        { month: 'Mar', value: 1650 },
        { month: 'Apr', value: 1580 },
        { month: 'May', value: 1500 },
        { month: 'Jun', value: 1450 },
        { month: 'Jul', value: 1380 },
        { month: 'Aug', value: 1320 },
        { month: 'Sep', value: 1280 },
        { month: 'Oct', value: 1200 }
      ],
      
      financialLossTrends: [
        { month: 'Jan 2024', value: 4200 },
        { month: 'Feb', value: 4100 },
        { month: 'Mar', value: 3950 },
        { month: 'Apr', value: 3800 },
        { month: 'May', value: 3700 },
        { month: 'Jun', value: 3550 },
        { month: 'Jul', value: 3400 },
        { month: 'Aug', value: 3250 },
        { month: 'Sep', value: 3100 },
        { month: 'Oct', value: 2950 }
      ],
      
      monthlyLossTrends: [
        { month: 'Jan 2024', value: 3800 },
        { month: 'Feb', value: 3650 },
        { month: 'Mar', value: 3500 },
        { month: 'Apr', value: 3400 },
        { month: 'May', value: 3300 },
        { month: 'Jun', value: 3200 },
        { month: 'Jul', value: 3050 },
        { month: 'Aug', value: 2950 },
        { month: 'Sep', value: 2850 },
        { month: 'Oct', value: 2750 }
      ],
      
      topCountries: [
        { name: 'USA', value: 6000 },
        { name: 'India', value: 3500 },
        { name: 'UK', value: 2200 },
        { name: 'Australia', value: 1800 },
        { name: 'Cambodia', value: 1500 }
      ],
      
      industrySectors: [
        { name: 'Banking', value: 6000 },
        { name: 'E-commerce', value: 5500 },
        { name: 'Government', value: 3500 },
        { name: 'Education', value: 3000 },
        { name: 'Healthcare', value: 2000 }
      ],
      
      attackVectors: [
        { name: 'Email', value: 8000 },
        { name: 'SMS', value: 6000 },
        { name: 'Social Media', value: 4500 },
        { name: 'Website', value: 3500 },
        { name: 'Phone', value: 2000 }
      ]
    }
  }
}
</script>