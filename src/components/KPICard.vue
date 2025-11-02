<template>
  <div class="bg-[#2d3139] border border-[#374151] rounded-xl p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 animate-fade-in">
    <div class="flex justify-between items-start mb-4">
      <!-- Icon -->
      <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <component :is="icon" :size="20" />
      </div>
      
      <!-- Trend -->
      <div class="flex items-center gap-1 text-sm font-semibold" :class="trend > 0 ? 'text-green-500' : 'text-red-500'">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4l4 4H4l4-4z" v-if="trend > 0"/>
          <path d="M8 12l4-4H4l4 4z" v-else/>
        </svg>
        <span>{{ Math.abs(trend) }}%</span>
      </div>
    </div>
    
    <!-- Label -->
    <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">{{ label }}</div>
    
    <!-- Value -->
    <div class="text-3xl font-bold text-primary mb-1">{{ value }}</div>
    
    <!-- Subtitle -->
    <div class="text-sm text-gray-500">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'KPICard',
  props: {
    icon: Object,
    label: String,
    value: String,
    subtitle: String,
    trend: Number
  }
}
</script>