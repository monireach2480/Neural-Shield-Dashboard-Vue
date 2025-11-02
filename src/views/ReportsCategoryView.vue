<template>
  <div class="min-h-screen flex flex-col animate-fade-in">
    <div class="flex-1">
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
        <!-- Main Content -->
        <div class="space-y-8">
          <!-- Horizontal Bar Chart -->
          <div class="bg-[#2d3139] rounded-xl p-8">
            <h3 class="text-2xl font-bold text-white mb-2">Reports by Category</h3>
            <p class="text-sm text-gray-400 mb-8">NeuralShield</p>
            <HorizontalBarChart :data="reportCategories" />
          </div>

          <!-- Donut Chart -->
          <div class="bg-[#2d3139] rounded-xl p-8">
            <h3 class="text-2xl font-bold text-white mb-2">Report by Category</h3>
            <p class="text-sm text-gray-400 mb-8">Percentage breakdown by treat type</p>
            <DonutChart :data="threatCategories" :size="350" />
          </div>
        </div>

        <!-- Analysis Sidebar -->
        <div class="bg-[#2d3139] border border-[#374151] rounded-xl p-6 relative h-fit">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white">Analysis</h3>
            <span class="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold uppercase tracking-wide">
              Suggestion
            </span>
          </div>
          
          <div class="space-y-3 pb-16">
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
            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <line x1="9" y1="10" x2="15" y2="10"/>
                <line x1="9" y1="14" x2="15" y2="14"/>
              </svg>
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
import HorizontalBarChart from '../components/HorizontalBarChart.vue'

export default {
  name: 'ReportsCategoryView',
  components: { DonutChart, HorizontalBarChart, TrendingUp, AlertTriangle, Shield, Mail, MessageSquare },
  data() {
    return {
      reportCategories: [
        { name: 'Online Scams & Phishing', value: 320000 },
        { name: 'Other / Not Listed', value: 180000 },
        { name: 'Cyberbullying & Online Harassment', value: 95000 },
        { name: 'Impersonation & Identity Misuse', value: 85000 },
        { name: 'Privacy Violation & Doxxing', value: 75000 },
        { name: 'Child Sexual Exploitation (CSE)', value: 70000 },
        { name: 'Misinformation & Disinformation', value: 65000 },
        { name: 'Hate Speech & Discrimination', value: 60000 },
        { name: 'Spam & Malicious Links', value: 55000 },
        { name: 'Violent or Graphic Content', value: 50000 },
        { name: 'Terrorism & Violent Extremism', value: 45000 },
        { name: 'Self-Harm or Suicide Encouragement', value: 40000 }
      ],
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