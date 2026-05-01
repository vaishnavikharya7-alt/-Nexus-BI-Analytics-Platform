// KPI Card Component
export default function KPI({ label, value, prefix = '', suffix = '', change, icon, color }) {
  const isPositive = change >= 0;
  
  return `
    <div class="kpi-card">
      <div class="kpi-glow" style="background:${color};"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <div style="width:40px;height:40px;border-radius:10px;background:${color}15;display:flex;align-items:center;justify-content:center;">
          <i class="fas ${icon}" style="color:${color};font-size:16px;"></i>
        </div>
        <span class="badge ${isPositive ? 'badge-up' : 'badge-down'}">
          <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}" style="font-size:10px;"></i>
          ${Math.abs(change)}%
        </span>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">${label}</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;">
        <div class="kpi-value" style="font-family:'Space Grotesk';font-size:28px;font-weight:700;line-height:1;" 
             data-target="${value}" data-prefix="${prefix}" data-suffix="${suffix}">
          ${prefix}0${suffix}
        </div>
        <div style="width:80px;height:40px;"><canvas class="sparkline-canvas" data-color="${color}" data-values="${JSON.stringify([])}"></canvas></div>
      </div>
    </div>
  `;
}