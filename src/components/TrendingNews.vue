<template>
  <div class="bg-[#2d3139] border border-[#374151] rounded-xl p-6">
    <h3 class="text-lg font-semibold text-gray-300 mb-4">Trending News</h3>
    <div class="space-y-3">
      <div 
        v-for="(item, index) in news" 
        :key="index" 
        class="flex gap-3 p-4 bg-[#1f2937] rounded-lg transition-all duration-200 hover:bg-[#374151] hover:translate-x-1 cursor-pointer animate-fade-in"
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
  </div>
</template>

<script>
import { TrendingUp, AlertTriangle, Shield, AlertCircle } from 'lucide-vue-next'

export default {
  name: 'TrendingNews',
  components: { TrendingUp, AlertTriangle, Shield, AlertCircle },
  data() {
    return {
      news: [
        { text: 'Phishing cases up 18% week-over-week, targeting financial services.', type: 'trend' },
        { text: 'Crypto scams rising in ASEAN region, particularly Singapore and Cambodia.', type: 'alert' },
        { text: 'AI predicts 22% increase in social engineering attacks next quarter.', type: 'alert' },
        { text: 'New defense protocols deployed across 47 partner organizations.', type: 'shield' }
      ]
    }
  },
  methods: {
    getIcon(type) {
      const icons = { trend: 'TrendingUp', alert: 'AlertTriangle', shield: 'Shield' }
      return icons[type] || 'AlertCircle'
    },
    getIconClass(type) {
      const classes = {
        trend: 'bg-primary/10 text-primary',
        alert: 'bg-red-500/10 text-red-500',
        shield: 'bg-green-500/10 text-green-500'
      }
      return classes[type] || 'bg-primary/10 text-primary'
    }
  }
}
</script>