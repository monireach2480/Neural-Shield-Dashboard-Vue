<template>
  <div class="bg-[#2d3139] border-2 border-red-600 rounded-xl p-8 text-center transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-red-600/30 animate-fade-in">
    <div class="w-20 h-20 mx-auto mb-4 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 animate-pulse-slow">
      <AlertTriangle :size="48" />
    </div>
    <div class="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">RISK LEVEL</div>
    <div class="text-5xl font-bold text-red-600 mb-2">{{ level }}</div>
    <div class="text-lg text-gray-400 font-medium">{{ scope }}</div>
  </div>
</template>

<script>
import { AlertTriangle } from 'lucide-vue-next'

export default {
  name: 'RiskLevel',
  components: {
    AlertTriangle
  },
  props: {
    level: { type: String, default: 'Critical' },
    scope: { type: String, default: 'Global' }
  }
}
</script>