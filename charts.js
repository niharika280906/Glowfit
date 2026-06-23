/* charts.js — Dashboard charts and PDF report */

let mainChartInstance = null;
let currentChartType = 'water';

function getLast7Days() {
 const history = JSON.parse(localStorage.getItem('gf_history') || '{}');
 const result = [];
 for (let i = 6; i >= 0; i--) {
 const d = new Date();
 d.setDate(d.getDate() - i);
 const key = d.toDateString();
 const label = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
 result.push({ key, label, data: history[key] || { water: 0, steps: 0, habits: 0, habitTotal: 0, calories: 0 } });
 }
 return result;
}

function showChart(type, btn) {
 currentChartType = type;
 document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
 if (btn) btn.classList.add('active');
 renderMainChart();
 renderWeeklySummary();
 renderAllTimeStats();
}

function renderMainChart() {
 const days = getLast7Days();
 const labels = days.map(d => d.label);
 const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
 const gridColor = isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
 const textColor = isDark ? '#8fa3c4' : '#475569';

 const configs = {
 water: {
 label: 'Glasses of water',
 data: days.map(d => d.data.water || 0),
 color: '#2dd4bf',
 target: 8,
 title: '💧 Water intake — last 7 days',
 type: 'bar'
 },
 steps: {
 label: 'Steps',
 data: days.map(d => d.data.steps || 0),
 color: '#10b981',
 target: 8000,
 title: ' Steps — last 7 days',
 type: 'bar'
 },
 calories: {
 label: 'Calories (kcal)',
 data: days.map(d => d.data.calories || 0),
 color: '#f59e0b',
 target: parseInt(document.getElementById('statCal')?.textContent) || 2000,
 title: ' Calories consumed — last 7 days',
 type: 'bar'
 },
 habits: {
 label: 'Habits completed (%)',
 data: days.map(d => d.data.habitTotal > 0 ? Math.round(d.data.habits / d.data.habitTotal * 100) : 0),
 color: '#34d399',
 target: 100,
 title: ' Habit completion — last 7 days',
 type: 'line'
 }
 };

 const cfg = configs[currentChartType];
 document.getElementById('chartTitle').innerHTML = `<i class="ti ti-chart-bar"></i>${cfg.title}`;

 const ctx = document.getElementById('mainChart').getContext('2d');
 if (mainChartInstance) mainChartInstance.destroy();

 mainChartInstance = new Chart(ctx, {
 type: cfg.type,
 data: {
 labels,
 datasets: [{
 label: cfg.label,
 data: cfg.data,
 backgroundColor: cfg.type === 'bar' ? cfg.color + 'cc' : 'transparent',
 borderColor: cfg.color,
 borderWidth: cfg.type === 'line' ? 2.5 : 0,
 borderRadius: cfg.type === 'bar' ? 6 : 0,
 fill: cfg.type === 'line',
 tension: 0.4,
 pointBackgroundColor: cfg.color,
 pointRadius: 4,
 }, {
 label: 'Target',
 data: labels.map(() => cfg.target),
 borderColor: 'rgba(255,255,255,.15)',
 borderWidth: 1.5,
 borderDash: [5, 5],
 pointRadius: 0,
 type: 'line',
 fill: false,
 }]
 },
 options: {
 responsive: true,
 maintainAspectRatio: false,
 plugins: {
 legend: { display: false },
 tooltip: {
 backgroundColor: isDark ? '#1a2236' : '#fff',
 titleColor: isDark ? '#f0f4ff' : '#0f172a',
 bodyColor: textColor,
 borderColor: isDark ? '#2a3f5f' : '#d0d9ef',
 borderWidth: 1,
 padding: 10,
 }
 },
 scales: {
 x: {
 grid: { color: gridColor },
 ticks: { color: textColor, font: { size: 10 } }
 },
 y: {
 grid: { color: gridColor },
 ticks: { color: textColor, font: { size: 10 } },
 beginAtZero: true
 }
 }
 }
 });
}

function renderWeeklySummary() {
 const days = getLast7Days();
 const totalWater = days.reduce((s, d) => s + (d.data.water || 0), 0);
 const totalSteps = days.reduce((s, d) => s + (d.data.steps || 0), 0);
 const totalCal = days.reduce((s, d) => s + (d.data.calories || 0), 0);
 const totalHabits = days.reduce((s, d) => s + (d.data.habits || 0), 0);
 const totalHabitsPossible = days.reduce((s, d) => s + (d.data.habitTotal || 0), 0);
 const avgWater = Math.round(totalWater / 7 * 10) / 10;
 const avgSteps = Math.round(totalSteps / 7);
 const avgCal = Math.round(totalCal / 7);
 const habitPct = totalHabitsPossible > 0 ? Math.round(totalHabits / totalHabitsPossible * 100) : 0;

 document.getElementById('weeklySummary').innerHTML = `
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
 <div style="text-align:center;padding:.75rem;background:var(--bg3);border-radius:10px;border:1px solid var(--border)">
 <div style="font-size:22px;font-weight:800;color:var(--cyan)">${avgWater}</div>
 <div style="font-size:10px;color:var(--t2);margin-top:2px">avg glasses/day</div>
 </div>
 <div style="text-align:center;padding:.75rem;background:var(--bg3);border-radius:10px;border:1px solid var(--border)">
 <div style="font-size:22px;font-weight:800;color:var(--blue)">${avgSteps >= 1000 ? (avgSteps/1000).toFixed(1)+'k' : avgSteps}</div>
 <div style="font-size:10px;color:var(--t2);margin-top:2px">avg steps/day</div>
 </div>
 <div style="text-align:center;padding:.75rem;background:var(--bg3);border-radius:10px;border:1px solid var(--border)">
 <div style="font-size:22px;font-weight:800;color:var(--gold)">${avgCal}</div>
 <div style="font-size:10px;color:var(--t2);margin-top:2px">avg kcal/day</div>
 </div>
 <div style="text-align:center;padding:.75rem;background:var(--bg3);border-radius:10px;border:1px solid var(--border)">
 <div style="font-size:22px;font-weight:800;color:var(--green)">${habitPct}%</div>
 <div style="font-size:10px;color:var(--t2);margin-top:2px">habit completion</div>
 </div>
 </div>
 `;
}

function renderAllTimeStats() {
 const history = JSON.parse(localStorage.getItem('gf_history') || '{}');
 const allDays = Object.values(history);
 if (allDays.length === 0) {
 document.getElementById('allTimeStats').innerHTML = '<p style="font-size:12px;color:var(--t3);text-align:center;padding:.5rem">Start tracking to see your records!</p>';
 return;
 }
 const bestWater = Math.max(...allDays.map(d => d.water || 0));
 const bestSteps = Math.max(...allDays.map(d => d.steps || 0));
 const totalDaysTracked = allDays.length;
 const perfectHabitDays = allDays.filter(d => d.habitTotal > 0 && d.habits === d.habitTotal).length;

 document.getElementById('allTimeStats').innerHTML = `
 <div style="display:flex;flex-direction:column;gap:8px">
 <div class="habit-row" style="padding:8px 0">
 <span style="font-size:13px;color:var(--t2)"> Best water day</span>
 <span style="font-size:13px;font-weight:700;color:var(--cyan)">${bestWater}/8 glasses</span>
 </div>
 <div class="habit-row" style="padding:8px 0">
 <span style="font-size:13px;color:var(--t2)"> Best steps day</span>
 <span style="font-size:13px;font-weight:700;color:var(--blue)">${bestSteps.toLocaleString()}</span>
 </div>
 <div class="habit-row" style="padding:8px 0">
 <span style="font-size:13px;color:var(--t2)"> Days tracked</span>
 <span style="font-size:13px;font-weight:700;color:var(--t1)">${totalDaysTracked}</span>
 </div>
 <div class="habit-row" style="padding:8px 0;border-bottom:none">
 <span style="font-size:13px;color:var(--t2)"> Perfect habit days</span>
 <span style="font-size:13px;font-weight:700;color:var(--green)">${perfectHabitDays}</span>
 </div>
 </div>
 `;
}

/* PDF REPORT */
async function generatePDFReport() {
 const btn = document.querySelector('[onclick="generatePDFReport()"]');
 btn.innerHTML = '<i class="ti ti-loader"></i> Generating...';
 btn.disabled = true;

 try {
 const { jsPDF } = window.jspdf;
 const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
 const days = getLast7Days();
 const now = new Date();
 const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
 const name = document.getElementById('pName')?.value || 'User';

 // Header
 doc.setFillColor(8, 10, 14);
 doc.rect(0, 0, 210, 40, 'F');
 doc.setFontSize(22);
 doc.setTextColor(16, 185, 129);
 doc.text('GlowFit', 20, 18);
 doc.setFontSize(11);
 doc.setTextColor(143, 163, 196);
 doc.text('Weekly Wellness Report', 20, 26);
 doc.setTextColor(240, 244, 255);
 doc.setFontSize(10);
 doc.text(`${name} · ${dateStr}`, 20, 34);

 let y = 50;

 // Profile summary
 const weight = document.getElementById('pCurrentWeight')?.value;
 const goalWeight = document.getElementById('pGoalWeight')?.value;
 const bmi = document.getElementById('bmiVal')?.textContent;
 const calTarget = document.getElementById('statCal')?.textContent;

 if (weight || bmi) {
 doc.setFontSize(13);
 doc.setTextColor(77, 124, 244);
 doc.text('Profile Summary', 20, y);
 y += 8;
 doc.setFontSize(10);
 doc.setTextColor(60, 80, 100);
 if (weight) doc.text(`Current weight: ${weight} kg${goalWeight ? ' | Goal: ' + goalWeight + ' kg' : ''}`, 20, y); y += 6;
 if (bmi && bmi !== '—') doc.text(`BMI: ${bmi} | Daily calorie target: ${calTarget} kcal`, 20, y); y += 10;
 }

 // Weekly table
 doc.setFontSize(13);
 doc.setTextColor(77, 124, 244);
 doc.text('7-Day Progress', 20, y);
 y += 8;

 // Table header
 doc.setFillColor(26, 42, 86);
 doc.rect(18, y - 5, 174, 8, 'F');
 doc.setFontSize(9);
 doc.setTextColor(143, 163, 196);
 doc.text('Date', 20, y);
 doc.text('Water', 65, y);
 doc.text('Steps', 95, y);
 doc.text('Calories', 125, y);
 doc.text('Habits', 163, y);
 y += 6;

 days.forEach((d, i) => {
 if (i % 2 === 0) {
 doc.setFillColor(17, 24, 39);
 doc.rect(18, y - 5, 174, 7, 'F');
 }
 doc.setFontSize(9);
 doc.setTextColor(240, 244, 255);
 doc.text(d.label, 20, y);
 doc.setTextColor(56, 189, 248);
 doc.text(`${d.data.water || 0}/8`, 65, y);
 doc.setTextColor(77, 124, 244);
 doc.text((d.data.steps || 0).toLocaleString(), 95, y);
 doc.setTextColor(245, 200, 66);
 doc.text(`${d.data.calories || 0} kcal`, 125, y);
 doc.setTextColor(34, 197, 94);
 doc.text(`${d.data.habits || 0}/${d.data.habitTotal || 0}`, 163, y);
 y += 7;
 });

 y += 8;

 // Weekly averages
 const totalWater = days.reduce((s, d) => s + (d.data.water || 0), 0);
 const totalSteps = days.reduce((s, d) => s + (d.data.steps || 0), 0);
 const totalCal = days.reduce((s, d) => s + (d.data.calories || 0), 0);

 doc.setFontSize(13);
 doc.setTextColor(77, 124, 244);
 doc.text('Weekly Averages', 20, y); y += 8;
 doc.setFontSize(10);
 doc.setTextColor(60, 80, 100);
 doc.text(`💧 Water avg: ${Math.round(totalWater/7*10)/10} glasses/day`, 20, y); y += 6;
 doc.text(` Steps avg: ${Math.round(totalSteps/7).toLocaleString()}/day`, 20, y); y += 6;
 doc.text(` Calories avg: ${Math.round(totalCal/7)} kcal/day`, 20, y); y += 12;

 // Streak
 const streak = localStorage.getItem('gf_streak') || '0';
 doc.setFontSize(13);
 doc.setTextColor(245, 200, 66);
 doc.text(` Current streak: ${streak} day${streak !== '1' ? 's' : ''}`, 20, y); y += 10;

 // Footer
 doc.setFontSize(8);
 doc.setTextColor(74, 96, 128);
 doc.text('Generated by GlowFit – Your Wellness Coach', 20, 285);
 doc.text(dateStr, 160, 285);

 doc.save(`GlowFit_Report_${now.toISOString().slice(0,10)}.pdf`);
 } catch (e) {
 alert('PDF generation failed: ' + e.message);
 }

 btn.innerHTML = '<i class="ti ti-file-download"></i> PDF';
 btn.disabled = false;
}
