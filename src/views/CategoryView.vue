<template>
  <div class="min-h-screen flex flex-col animate-fade-in">
    <div class="flex-1">
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_370px] gap-8">
        <!-- Main Content -->
        <div class="space-y-8">
          <!-- Category Distribution Donut -->
          <div class="bg-[#2d3139] rounded-xl p-8">
            <h3 class="text-2xl font-bold text-white mb-2">Category Distribution</h3>
            <p class="text-sm text-gray-400 mb-8">Percentage breakdown by threat type</p>
            <DonutChart :data="threatCategories" :size="350" />
          </div>

          <!-- Trend Chart -->
          <div class="bg-[#2d3139] rounded-xl p-8">
            <h3 class="text-2xl font-bold text-white mb-2">Global Threat Category Trends</h3>
            <p class="text-sm text-gray-400 mb-8">Monthly incident distribution across categories</p>
            <AreaChart :height="400" />
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="bg-[#2d3139] border border-[#374151] rounded-xl p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-white">Analysis</h3>
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold uppercase tracking-wide">
                Suggestion
              </span>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="(item, index) in analysisItems" 
                :key="index" 
                class="flex gap-3 p-4 bg-[#1f2937] rounded-lg transition-all duration-200 hover:bg-[#374151] hover:translate-x-1 animate-fade-in"
                :style="{ animationDelay: (index * 100) + 'ms' }"
              >
                <div 
                  class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  :class="getIconClass(item.type)"
                >
                  <component :is="getIcon(item.type)" :size="16" />
                </div>
                <p class="text-sm text-gray-300 leading-relaxed">{{ item.text }}</p>
              </div>
            </div>
            
            <div class="absolute bottom-6 right-6">
              <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 -mx-8 -mb-8">
      <div class="bg-gradient-to-r from-primary via-primary-light to-orange-400 px-8 py-4">
        <div class="max-w-[1600px] mx-auto flex justify-between items-center text-white text-sm flex-wrap gap-2">
          <div class="flex gap-2">
            <span class="font-semibold">Data Sources:</span>
            <span class="opacity-90">NeuralShield, APWG, IC3, PhishTank, CERT feeds</span>
          </div>
          <div class="font-medium">Last Updated: 15 min ago</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, AlertTriangle, Shield, Mail, MessageSquare } from 'lucide-vue-next'
import DonutChart from '../components/DonutChart.vue'
import AreaChart from '../components/AreaChart.vue'

export default {
  name: 'CategoryView',
  components: { DonutChart, AreaChart, TrendingUp, AlertTriangle, Shield, Mail, MessageSquare },
  data() {
    return {
      threatCategories: [
        { name: 'Phishing', percentage: 42, color: '#dc2626' },
        { name: 'Scam', percentage: 28, color: '#ea580c' },
        { name: 'Malware', percentage: 15, color: '#0891b2' },
        { name: 'Cyberbullying', percentage: 10, color: '#eab308' },
        { name: 'CSEA', percentage: 5, color: '#9333ea' }
      ],
      analysisItems: [
        { text: 'Phishing cases up 18% week-over-week, targeting financial services.', type: 'trend' },
        { text: 'Crypto scams rising in ASEAN region, particularly Singapore and Cambodia.', type: 'alert' },
        { text: 'AI predicts 22% increase in social engineering attacks next quarter.', type: 'alert' },
        { text: 'New defense protocols deployed across 47 partner organizations.', type: 'shield' },
        { text: 'Email-based phishing remains primary vector with 56% of incidents.', type: 'mail' },
        { text: 'Emerging threat: SMS-based investment scams in mobile banking sector.', type: 'message' }
      ]
    }
  },
  methods: {
    getIcon(type) {
      const icons = {
        trend: 'TrendingUp',
        alert: 'AlertTriangle',
        shield: 'Shield',
        mail: 'Mail',
        message: 'MessageSquare'
      }
      return icons[type] || 'AlertTriangle'
    },
    getIconClass(type) {
      const classes = {
        trend: 'bg-primary/10 text-primary',
        alert: 'bg-red-500/10 text-red-500',
        shield: 'bg-green-500/10 text-green-500',
        mail: 'bg-primary/10 text-primary',
        message: 'bg-primary/10 text-primary'
      }
      return classes[type] || 'bg-primary/10 text-primary'
    }
  }
}
</script>