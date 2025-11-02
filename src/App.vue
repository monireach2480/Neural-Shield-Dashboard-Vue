<template>
  <div id="app" class="min-h-screen bg-[#1a1d24]">
    <!-- Header -->
    <header class="bg-[#2d3139] px-8 py-4 sticky top-0 z-50 shadow-lg">
      <div class="max-w-[1600px] mx-auto flex justify-between items-center flex-wrap gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="8" stroke="white" stroke-width="2.5" fill="none"/>
              <path d="M20 12v16M12 20h16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">NeuralShield</h1>
            <p class="text-sm text-gray-400">{{ headerSubtitle }}</p>
          </div>
        </div>
        
        <nav class="flex gap-2 flex-wrap">
          <router-link 
            to="/" 
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="$route.name === 'GlobalThreat' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-dark-lighter hover:text-white'"
          >
            Global Overview
          </router-link>
          <router-link 
            to="/category" 
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="$route.name === 'Category' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-dark-lighter hover:text-white'"
          >
            Categories
          </router-link>
          <router-link 
            to="/app-report" 
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="$route.name === 'AppReport' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-dark-lighter hover:text-white'"
          >
            App Reports
          </router-link>
          <router-link 
            to="/reports-category" 
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="$route.name === 'ReportsCategory' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-dark-lighter hover:text-white'"
          >
            Report Analysis
          </router-link>
        </nav>
      </div>
    </header>
    
    <!-- Orange gradient line -->
    <div class="h-1 bg-gradient-to-r from-primary via-primary-light to-orange-400"></div>
    
    <!-- Main Content -->
    <main class="max-w-[1600px] mx-auto p-8">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    headerSubtitle() {
      const subtitles = {
        'GlobalThreat': 'Global Threat Intelligence Dashboard',
        'Category': 'Global Threat Intelligence Dashboard',
        'AppReport': 'App Report Dashboard',
        'ReportsCategory': 'Global Threat Intelligence Dashboard'
      }
      return subtitles[this.$route.name] || 'Global Threat Intelligence Dashboard'
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>