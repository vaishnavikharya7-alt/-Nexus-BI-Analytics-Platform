import KPI from './components/KPI.js';
import ChartBox from './components/ChartBox.js';

// --- MOCK DATA ---
const allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const data = {
  monthly: {
    labels: allMonths,
    revenue: [42000,48000,45000,51000,53000,58000,62000,59000,64000,68000,72000,78000],
    expenses: [28000,30000,29000,31000,32000,34000,35000,33000,36000,37000,38000,40000],
    prevRevenue: [38000,41000,40000,44000,46000,50000,53000,51000,55000,59000,62000,67000]
  },
  categories: {
    labels: ['Electronics','Clothing','Home & Garden','Sports','Books','Food & Bev'],
    values: [35,22,18,12,8,5],
    colors: ['#00E5A0','#FFB020','#FF6B6B','#7C5CFC','#00B4D8','#E879F9']
  },
  kpis: [
    { label:'Total Revenue', value:702000, prefix:'$', suffix:'', change:14.2, icon:'fa-dollar-sign', color:'#00E5A0', sparkData:[42,48,45,51,53,58,62,59,64,68,72,78] },
    { label:'Active Users', value:24850, prefix:'', suffix:'', change:8.7, icon:'fa-users', color:'#00B4D8', sparkData:[18,19,20,21,20,22,23,22,24,24,25,25] },
    { label:'Conversion Rate', value:6.6, prefix:'', suffix:'%', change:2.1, icon:'fa-arrow-trend-up', color:'#FFB020', sparkData:[5.2,5.5,5.8,5.9,6.0,6.1,6.2,6.0,6.3,6.4,6.5,6.6] },
    { label:'Avg Order Value', value:128, prefix:'$', suffix:'', change:-1.3, icon:'fa-receipt', color:'#7C5CFC', sparkData:[135,132,130,131,129,128,130,127,126,128,129,128] }
  ]
};

export default function App() {
  // 1. Render KPIs
  const kpiGrid = document.getElementById('kpiGrid');
  kpiGrid.innerHTML = data.kpis.map(kpi => KPI(kpi)).join('');
  
  // Attach sparkline data after render
  document.querySelectorAll('.sparkline-canvas').forEach((canvas, i) => {
    canvas.dataset.values = JSON.stringify(data.kpis[i].sparkData);
  });

  // 2. Render Charts
  const chartRow1 = document.getElementById('chartRow1');
  chartRow1.innerHTML = `
    ${ChartBox({ 
      id: 'revenueChart', 
      title: 'Revenue Trend', 
      subtitle: 'Monthly revenue vs previous year',
      actions: `
        <button class="btn btn-ghost btn-sm" onclick="window.toggleRevChart('line')" id="revLineBtn" style="color:#00E5A0;"><i class="fas fa-chart-line"></i></button>
        <button class="btn btn-ghost btn-sm" onclick="window.toggleRevChart('bar')" id="revBarBtn"><i class="fas fa-chart-column"></i></button>
      `
    })}
    ${ChartBox({ id: 'categoryChart', title: 'Sales by Category', subtitle: 'Revenue distribution' })}
  `;

  // Return initialization function to be called by index.js
  return {
    data,
    initCharts: () => window.initAllCharts(data)
  };
}