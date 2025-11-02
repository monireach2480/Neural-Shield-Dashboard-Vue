# NeuralShield Dashboard - Developer Documentation

A Vue 3 dashboard application for visualizing global threat intelligence data, phishing incidents, and cybersecurity metrics using interactive charts and maps.

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 7
- **Routing**: Vue Router 4
- **Charts**: Apache ECharts 6 (via vue-echarts 8)
- **Icons**: Lucide Vue Next
- **Styling**: Tailwind CSS 3
- **Package Manager**: npm

## 📁 Project Structure

```
neuralshield-dashboard/
├── src/
│   ├── components/           # Reusable Vue components
│   │   ├── AreaChart.vue     # Area chart component (trends)
│   │   ├── BarChart.vue      # Horizontal bar chart
│   │   ├── CambodiaMapChart.vue  # Interactive Cambodia map with provinces
│   │   ├── DonutChart.vue    # Donut/pie chart
│   │   ├── KPICard.vue       # Key Performance Indicator cards
│   │   ├── LineChart.vue     # Line chart component
│   │   ├── RiskLevel.vue     # Risk level display component
│   │   ├── TrendingNews.vue  # News feed component
│   │   └── WorldMapChart.vue # Interactive world map visualization
│   ├── views/                 # Route pages
│   │   ├── GlobalThreatView.vue      # Main global threat dashboard
│   │   ├── AppReportView.vue         # App-specific reports
│   │   ├── CategoryView.vue          # Category distribution
│   │   └── ReportsCategoryView.vue   # Reports by category analysis
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── App.vue               # Root component with navigation
│   ├── main.js               # Application entry point & ECharts setup
│   └── style.css             # Global styles & Tailwind directives
├── public/                    # Static assets
├── index.html                 # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies & scripts

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern browser with ES6+ support

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will be available at `http://localhost:5173` (or next available port).

## 🏗️ Architecture Overview

### Entry Point (`src/main.js`)

**Key Responsibilities:**
- Registers ECharts components and renderers
- Registers map data (World and Cambodia GeoJSON)
- Configures Vue app with router
- Global component registration for `v-chart`

**ECharts Setup:**
```javascript
// ECharts components are registered here
use([
  CanvasRenderer,
  PieChart, BarChart, LineChart,
  MapChart, EffectScatterChart,
  GridComponent, TooltipComponent, etc.
])

// Maps are registered globally
echarts.registerMap('world', worldMapData)
echarts.registerMap('cambodia', cambodiaMapData)
```

### Component Architecture

#### Chart Components

All chart components follow a similar pattern:

1. **Props-based configuration**: Accept data and styling props
2. **Computed chart options**: Generate ECharts option objects dynamically
3. **Responsive**: Use `autoresize` directive for automatic resizing

**Example - AreaChart.vue:**
```vue
<template>
  <v-chart 
    class="w-full" 
    :style="{ height: height + 'px' }" 
    :option="chartOption" 
    autoresize 
  />
</template>

<script>
export default {
  props: {
    height: Number,
    data: Array,
    color: String
  },
  computed: {
    chartOption() {
      // Returns ECharts configuration object
    }
  }
}
</script>
```

#### Map Components

**WorldMapChart.vue:**
- Async loading of world map GeoJSON from CDN
- Fallback to simplified map if fetch fails
- Scatter plot overlay for threat locations
- Uses `geo` coordinate system

**CambodiaMapChart.vue:**
- Detailed province-level map
- Multiple data series (map + effectScatter)
- Real-time threat activity feed
- Hotspot rankings sidebar
- Map registered in `created()` hook

### Routing Structure

Routes are defined in `src/router/index.js`:

- `/` → Global Threat Overview
- `/category` → Category Distribution
- `/app-report` → App-Specific Reports (Cambodia map)
- `/reports-category` → Reports by Category Analysis

Each route has a `meta.title` for dynamic page titles.

### Styling Approach

**Tailwind CSS** is used throughout with:
- Dark theme color palette (`#1a1d24`, `#2d3139`, etc.)
- Custom primary color (orange: `#ea580c`)
- Utility-first approach
- Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`)

**Key Color Variables:**
- Background: `bg-[#1a1d24]` (dark)
- Cards: `bg-[#2d3139]`, `bg-[#1f2937]`
- Primary/Accent: `#ea580c` (orange), `#dc2626` (red)
- Text: `text-white`, `text-gray-400`

## 📊 ECharts Integration

### Component Registration

ECharts uses a modular approach - only required components are imported:

```javascript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, BarChart } from 'echarts/charts'
```

### Map Data

**World Map:**
- Primary source: GitHub (Apache ECharts test data)
- Fallback: Simplified continent-based GeoJSON (registered in `main.js`)
- Registration happens in component lifecycle

**Cambodia Map:**
- Custom GeoJSON with all 25 provinces
- Registered in `CambodiaMapChart.vue` `created()` hook
- Province boundaries defined as Polygon coordinates

### Common Patterns

**Initializing Map Options:**
```javascript
data() {
  return {
    mapReady: false,
    mapOption: null
  }
},
async mounted() {
  await this.loadMap()
},
methods: {
  async loadMap() {
    try {
      // Fetch or register map data
      echarts.registerMap('mapName', geoJsonData)
      
      // Initialize option
      this.mapOption = {
        geo: { map: 'mapName', ... },
        series: [ ... ]
      }
      
      this.mapReady = true
    } catch (error) {
      // Fallback option
      this.mapOption = { ... }
      this.mapReady = true
    }
  }
}
```

## 🔧 Development Guidelines

### Adding a New Chart

1. Create component in `src/components/`
2. Import required ECharts chart type in `main.js`
3. Follow existing chart component pattern:
   - Accept props for data/styling
   - Use computed property for option
   - Include `autoresize` directive

### Adding a New Route

1. Create view in `src/views/`
2. Add route to `src/router/index.js`
3. Add navigation link in `src/App.vue`

### Modifying Map Data

**To update Cambodia provinces:**
- Edit GeoJSON in `CambodiaMapChart.vue` → `initMap()` method
- Update `provinceData` array with new values

**To update World Map:**
- Modify fetch URL in `WorldMapChart.vue` → `loadWorldMap()`
- Or update fallback GeoJSON in `main.js`

### Data Flow

```
Component Props → Computed Option → ECharts Instance → DOM
```

## 🐛 Common Issues & Solutions

### Maps Not Rendering

**Symptoms:** Blank space where map should be

**Solutions:**
1. Check `mapReady` flag is `true`
2. Verify `mapOption` is not `null`
3. Ensure map is registered before component mounts
4. Check browser console for GeoJSON parsing errors
5. Verify ECharts components are registered in `main.js`

### Chart Not Updating

**Symptoms:** Data changes but chart doesn't reflect it

**Solutions:**
1. Ensure props are reactive (use arrays/objects, not primitives)
2. Check computed property dependencies
3. Force re-render with `this.$forceUpdate()` if needed

### Styling Issues

**Symptoms:** Components don't fit or have blank spaces

**Solutions:**
1. Check container has explicit dimensions
2. Use `min-width: 0` in grid layouts to prevent overflow
3. Verify Tailwind classes are not being overridden
4. Check for conflicting inline styles

### Build Errors

**Symptoms:** `vite build` fails

**Common causes:**
1. Missing ECharts component imports in `main.js`
2. Syntax errors in Vue components
3. Unused imports or variables
4. Missing dependencies

## 🔍 Key Components Deep Dive

### KPICard Component

Displays key metrics with:
- Icon (Lucide Vue)
- Label and value
- Subtitle
- Trend indicator (percentage change)

**Usage:**
```vue
<KPICard 
  :icon="FileText"
  label="TOTAL REPORTS"
  value="15,347"
  subtitle="YTD 2024"
  :trend="18"
/>
```

### Map Components Lifecycle

1. **Component Created/Mounted**
2. **Register Map GeoJSON** (`echarts.registerMap`)
3. **Initialize Map Option** (geo config, series data)
4. **Set Ready Flag** (`mapReady = true`)
5. **Vue Renders** (`v-if="mapReady && mapOption"`)

This ensures maps only render when data is ready.

## 📝 Data Format

### Chart Data

**BarChart/LineChart:**
```javascript
[
  { name: 'Label', value: 1234 },
  { name: 'Label2', value: 5678 }
]
```

**AreaChart:**
```javascript
[
  { month: 'Jan 2024', value: 1850 },
  { month: 'Feb', value: 1720 }
]
```

### Map Data

**Province/City Data:**
```javascript
[
  { name: 'Province Name', value: 267000 },
  // Coordinates for scatter/effectScatter:
  { name: 'City', value: [lng, lat, size] }
]
```

## 🚢 Deployment

The app is configured for static deployment:

```bash
npm run build
```

Outputs to `dist/` directory. Can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

**Environment Notes:**
- No environment variables required
- All API calls are to public CDNs
- No build-time configuration needed

## 📚 Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [ECharts Documentation](https://echarts.apache.org/)
- [Vue-ECharts Documentation](https://github.com/ecomfe/vue-echarts)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

When adding features:
1. Follow existing component patterns
2. Maintain dark theme consistency
3. Ensure responsive design (mobile-first)
4. Test map/chart rendering in different viewports
5. Update this README if architecture changes

## ⚠️ Important Notes

- **Map Loading**: World map uses async fetch - ensure fallback works offline
- **ECharts Version**: Using ECharts 6.x - API differs from 5.x
- **vue-echarts**: Version 8.x uses `v-chart` component (not `echarts`)
- **Tailwind JIT**: Configured for just-in-time compilation
- **No State Management**: Currently uses component-local state only

---

**Last Updated**: 2024  
**Version**: 0.0.0  
**Maintainer**: NeuralShield Team
