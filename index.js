import App from './src/App.js';

// --- GLOBAL STYLES ---
const style = document.createElement('style');
style.textContent = `
  :root {
    --bg-primary: #0A0E1A; --bg-secondary: #111827; --bg-card: #1A2035;
    --border: #2A3352; --border-light: #354170;
    --accent: #00E5A0; --accent-dim: rgba(0,229,160,0.15); --accent-glow: rgba(0,229,160,0.3);
    --amber: #FFB020; --amber-dim: rgba(255,176,32,0.15);
    --coral: #FF6B6B; --coral-dim: rgba(255,107,107,0.15);
    --violet: #7C5CFC; --violet-dim: rgba(124,92,252,0.15);
    --cyan: #00B4D8; --pink: #E879F9;
    --text-primary: #F1F5F9; --text-secondary: #94A3B8; --text-muted: #64748B;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'DM Sans',sans-serif; background:var(--bg-primary); color:var(--text-primary); min-height:100vh; }
  h1,h2,h3,h4,h5,h6 { font-family:'Space Grotesk',sans-serif; }
  ::-webkit-scrollbar { width:6px; height:6px; }
  ::-webkit-scrollbar-track { background:var(--bg-secondary); }
  ::-webkit-scrollbar-thumb { background:var(--border-light); border-radius:3px; }

  .bg-grid {
    background-image: linear-gradient(rgba(42,51,82,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,51,82,0.3) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px;
    padding: 22px; transition: all 0.3s; position: relative; overflow: hidden;
  }
  .card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--border-light),transparent); }
  .card:hover { border-color:var(--border-light); transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,0,0,0.3); }

  .kpi-card {
    background:var(--bg-card); border:1px solid var(--border); border-radius:14px;
    padding:20px 22px; transition:all 0.3s; position:relative; overflow:hidden;
  }
  .kpi-card:hover { border-color:var(--border-light); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.3); }
  .kpi-glow { position:absolute; top:-30px; right:-30px; width:100px; height:100px; border-radius:50%; filter:blur(40px); opacity:0.15; }

  .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600; }
  .badge-up { background:var(--accent-dim); color:var(--accent); }
  .badge-down { background:var(--coral-dim); color:var(--coral); }

  .btn { display:inline-flex; align-items:center; gap:8px; padding:9px 18px; border-radius:10px; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; border:none; font-family:'DM Sans',sans-serif; }
  .btn-primary { background:var(--accent); color:#0A0E1A; }
  .btn-primary:hover { background:#00CC8E; transform:translateY(-1px); box-shadow:0 4px 20px var(--accent-glow); }
  .btn-ghost { background:transparent; color:var(--text-secondary); }
  .btn-ghost:hover { background:rgba(255,255,255,0.05); color:var(--text-primary); }
  .btn-sm { padding:6px 12px; font-size:12px; border-radius:8px; }

  .status-dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
  .status-dot.live { background:var(--accent); box-shadow:0 0 8px var(--accent-glow); animation:pulse-dot 2s infinite; }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }

  .toast-container { position:fixed; top:20px; right:20px; z-index:200; display:flex; flex-direction:column; gap:10px; }
  .toast { padding:14px 20px; border-radius:12px; font-size:13px; font-weight:500; display:flex; align-items:center; gap:10px; min-width:300px; animation:toastIn 0.4s; border:1px solid var(--border); background:var(--bg-card); }
  .toast.success { color:var(--accent); }
  .toast.info { color:var(--cyan); }
  .toast-exit { animation:toastOut 0.3s forwards; }
  @keyframes toastIn { from{opacity:0;transform:translateX(60px);} to{opacity:1;transform:translateX(0);} }
  @keyframes toastOut { to{opacity:0;transform:translateX(60px);} }

  .loading-screen { position:fixed; inset:0; background:var(--bg-primary); z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; transition:opacity 0.5s,visibility 0.5s; }
  .loading-screen.hidden { opacity:0; visibility:hidden; }
  .loader-ring { width:48px; height:48px; border:3px solid var(--border); border-top-color:var(--accent); border-radius:50%; animation:spin 0.8s linear infinite; }
  @keyframes spin { to{transform:rotate(360deg);} }
  
  .bg-blob { position:fixed; border-radius:50%; filter:blur(120px); opacity:0.06; pointer-events:none; z-index:0; }
`;
document.head.appendChild(style);

// Load Fonts & Icons
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap';
document.head.appendChild(fontLink);

const iconLink = document.createElement('link');
iconLink.rel = 'stylesheet';
iconLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
document.head.appendChild(iconLink);

// Load Chart.js dynamically
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
chartScript.onload = () => startApp();
document.body.appendChild(chartScript);

// --- APP LOGIC ---
let charts = {};
let revChartType = 'line';

function startApp() {
  // Build HTML Shell
  document.body.innerHTML = `
    <div class="bg-blob" style="width:600px;height:600px;background:var(--accent);top:-200px;right:-100px;"></div>
    <div class="bg-blob" style="width:500px;height:500px;background:var(--violet);bottom:-150px;left:-100px;"></div>
    <div class="loading-screen" id="loadingScreen"><div class="loader-ring"></div><p style="margin-top:20px;color:var(--text-muted);font-size:14px;">Loading Nexus BI...</p></div>
    <div class="toast-container" id="toastContainer"></div>
    
    <main style="position:relative;z-index:1;padding:28px;max-width:1400px;margin:0 auto;">
      <header style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;">
        <div>
          <h1 style="font-size:26px;font-weight:700;display:flex;align-items:center;gap:12px;">
            <span style="color:var(--accent);">Nexus</span> BI Dashboard
          </h1>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
            <span class="status-dot live"></span>
            <span style="font-size:12px;color:var(--text-muted);">Live data — Updated <span id="lastUpdate">just now</span></span>
          </div>
        </div>
        <div style="display:flex;gap:10px;">
          <select class="btn btn-ghost" id="dateRange" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);border-radius:10px;padding:8px 14px;" onchange="window.handleDateChange(this.value)">
            <option value="12m">Last 12 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="3m">Last 3 Months</option>
          </select>
          <button class="btn btn-primary" onclick="window.exportCSV()"><i class="fas fa-download"></i> Export CSV</button>
        </div>
      </header>

      <div class="kpi-grid" id="kpiGrid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:28px;"></div>
      <div id="chartRow1" style="display:grid;grid-template-columns:2fr 1fr;gap:18px;margin-bottom:18px;"></div>
      <div id="chartRow2" style="display:grid;grid-template-columns:1fr 1fr;gap:18px;"></div>
    `;

  // Mount React-like Components
  const appState = App();
  
  // Render Bottom Charts manually to keep it simple
  document.getElementById('chartRow2').innerHTML = `
    <div class="card">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:18px;">Revenue vs Expenses</h3>
      <div style="height:280px;"><canvas id="perfChart"></canvas></div>
    </div>
    <div class="card">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:18px;">Channel Performance</h3>
      <div style="height:280px;display:flex;align-items:center;justify-content:center;"><canvas id="radarChart"></canvas></div>
    </div>
  `;

  // Init Charts
  appState.initCharts();
  animateKPIs();
  
  setTimeout(() => document.getElementById('loadingScreen').classList.add('hidden'), 600);
}

// --- CHART BUILDER ---
function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

window.initAllCharts = (data) => {
  Object.values(charts).forEach(c => c.destroy());
  charts = {};
  const m = data.monthly;

  // 1. Revenue Chart
  const revCtx = document.getElementById('revenueChart').getContext('2d');
  const grad = revCtx.createLinearGradient(0,0,0,280);
  grad.addColorStop(0, 'rgba(0,229,160,0.25)'); grad.addColorStop(1, 'rgba(0,229,160,0.0)');
  
  charts.revenue = new Chart(revCtx, {
    type: revChartType,
    data: {
      labels: m.labels,
      datasets: [
        { label:'This Year', data:m.revenue, borderColor:'#00E5A0', backgroundColor: revChartType==='line' ? grad : 'rgba(0,229,160,0.6)', fill: revChartType==='line', tension:0.4, pointRadius: revChartType==='line'?4:0, pointBackgroundColor:'#00E5A0', pointBorderColor:'#0A0E1A', pointBorderWidth:2, borderWidth: revChartType==='line'?2.5:0, borderRadius: revChartType==='bar'?6:0 },
        { label:'Prev Year', data:m.prevRevenue, borderColor:'rgba(100,116,139,0.5)', backgroundColor:'transparent', fill:false, tension:0.4, pointRadius:0, borderWidth:2, borderDash:[6,4] }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ display:true, position:'top', align:'end', labels:{ color:'#94A3B8', font:{family:'DM Sans',size:12}, boxWidth:12, boxHeight:3, padding:16 } }, tooltip:{ backgroundColor:'#1A2035', borderColor:'#2A3352', borderWidth:1, titleColor:'#F1F5F9', bodyColor:'#94A3B8', padding:12, cornerRadius:10 } },
      interaction: { intersect:false, mode:'index' },
      scales: {
        x: { grid:{color:'rgba(42,51,82,0.4)',drawBorder:false}, ticks:{color:'#64748B',font:{size:11}}, border:{display:false} },
        y: { grid:{color:'rgba(42,51,82,0.4)',drawBorder:false}, ticks:{color:'#64748B',font:{size:11},callback:v=>'$'+(v/1000)+'K'}, border:{display:false} }
      }
    }
  });

  // 2. Category Doughnut
  charts.category = new Chart(document.getElementById('categoryChart'), {
    type: 'doughnut',
    data: {
      labels: data.categories.labels,
      datasets: [{ data:data.categories.values, backgroundColor:data.categories.colors.map(c=>hexToRgba(c,0.8)), borderColor:'#1A2035', borderWidth:3, hoverOffset:8 }]
    },
    options: {
      responsive:true, maintainAspectRatio:false, cutout:'68%',
      plugins: { legend:{ display:true, position:'bottom', labels:{ color:'#94A3B8', font:{size:11}, boxWidth:10, boxHeight:10, padding:12 } }, tooltip:{ backgroundColor:'#1A2035', borderColor:'#2A3352', borderWidth:1, titleColor:'#F1F5F9', bodyColor:'#94A3B8', padding:12, cornerRadius:10 } }
    }
  });

  // 3. Sparklines (KPI)
  document.querySelectorAll('.sparkline-canvas').forEach(canvas => {
    const color = canvas.dataset.color;
    const values = JSON.parse(canvas.dataset.values);
    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(0,0,0,40);
    g.addColorStop(0, hexToRgba(color, 0.3)); g.addColorStop(1, hexToRgba(color, 0.0));
    new Chart(ctx, {
      type:'line',
      data: { labels:values.map((_,i)=>i), datasets:[{ data:values, borderColor:color, backgroundColor:g, fill:true, tension:0.4, pointRadius:0, borderWidth:2 }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}}, animation:{duration:800} }
    });
  });

  // 4. Performance Bar
  charts.perf = new Chart(document.getElementById('perfChart'), {
    type: 'bar',
    data: {
      labels: m.labels,
      datasets: [
        { label:'Revenue', data:m.revenue, backgroundColor:'rgba(0,229,160,0.7)', borderRadius:5, barPercentage:0.6 },
        { label:'Expenses', data:m.expenses, backgroundColor:'rgba(255,107,107,0.5)', borderRadius:5, barPercentage:0.6 }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ display:true, position:'top', align:'end', labels:{ color:'#94A3B8', font:{size:12}, boxWidth:12, boxHeight:3, padding:16 } }, tooltip:{ backgroundColor:'#1A2035', borderColor:'#2A3352', borderWidth:1, titleColor:'#F1F5F9', bodyColor:'#94A3B8', padding:12, cornerRadius:10 } },
      scales: {
        x: { grid:{color:'rgba(42,51,82,0.4)',drawBorder:false}, ticks:{color:'#64748B',font:{size:11}}, border:{display:false} },
        y: { grid:{color:'rgba(42,51,82,0.4)',drawBorder:false}, ticks:{color:'#64748B',font:{size:11},callback:v=>'$'+(v/1000)+'K'}, border:{display:false} }
      }
    }
  });

  // 5. Radar
  charts.radar = new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: ['Organic','Paid Ads','Social','Email','Referral','Direct'],
      datasets: [
        { label:'Current', data:[85,72,68,78,55,62], borderColor:'#00E5A0', backgroundColor:'rgba(0,229,160,0.15)', pointBackgroundColor:'#00E5A0', pointRadius:4, borderWidth:2 },
        { label:'Previous', data:[70,65,55,70,50,58], borderColor:'rgba(100,116,139,0.5)', backgroundColor:'rgba(100,116,139,0.08)', pointBackgroundColor:'#64748B', pointRadius:3, borderWidth:1.5, borderDash:[4,4] }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ display:true, position:'top', align:'end', labels:{ color:'#94A3B8', font:{size:11}, boxWidth:12, boxHeight:3, padding:12 } }, tooltip:{ backgroundColor:'#1A2035', borderColor:'#2A3352', borderWidth:1, titleColor:'#F1F5F9', bodyColor:'#94A3B8', padding:12, cornerRadius:10 } },
      scales: { r:{ grid:{color:'rgba(42,51,82,0.5)'}, angleLines:{color:'rgba(42,51,82,0.5)'}, pointLabels:{color:'#94A3B8',font:{size:11}}, ticks:{display:false}, suggestedMin:0, suggestedMax:100 } }
    }
  });
};

// --- KPI ANIMATION ---
function animateKPIs() {
  document.querySelectorAll('.kpi-value').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix;
    const suffix = el.dataset.suffix;
    const isFloat = !Number.isInteger(target);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      el.textContent = `${prefix}${isFloat ? current.toFixed(1) : Math.round(current).toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// --- GLOBAL HANDLERS ---
window.toggleRevChart = (type) => {
  revChartType = type;
  document.getElementById('revLineBtn').style.color = type==='line' ? '#00E5A0' : '';
  document.getElementById('revBarBtn').style.color = type==='bar' ? '#00E5A0' : '';
  // Re-init revenue chart by calling a targeted rebuild (simplified: rebuild all)
  if(charts.revenue) { charts.revenue.destroy(); }
  // Re-use data from closure (simplified approach: fetch from existing chart)
  const m = data.monthly; // Access original data reference trick
  // To avoid scope issues, we just trigger full re-init if needed, 
  // but for this structure we'll directly manipulate
  const revCtx = document.getElementById('revenueChart').getContext('2d');
  const grad = revCtx.createLinearGradient(0,0,0,280);
  grad.addColorStop(0, 'rgba(0,229,160,0.25)'); grad.addColorStop(1, 'rgba(0,229,160,0.0)');
  
  charts.revenue = new Chart(revCtx, {
    type: type,
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { label:'This Year', data:[42000,48000,45000,51000,53000,58000,62000,59000,64000,68000,72000,78000], borderColor:'#00E5A0', backgroundColor: type==='line' ? grad : 'rgba(0,229,160,0.6)', fill: type==='line', tension:0.4, pointRadius: type==='line'?4:0, pointBackgroundColor:'#00E5A0', pointBorderColor:'#0A0E1A', pointBorderWidth:2, borderWidth: type==='line'?2.5:0, borderRadius: type==='bar'?6:0 },
        { label:'Prev Year', data:[38000,41000,40000,44000,46000,50000,53000,51000,55000,59000,62000,67000], borderColor:'rgba(100,116,139,0.5)', backgroundColor:'transparent', fill:false, tension:0.4, pointRadius:0, borderWidth:2, borderDash:[6,4] }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins: { legend:{ display:true, position:'top', align:'end', labels:{ color:'#94A3B8', font:{family:'DM Sans',size:12}, boxWidth:12, boxHeight:3, padding:16 } }, tooltip:{ backgroundColor:'#1A2035', borderColor:'#2A3352', borderWidth:1, titleColor:'#F1F5F9', bodyColor:'#94A3B8', padding:12, cornerRadius:10 } },
      interaction: { intersect:false, mode:'index' },
      scales: {
        x: { grid:{color:'rgba(42,51,82,0.4)',drawBorder:false}, ticks:{color:'#64748B',font:{size:11}}, border:{display:false} },
        y: { grid:{color:'rgba(42,51,82,0.4)',drawBorder:false}, ticks:{color:'#64748B',font:{size:11},callback:v=>'$'+(v/1000)+'K'}, border:{display:false} }
      }
    }
  });
};

window.handleDateChange = (range) => {
  const n = range === '6m' ? 6 : 3;
  const f = range === '6m' ? 0.85 : 0.7;
  if(charts.revenue) {
    charts.revenue.data.labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].slice(0, n);
    charts.revenue.data.datasets[0].data = [42000,48000,45000,51000,53000,58000,62000,59000,64000,68000,72000,78000].slice(0, n).map(v => Math.round(v*f));
    charts.revenue.data.datasets[1].data = [38000,41000,40000,44000,46000,50000,53000,51000,55000,59000,62000,67000].slice(0, n).map(v => Math.round(v*f));
    charts.revenue.update();
  }
  window.showToast(`Showing data for last ${n} months`);
};

window.exportCSV = () => {
  const csvContent = "Name,Category,Revenue,Growth,Status\nWireless Headphones,Electronics,18900,12.5,Trending\nSmart Watch,Electronics,24600,8.3,Stable";
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'nexus_bi_report.csv'; a.click();
  URL.revokeObjectURL(url);
  window.showToast('CSV exported successfully');
};

window.showToast = (msg, type='success') => {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':'fa-circle-info'}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('toast-exit'); setTimeout(() => toast.remove(), 300); }, 3000);
};