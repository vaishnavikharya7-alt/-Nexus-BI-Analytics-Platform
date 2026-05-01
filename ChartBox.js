// Chart Container Component
export default function ChartBox({ id, title, subtitle, type = 'line', actions }) {
  const actionHTML = actions ? actions : '';
  
  return `
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
        <div>
          <h3 style="font-size:15px;font-weight:700;">${title}</h3>
          <p style="font-size:12px;color:var(--text-muted);margin-top:2px;">${subtitle}</p>
        </div>
        <div style="display:flex;gap:4px;">
          ${actionHTML}
        </div>
      </div>
      <div style="height:280px;"><canvas id="${id}"></canvas></div>
    </div>
  `;
}