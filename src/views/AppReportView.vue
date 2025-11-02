<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <div>
      <h2 class="text-4xl font-bold text-white mb-2">NeuralShield Threat Distribution</h2>
      <p class="text-gray-400 text-lg">Phishing and scam incidents from Neuralshield Report</p>
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

    <!-- Cambodia Map Full Width -->
    <CambodiaMapChart />

    <!-- News Full Width -->
    <TrendingNews />

    <!-- Bottom: Threat Sources -->
    <div class="bg-[#2d3139] rounded-xl p-6">
      <div class="mb-4">
        <h3 class="text-2xl font-bold text-white mb-2">Top Global Threat Sources</h3>
        <p class="text-sm text-gray-400">Leading indicators by country, sector, and attack vector</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div class="bg-[#1f2937] rounded-lg p-5 overflow-hidden">
          <h4 class="text-base font-semibold text-gray-300 mb-4">Top Countries</h4>
          <BarChart :data="topCountries" />
        </div>
        
        <div class="bg-[#1f2937] rounded-lg p-5 overflow-hidden">
          <h4 class="text-base font-semibold text-gray-300 mb-4">Industry Sectors</h4>
          <BarChart :data="industrySectors" />
        </div>
        
        <div class="bg-[#1f2937] rounded-lg p-5 overflow-hidden">
          <h4 class="text-base font-semibold text-gray-300 mb-4">Attack Vectors</h4>
          <BarChart :data="attackVectors" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FileText, Users, DollarSign } from 'lucide-vue-next'
import CambodiaMapChart from '../components/CambodiaMapChart.vue'
import KPICard from '../components/KPICard.vue'
import RiskLevel from '../components/RiskLevel.vue'
import TrendingNews from '../components/TrendingNews.vue'
import BarChart from '../components/BarChart.vue'

export default {
  name: 'AppReportView',
  components: { CambodiaMapChart, KPICard, RiskLevel, TrendingNews, BarChart },
  data() {
    return {
      FileText, Users, DollarSign,
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