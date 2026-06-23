/* calories.js — Food DB, calorie counter, history, meal preparer */

const foodDB = [
 // Grains & Rice
 { n: 'Rice (cooked)', u: 'cup', k: 200, p: 4, c: 44, f: 0, a: ['rice', 'chawal', 'white rice', 'boiled rice'] },
 { n: 'Brown rice (cooked)', u: 'cup', k: 180, p: 4, c: 38, f: 1, a: ['brown rice'] },
 { n: 'Roti / Chapati', u: 'piece', k: 70, p: 2, c: 15, f: 1, a: ['roti', 'chapati', 'phulka', 'chapatti'] },
 { n: 'Paratha', u: 'piece', k: 200, p: 4, c: 28, f: 8, a: ['paratha', 'parantha'] },
 { n: 'Puri', u: 'piece', k: 100, p: 2, c: 14, f: 5, a: ['puri', 'poori'] },
 { n: 'Naan', u: 'piece', k: 260, p: 8, c: 48, f: 5, a: ['naan'] },
 { n: 'Bread (white)', u: 'slice', k: 70, p: 2, c: 13, f: 1, a: ['bread', 'white bread', 'sandwich bread'] },
 { n: 'Bread (brown/multigrain)', u: 'slice', k: 65, p: 3, c: 12, f: 1, a: ['brown bread', 'multigrain bread', 'whole wheat bread'] },
 { n: 'Idli', u: 'piece', k: 50, p: 2, c: 10, f: 0, a: ['idli'] },
 { n: 'Dosa (plain)', u: 'piece', k: 160, p: 4, c: 28, f: 4, a: ['dosa', 'plain dosa'] },
 { n: 'Masala dosa', u: 'piece', k: 280, p: 6, c: 42, f: 10, a: ['masala dosa'] },
 { n: 'Poha', u: 'bowl', k: 200, p: 4, c: 38, f: 4, a: ['poha', 'aval', 'beaten rice'] },
 { n: 'Upma', u: 'bowl', k: 250, p: 6, c: 40, f: 8, a: ['upma'] },
 { n: 'Oats (cooked)', u: 'bowl', k: 150, p: 5, c: 27, f: 3, a: ['oats', 'oatmeal', 'daliya oats'] },
 { n: 'Daliya (wheat porridge)', u: 'bowl', k: 180, p: 5, c: 36, f: 2, a: ['daliya', 'dalia', 'broken wheat'] },
 { n: 'Khichdi', u: 'bowl', k: 280, p: 10, c: 50, f: 5, a: ['khichdi', 'khichri'] },
 // Dal & Legumes
 { n: 'Dal (cooked)', u: 'bowl', k: 150, p: 10, c: 24, f: 1, a: ['dal', 'daal', 'lentils', 'toor dal', 'masoor dal', 'moong dal', 'chana dal', 'arhar dal'] },
 { n: 'Rajma (cooked)', u: 'bowl', k: 220, p: 14, c: 38, f: 1, a: ['rajma', 'kidney beans', 'red beans'] },
 { n: 'Chole / Chana masala', u: 'bowl', k: 240, p: 12, c: 38, f: 5, a: ['chole', 'chana masala', 'chickpeas', 'kabuli chana'] },
 { n: 'Sprouts (mixed)', u: 'cup', k: 60, p: 4, c: 10, f: 0, a: ['sprouts', 'moong sprouts', 'mixed sprouts'] },
 { n: 'Boiled chana', u: 'cup', k: 180, p: 10, c: 30, f: 3, a: ['boiled chana', 'kala chana', 'boiled chickpeas', 'roasted chana'] },
 { n: 'Soya chunks (cooked)', u: 'cup', k: 150, p: 26, c: 8, f: 1, a: ['soya chunks', 'soy chunks', 'nutrela'] },
 // Vegetables
 { n: 'Sabzi (mixed veg curry)', u: 'bowl', k: 100, p: 3, c: 14, f: 4, a: ['sabzi', 'vegetable curry', 'mixed sabzi', 'subzi', 'veg curry'] },
 { n: 'Palak paneer', u: 'bowl', k: 280, p: 14, c: 12, f: 20, a: ['palak paneer', 'spinach paneer'] },
 { n: 'Paneer bhurji', u: 'bowl', k: 260, p: 16, c: 8, f: 18, a: ['paneer bhurji'] },
 { n: 'Aloo sabzi', u: 'bowl', k: 160, p: 3, c: 28, f: 5, a: ['aloo sabzi', 'potato curry', 'aloo curry', 'dum aloo'] },
 { n: 'Baingan bhartha', u: 'bowl', k: 100, p: 2, c: 14, f: 4, a: ['baingan', 'brinjal', 'eggplant', 'baingan bharta'] },
 // Proteins
 { n: 'Egg (whole boiled)', u: 'piece', k: 80, p: 6, c: 0, f: 5, a: ['egg', 'anda', 'boiled egg', 'eggs'] },
 { n: 'Egg white', u: 'piece', k: 17, p: 4, c: 0, f: 0, a: ['egg white'] },
 { n: 'Omelette (2 eggs)', u: 'piece', k: 180, p: 12, c: 2, f: 14, a: ['omelette', 'omelet', 'egg omelette'] },
 { n: 'Chicken (cooked)', u: 'g', k: 1.65, p: 0.31, c: 0, f: 0.07, a: ['chicken', 'chicken curry', 'grilled chicken', 'chicken breast', 'murgh'] },
 { n: 'Chicken curry', u: 'bowl', k: 280, p: 24, c: 8, f: 16, a: ['chicken curry', 'chicken gravy', 'murgh curry'] },
 { n: 'Fish (cooked)', u: 'g', k: 1.5, p: 0.28, c: 0, f: 0.05, a: ['fish', 'macchi', 'machli', 'grilled fish', 'fish curry', 'rohu', 'pomfret'] },
 { n: 'Paneer', u: 'g', k: 2.65, p: 0.18, c: 0.01, f: 0.21, a: ['paneer', 'cottage cheese'] },
 // Dairy
 { n: 'Milk (full fat)', u: 'glass', k: 150, p: 8, c: 12, f: 8, a: ['milk', 'dudh', 'full fat milk', 'whole milk'] },
 { n: 'Milk (toned/low fat)', u: 'glass', k: 120, p: 8, c: 12, f: 4, a: ['toned milk', 'low fat milk', 'skimmed milk'] },
 { n: 'Curd / Dahi', u: 'cup', k: 100, p: 8, c: 8, f: 4, a: ['curd', 'dahi', 'yogurt', 'yoghurt'] },
 { n: 'Buttermilk (chaas)', u: 'glass', k: 40, p: 3, c: 4, f: 1, a: ['buttermilk', 'chaas', 'lassi (plain)', 'lassi'] },
 { n: 'Paneer (100g)', u: 'piece', k: 265, p: 18, c: 1, f: 21, a: [] },
 { n: 'Ghee', u: 'tsp', k: 45, p: 0, c: 0, f: 5, a: ['ghee', 'clarified butter'] },
 { n: 'Butter', u: 'tsp', k: 35, p: 0, c: 0, f: 4, a: ['butter', 'makhan'] },
 // Fruits
 { n: 'Banana', u: 'piece', k: 100, p: 1, c: 24, f: 0, a: ['banana', 'kela'] },
 { n: 'Apple', u: 'piece', k: 80, p: 0, c: 20, f: 0, a: ['apple', 'seb'] },
 { n: 'Mango', u: 'cup', k: 100, p: 1, c: 25, f: 0, a: ['mango', 'aam'] },
 { n: 'Orange', u: 'piece', k: 60, p: 1, c: 15, f: 0, a: ['orange', 'santra', 'narangi'] },
 { n: 'Guava', u: 'piece', k: 50, p: 2, c: 12, f: 0, a: ['guava', 'amrud'] },
 { n: 'Papaya', u: 'cup', k: 55, p: 1, c: 13, f: 0, a: ['papaya', 'papita'] },
 { n: 'Watermelon', u: 'cup', k: 46, p: 1, c: 11, f: 0, a: ['watermelon', 'tarbuj'] },
 { n: 'Grapes', u: 'cup', k: 104, p: 1, c: 27, f: 0, a: ['grapes', 'angoor'] },
 { n: 'Pomegranate', u: 'cup', k: 104, p: 2, c: 26, f: 1, a: ['pomegranate', 'anar'] },
 // Snacks & Nuts
 { n: 'Almonds', u: 'piece', k: 7, p: 0.3, c: 0.2, f: 0.6, a: ['almond', 'badam', 'almonds'] },
 { n: 'Walnuts', u: 'piece', k: 26, p: 0.6, c: 0.5, f: 2.6, a: ['walnut', 'akhrot', 'walnuts'] },
 { n: 'Cashews', u: 'piece', k: 9, p: 0.3, c: 0.5, f: 0.7, a: ['cashew', 'kaju', 'cashews'] },
 { n: 'Peanuts', u: 'tbsp', k: 95, p: 4, c: 3, f: 8, a: ['peanuts', 'moongfali', 'groundnuts', 'peanut'] },
 { n: 'Makhana (fox nuts)', u: 'cup', k: 100, p: 4, c: 20, f: 0, a: ['makhana', 'fox nuts', 'lotus seeds', 'phool makhana'] },
 { n: 'Samosa', u: 'piece', k: 250, p: 4, c: 32, f: 13, a: ['samosa'] },
 { n: 'Pakora / Bhajiya', u: 'piece', k: 70, p: 2, c: 8, f: 4, a: ['pakora', 'pakoda', 'bhajiya', 'bhajji'] },
 { n: 'Biscuit (Marie / Digestive)', u: 'piece', k: 35, p: 1, c: 6, f: 1, a: ['biscuit', 'marie', 'digestive', 'biscuits'] },
 { n: 'Namkeen / Mixture', u: 'tbsp', k: 60, p: 1, c: 7, f: 3, a: ['namkeen', 'mixture', 'farsan', 'bhujia', 'chivda'] },
 // Drinks
 { n: 'Chai (with milk & sugar)', u: 'cup', k: 50, p: 1, c: 8, f: 1, a: ['chai', 'tea', 'masala chai', 'ginger tea', 'adrak chai'] },
 { n: 'Coffee (with milk)', u: 'cup', k: 60, p: 2, c: 8, f: 2, a: ['coffee', 'cafe', 'cappuccino'] },
 { n: 'Black coffee', u: 'cup', k: 5, p: 0, c: 0, f: 0, a: ['black coffee', 'americano', 'black tea'] },
 { n: 'Coconut water', u: 'glass', k: 45, p: 2, c: 9, f: 0, a: ['coconut water', 'nariyal pani', 'tender coconut'] },
 { n: 'Fruit juice (fresh)', u: 'glass', k: 110, p: 1, c: 26, f: 0, a: ['juice', 'fruit juice', 'orange juice', 'mango juice', 'fresh juice'] },
 { n: 'Cold drink / Soda', u: 'glass', k: 140, p: 0, c: 36, f: 0, a: ['cold drink', 'soda', 'pepsi', 'coke', 'cola', 'sprite', 'thums up'] },
 // Complete meals
 { n: 'Dal chawal (plate)', u: 'plate', k: 400, p: 14, c: 72, f: 6, a: ['dal chawal', 'dal rice', 'dal and rice'] },
 { n: 'Rajma chawal (plate)', u: 'plate', k: 500, p: 18, c: 86, f: 6, a: ['rajma chawal', 'rajma rice'] },
 { n: 'Chole chawal (plate)', u: 'plate', k: 520, p: 16, c: 88, f: 8, a: ['chole chawal', 'chana rice'] },
 { n: 'Thali (veg)', u: 'plate', k: 600, p: 20, c: 96, f: 14, a: ['thali', 'veg thali', 'full thali'] },
 { n: 'Biryani (veg)', u: 'plate', k: 450, p: 10, c: 78, f: 12, a: ['veg biryani', 'vegetable biryani'] },
 { n: 'Biryani (chicken)', u: 'plate', k: 550, p: 28, c: 72, f: 16, a: ['chicken biryani', 'biryani', 'mutton biryani'] },
 { n: 'Pav bhaji', u: 'plate', k: 450, p: 8, c: 62, f: 18, a: ['pav bhaji', 'pavbhaji'] },
 { n: 'Maggi noodles', u: 'plate', k: 340, p: 8, c: 48, f: 14, a: ['maggi', 'noodles', 'instant noodles'] },
 { n: 'Pizza (1 slice)', u: 'slice', k: 250, p: 11, c: 32, f: 10, a: ['pizza'] },
 { n: 'Burger', u: 'piece', k: 380, p: 16, c: 42, f: 18, a: ['burger', 'veg burger', 'aloo tikki burger'] },
 // Sweets
 { n: 'Gulab jamun', u: 'piece', k: 150, p: 2, c: 26, f: 5, a: ['gulab jamun'] },
 { n: 'Jalebi', u: 'piece', k: 150, p: 1, c: 32, f: 4, a: ['jalebi'] },
 { n: 'Kheer', u: 'bowl', k: 250, p: 7, c: 42, f: 7, a: ['kheer', 'rice pudding', 'payasam'] },
 { n: 'Halwa', u: 'bowl', k: 300, p: 4, c: 48, f: 12, a: ['halwa', 'sooji halwa', 'gajar halwa', 'carrot halwa'] },
 { n: 'Chocolate', u: 'piece', k: 50, p: 1, c: 6, f: 3, a: ['chocolate', 'dark chocolate', 'choco'] },
];

let selectedFood = null;

function foodAutoComplete() {
 const q = document.getElementById('calFoodName').value.toLowerCase().trim();
 const box = document.getElementById('foodSuggestions');
 selectedFood = null;
 document.getElementById('calAutoResult').style.display = 'none';
 if (q.length < 2) { box.style.display = 'none'; return; }
 const matches = foodDB.filter(f =>
 f.n.toLowerCase().includes(q) || f.a.some(a => a.includes(q) || q.includes(a))
 ).slice(0, 8);
 if (matches.length === 0) { box.style.display = 'none'; return; }
 box.style.display = 'block';
 box.innerHTML = matches.map((f) => `
 <div onclick="selectFood(${foodDB.indexOf(f)})" style="padding:9px 12px;cursor:pointer;border-bottom:1px solid var(--border);font-size:13px;color:var(--t1);display:flex;justify-content:space-between;align-items:center"
 onmouseover="this.style.background='rgba(77,124,244,.1)'" onmouseout="this.style.background='none'">
 <span>${f.n}</span>
 <span style="font-size:11px;color:var(--t3)">${f.k} kcal/${f.u}</span>
 </div>`).join('');
}

function selectFood(idx) {
 selectedFood = foodDB[idx];
 document.getElementById('calFoodName').value = selectedFood.n;
 document.getElementById('foodSuggestions').style.display = 'none';
 const unitEl = document.getElementById('calUnit');
 const u = selectedFood.u;
 for (let i = 0; i < unitEl.options.length; i++) {
 if (unitEl.options[i].value === u) { unitEl.selectedIndex = i; break; }
 }
 calcAutoCalories();
}

function calcAutoCalories() {
 if (!selectedFood) return;
 const qty = parseFloat(document.getElementById('calQty').value) || 1;
 const unit = document.getElementById('calUnit').value;
 let multiplier = qty;
 if (unit !== selectedFood.u) {
 const conversions = {
 'g': { piece: 0.01, cup: 0.0042, bowl: 0.003, plate: 0.002, tbsp: 0.067, tsp: 0.2, slice: 0.02, glass: 0.005 },
 'piece': { cup: 0.4, bowl: 0.35, plate: 0.25, g: 100, tbsp: 2, tsp: 6, slice: 1, glass: 0.5 },
 'cup': { piece: 2.5, bowl: 0.8, plate: 0.5, g: 240, tbsp: 16, tsp: 48, slice: 2, glass: 1 },
 'bowl': { piece: 3, cup: 1.25, plate: 0.6, g: 300, tbsp: 20, slice: 2.5, glass: 1.2 },
 'plate': { piece: 5, cup: 2, bowl: 1.6, g: 450, tbsp: 30, slice: 4, glass: 2 },
 'tbsp': { piece: 0.1, cup: 0.06, bowl: 0.05, g: 15, tsp: 3, slice: 0.15, glass: 0.06 },
 'tsp': { piece: 0.03, cup: 0.02, bowl: 0.015, g: 5, tbsp: 0.33, slice: 0.05 },
 };
 const conv = conversions[selectedFood.u]?.[unit];
 if (conv) multiplier = qty * conv;
 }
 const kcal = Math.round(selectedFood.k * multiplier);
 const p = Math.round(selectedFood.p * multiplier * 10) / 10;
 const c = Math.round(selectedFood.c * multiplier * 10) / 10;
 const fat = Math.round(selectedFood.f * multiplier * 10) / 10;
 document.getElementById('calAutoResult').style.display = 'block';
 document.getElementById('calAutoLabel').textContent = `${qty} ${unit} of ${selectedFood.n}`;
 document.getElementById('calAutoKcal').textContent = kcal + ' kcal';
 document.getElementById('calAutoMacro').textContent = `Protein ${p}g · Carbs ${c}g · Fat ${fat}g`;
 selectedFood._calcKcal = kcal;
 selectedFood._calcMacro = `P:${p}g C:${c}g F:${fat}g`;
}

document.addEventListener('click', e => {
 if (!e.target.closest('#calFoodName') && !e.target.closest('#foodSuggestions')) {
 const box = document.getElementById('foodSuggestions');
 if (box) box.style.display = 'none';
 }
});

function getTodayCalories() {
 const today = new Date().toDateString();
 const log = JSON.parse(localStorage.getItem('gf_callog_' + today) || '[]');
 return log.reduce((s, e) => s + e.kcal, 0);
}

function renderCalorieLog() {
 const today = new Date().toDateString();
 const log = JSON.parse(localStorage.getItem('gf_callog_' + today) || '[]');
 const total = log.reduce((s, e) => s + e.kcal, 0);
 document.getElementById('calTodayTotal').textContent = total;
 document.getElementById('calTodayBadge').textContent = total + ' kcal today';
 const targetEl = document.getElementById('statCal');
 const target = targetEl && targetEl.textContent !== '—' ? parseInt(targetEl.textContent) : 2000;
 const pct = Math.min(total / target * 100, 100);
 document.getElementById('calTodayBar').style.width = pct + '%';
 document.getElementById('calTodayTarget').textContent = 'Target: ' + target + ' kcal · ' + Math.max(0, target - total) + ' kcal remaining';
 const logEl = document.getElementById('calLog');
 if (log.length === 0) { logEl.innerHTML = '<p style="font-size:12px;color:var(--t3);text-align:center;padding:.75rem 0">No food logged yet today</p>'; return; }
 const byMeal = {};
 log.forEach((e, i) => { if (!byMeal[e.meal]) byMeal[e.meal] = []; byMeal[e.meal].push({ ...e, idx: i }); });
 logEl.innerHTML = Object.entries(byMeal).map(([meal, items]) => `
 <div style="margin-bottom:.5rem">
 <div style="font-size:10px;color:var(--blue);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">${meal}</div>
 ${items.map(e => `<div class="meal-item" style="padding:6px 0">
 <div style="flex:1">
 <div class="meal-name">${e.name}</div>
 ${e.macro ? `<div class="meal-macro">${e.macro}</div>` : ''}
 </div>
 <div style="display:flex;align-items:center;gap:8px">
 <span class="meal-cal">${e.kcal} kcal</span>
 <button onclick="removeCalEntry(${e.idx})" style="background:none;border:none;cursor:pointer;color:var(--t3);font-size:14px;padding:2px 4px"></button>
 </div>
 </div>`).join('')}
 </div>`).join('');
}

function addCalEntry() {
 const name = document.getElementById('calFoodName').value.trim();
 if (!name) { alert('Please type a food name and select it from the suggestions'); return; }
 const qty = parseFloat(document.getElementById('calQty').value) || 1;
 const unit = document.getElementById('calUnit').value;
 const meal = document.getElementById('calFoodMeal').value;
 if (!selectedFood || !selectedFood._calcKcal) { alert('Please select a food from the dropdown suggestions so calories are calculated automatically'); return; }
 const kcal = selectedFood._calcKcal;
 const today = new Date().toDateString();
 const log = JSON.parse(localStorage.getItem('gf_callog_' + today) || '[]');
 log.push({ name: `${qty} ${unit} – ${name}`, kcal, meal, macro: selectedFood._calcMacro || '', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) });
 localStorage.setItem('gf_callog_' + today, JSON.stringify(log));
 document.getElementById('calFoodName').value = '';
 document.getElementById('calQty').value = '1';
 document.getElementById('calAutoResult').style.display = 'none';
 selectedFood = null;
 renderCalorieLog();
 saveDailyProgress();
 renderHistory();
}

function addQuickFood(idx) {
 const f = foodDB[idx];
 const today = new Date().toDateString();
 const log = JSON.parse(localStorage.getItem('gf_callog_' + today) || '[]');
 const meal = document.getElementById('calFoodMeal') ? document.getElementById('calFoodMeal').value : 'Other';
 const kcal = Math.round(f.k);
 log.push({ name: `1 ${f.u} – ${f.n}`, kcal, meal, macro: `P:${f.p}g C:${f.c}g F:${f.f}g`, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) });
 localStorage.setItem('gf_callog_' + today, JSON.stringify(log));
 renderCalorieLog();
 saveDailyProgress();
}

function removeCalEntry(idx) {
 const today = new Date().toDateString();
 const log = JSON.parse(localStorage.getItem('gf_callog_' + today) || '[]');
 log.splice(idx, 1);
 localStorage.setItem('gf_callog_' + today, JSON.stringify(log));
 renderCalorieLog();
 saveDailyProgress();
}

function clearCalories() {
 if (!confirm('Clear all food entries for today?')) return;
 const today = new Date().toDateString();
 localStorage.removeItem('gf_callog_' + today);
 renderCalorieLog();
}

function renderQuickFoods() {
 const el = document.getElementById('quickFoods');
 if (!el) return;
 const quick = ['Roti / Chapati', 'Egg (whole boiled)', 'Banana', 'Chai (with milk & sugar)', 'Dal (cooked)', 'Rice (cooked)', 'Curd / Dahi', 'Oats (cooked)', 'Idli', 'Dosa (plain)', 'Almonds', 'Paneer'];
 const items = quick.map(name => foodDB.find(f => f.n === name)).filter(Boolean);
 el.innerHTML = items.map(f => `
 <button class="tag" style="cursor:pointer;border-color:rgba(77,124,244,.3);color:var(--blue)" onclick="addQuickFood(${foodDB.indexOf(f)})">${f.n} <span style="color:var(--t3);font-size:10px">${Math.round(f.k)} kcal</span></button>
 `).join('');
}

function renderHistory() {
 const history = JSON.parse(localStorage.getItem('gf_history') || '{}');
 const keys = Object.keys(history).sort((a, b) => new Date(b) - new Date(a)).slice(0, 7);
 const el = document.getElementById('calHistory');
 if (!el) return;
 if (keys.length === 0) { el.innerHTML = '<p style="font-size:12px;color:var(--t3);text-align:center;padding:.75rem 0">No history yet. Start tracking today!</p>'; return; }
 el.innerHTML = keys.map(k => {
 const d = history[k];
 const dateLabel = new Date(k).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
 const habitPct = d.habitTotal > 0 ? Math.round(d.habits / d.habitTotal * 100) : 0;
 return `<div style="padding:9px 0;border-bottom:1px solid var(--border)">
 <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
 <span style="font-size:12px;font-weight:700;color:var(--t1)">${dateLabel}</span>
 <span style="font-size:11px;color:var(--cyan);font-weight:600">${d.calories || 0} kcal</span>
 </div>
 <div style="display:flex;gap:10px;flex-wrap:wrap">
 <span style="font-size:11px;color:var(--t2)">💧 ${d.water || 0}/8</span>
 <span style="font-size:11px;color:var(--t2)"> ${(d.steps || 0).toLocaleString()}</span>
 <span style="font-size:11px;color:var(--t2)"> ${d.habits || 0}/${d.habitTotal || 0} habits</span>
 </div>
 </div>`;
 }).join('');
}

/* MEAL PREPARER */
const recipeDB = [
 { needs: ['rice', 'dal'], any: ['onion', 'tomato', 'palak', 'ghee', 'jeera'], name: 'Masoor Dal Khichdi', type: ['Lunch', 'Dinner'], diet: ['Vegetarian', 'Vegan'], cal: 380, protein: '14g', carbs: '68g', fat: '6g', fibre: '8g', steps: ['Wash ½ cup rice + ½ cup masoor dal together. Soak 15 min.', 'Heat 1 tsp ghee/oil in pressure cooker. Add jeera, let it splutter.', 'Add chopped onion (1), tomato (1), turmeric ½ tsp, salt. Sauté 3 min.', 'Add soaked rice+dal. Pour 2.5 cups water.', 'Pressure cook 3 whistles. Let pressure release naturally.', 'Top with a squeeze of lemon. Serve with dahi.'], tips: ['Use brown rice instead of white for more fibre and lower GI', 'Add a handful of palak/spinach in the last step for iron boost', 'Skip ghee and use just ½ tsp oil to cut calories by 40 kcal', 'Pair with cucumber raita to add probiotics and cool the meal'], balance: 'Pair with dahi (curd) for complete protein and probiotics. Add a raw salad on the side for vitamins.' },
 { needs: ['egg'], any: ['onion', 'tomato', 'capsicum', 'palak', 'milk'], name: 'Masala Egg Bhurji', type: ['Breakfast', 'Lunch', 'Dinner'], diet: ['Non-vegetarian'], cal: 220, protein: '18g', carbs: '8g', fat: '14g', fibre: '2g', steps: ['Heat 1 tsp oil in pan. Add chopped onion (1 small), sauté 2 min.', 'Add chopped tomato (1), green chilli (1), cook till soft.', 'Beat 2-3 eggs with a pinch of salt and turmeric.', 'Pour eggs into pan. Stir continuously on medium heat.', 'Add chopped coriander, a squeeze of lemon. Serve hot.'], tips: ['Use 1 whole egg + 1-2 egg whites to cut fat while keeping protein high', 'Cook on low-medium heat — scrambling slowly keeps eggs softer and more nutritious', 'Add palak/spinach or capsicum for extra vitamins C and iron', 'Avoid adding butter — the egg has enough fat already'], balance: 'Serve with 2 whole wheat rotis or multigrain toast. Add a glass of milk for calcium.' },
 { needs: ['paneer'], any: ['onion', 'tomato', 'capsicum', 'spinach', 'palak'], name: 'Palak Paneer (Light)', type: ['Lunch', 'Dinner'], diet: ['Vegetarian'], cal: 280, protein: '16g', carbs: '12g', fat: '18g', fibre: '4g', steps: ['Blanch 2 cups palak in boiling water 2 min, then blend to smooth paste.', 'Heat 1 tsp oil. Add cumin, chopped onion (1). Sauté till golden.', 'Add ginger-garlic paste (1 tsp), tomato (1 chopped), cook 5 min.', 'Add palak purée, turmeric, coriander powder, salt. Cook 5 min.', 'Add paneer cubes (100g). Simmer 3 min. Finish with a pinch of kasuri methi.'], tips: ['Use low-fat paneer or homemade paneer from toned milk to cut calories', 'Do NOT add cream — the palak makes it creamy enough', 'Use minimal oil (1 tsp) — palak has zero fat so balance is maintained', 'Blanching preserves more nutrients than boiling for long'], balance: 'Have with 2 jowar or multigrain rotis. Palak is rich in iron — add a lemon squeeze to increase absorption.' },
 { needs: ['dal'], any: ['onion', 'tomato', 'garlic', 'ginger', 'jeera', 'haldi'], name: 'Dal Tadka', type: ['Lunch', 'Dinner'], diet: ['Vegetarian', 'Vegan'], cal: 220, protein: '13g', carbs: '36g', fat: '5g', fibre: '9g', steps: ['Wash and boil ½ cup toor/masoor dal with turmeric and salt (3 whistles).', 'Mash the boiled dal lightly.', 'Heat 1 tsp oil/ghee. Add jeera, dried red chilli, hing (asafoetida).', 'Add garlic (3 cloves, sliced), onion (1), sauté till golden.', 'Add tomato (1), cook 3 min. Pour over dal. Mix well. Boil 2 min.', 'Finish with coriander leaves and lemon juice.'], tips: ['Use toor dal for high protein, masoor for quick cooking and iron', 'The tadka (tempering) is healthy — jeera and hing improve digestion significantly', 'Avoid extra salt — the dal itself absorbs flavour well', 'Adding a small piece of kokum while boiling reduces gas from the dal'], balance: 'Complete meal with 2 rotis + rice + a small bowl of dahi. Eat with raw onion slices for quercetin.' },
 { needs: ['banana'], any: ['milk', 'oats', 'honey', 'curd', 'dahi'], name: 'Banana Oat Smoothie Bowl', type: ['Breakfast'], diet: ['Vegetarian'], cal: 290, protein: '9g', carbs: '52g', fat: '5g', fibre: '6g', steps: ['Blend 1 banana + ½ cup oats + ½ cup curd/milk till smooth.', 'Pour into a bowl.', 'Top with sliced banana, a drizzle of honey (½ tsp), and 5 crushed almonds.', 'Sprinkle chia seeds if available. Eat immediately.'], tips: ['Use ripe (spotted) bananas — they are sweeter so you need zero added sugar', 'Rolled oats are healthier than instant oats — more fibre, lower GI', 'Skip honey if banana is ripe enough — already plenty of natural sugar', 'Add 1 tsp flaxseed powder for omega-3 and fibre boost'], balance: 'This is a complete breakfast. Add 1 boiled egg or a handful of roasted chana on the side for protein if needed.' },
 { needs: ['oats'], any: ['milk', 'banana', 'honey', 'almonds', 'curd'], name: 'Masala Vegetable Oats', type: ['Breakfast', 'Snack'], diet: ['Vegetarian', 'Vegan'], cal: 260, protein: '10g', carbs: '42g', fat: '6g', fibre: '7g', steps: ['Heat 1 tsp oil. Add mustard seeds, curry leaves, chopped onion (½). Sauté 2 min.', 'Add chopped vegetables (whatever you have — carrot, tomato, capsicum).', 'Add 1 cup rolled oats. Toast 1 min.', 'Add 1.5 cups water, salt, turmeric, black pepper. Cook stirring till thick.', 'Finish with coriander leaves and lemon juice.'], tips: ['Use rolled oats, not instant oats — more fibre and keeps you full longer', 'Adding vegetables doubles the micronutrient content for almost zero extra calories', 'This is much healthier than sweet oats — savoury keeps blood sugar stable', 'No oil needed if using non-stick pan — saves 40 kcal'], balance: 'Pair with a glass of buttermilk (chaas) for probiotics and protein. Have a fruit 1 hour later.' },
 { needs: ['chicken'], any: ['onion', 'tomato', 'curd', 'ginger', 'garlic', 'capsicum'], name: 'Grilled Masala Chicken', type: ['Lunch', 'Dinner'], diet: ['Non-vegetarian'], cal: 210, protein: '32g', carbs: '6g', fat: '8g', fibre: '1g', steps: ['Mix curd (2 tbsp), ginger-garlic paste (1 tsp), red chilli powder, turmeric, garam masala, lemon juice, salt.', 'Marinate chicken (200g) in this mix for at least 30 min (longer is better).', 'Grill/bake at 200°C for 20-25 min, or pan-cook on medium heat with lid on.', 'Flip halfway. Cook until juices run clear.', 'Serve with sliced onion and lemon wedge.'], tips: ['Remove skin before cooking to cut fat by 50%', 'Curd marinade tenderises the meat and adds probiotics — no need for extra oil', 'Grill or bake — never fry. Same taste, 60% fewer calories', 'Avoid adding butter or cream while cooking — unnecessary and unhealthy'], balance: 'Serve with a big salad or 2 rotis + steamed vegetables. Chicken is pure protein — balance with complex carbs.' },
 { needs: ['rice'], any: ['vegetables', 'onion', 'carrot', 'capsicum', 'peas', 'egg', 'jeera'], name: 'Vegetable Fried Rice', type: ['Lunch', 'Dinner'], diet: ['Vegetarian'], cal: 320, protein: '8g', carbs: '58g', fat: '7g', fibre: '5g', steps: ['Cook 1 cup rice (use day-old or cooled rice — works best).', 'Heat 1 tsp oil on high heat. Add garlic (2 cloves, chopped).', 'Add chopped vegetables — carrot, capsicum, peas, onion. Stir-fry 3-4 min on high.', 'Add rice. Mix well. Add soy sauce (½ tsp), black pepper, salt.', 'Optional: push rice to side, scramble 1 egg in the middle, mix in.', 'Garnish with spring onion or coriander.'], tips: ['Use day-old/cooled rice — fresh rice becomes mushy and has higher GI', 'High heat stir-fry preserves more nutrients than slow cooking', 'Add more vegetables than rice — doubles the nutrition, reduces calories', 'Use minimal oil — 1 tsp is enough on a good pan'], balance: 'This is a complete meal if you add egg. Without egg, have a bowl of dal or dahi on the side for protein.' },
 { needs: ['curd', 'dahi'], any: ['cucumber', 'mint', 'jeera', 'onion'], name: 'Mint Cucumber Raita', type: ['Snack', 'Lunch', 'Dinner'], diet: ['Vegetarian'], cal: 80, protein: '5g', carbs: '8g', fat: '2g', fibre: '1g', steps: ['Whisk 1 cup fresh curd until smooth.', 'Add grated cucumber (½), chopped mint leaves (handful), roasted jeera powder (½ tsp).', 'Add a pinch of black salt, salt, and chaat masala.', 'Mix well. Chill for 10 min before serving.'], tips: ['Use homemade or full-fat curd for better probiotics than store-bought low-fat', 'Roasted jeera powder is the secret — it massively improves digestion', 'Grating cucumber (not chopping) distributes it better and releases more flavour', 'This can be your evening snack — filling, probiotic, and zero unhealthy ingredients'], balance: 'Perfect accompaniment to any heavy meal — the probiotics help digest roti, rice, and dal better.' },
 { needs: ['tomato', 'onion'], any: ['garlic', 'ginger', 'oil', 'cumin', 'coriander'], name: 'Basic Tomato Sabzi', type: ['Lunch', 'Dinner'], diet: ['Vegetarian', 'Vegan'], cal: 90, protein: '3g', carbs: '14g', fat: '4g', fibre: '3g', steps: ['Heat 1 tsp oil. Add jeera (½ tsp), let it crackle.', 'Add chopped onion (1 medium), sauté until light golden.', 'Add ginger-garlic paste (1 tsp), cook 1 min.', 'Add chopped tomatoes (3 large), turmeric, salt, coriander powder.', 'Cook covered on medium heat for 10 min until tomatoes are fully soft.', 'Add garam masala, coriander leaves. Serve hot.'], tips: ['Cooking tomatoes in oil actually increases lycopene absorption — one of the few cases where cooking beats raw', 'Add a small piece of jaggery to balance the tartness without sugar', 'This base can be used for any sabzi — add paneer, boiled potato, or eggs', 'Use less oil than recipe calls for — tomatoes release enough moisture'], balance: 'Serve with 2 rotis and a dal for a complete meal. The vitamin C in tomatoes helps absorb iron from the dal.' },
];

function generateMealPlan() {
 const ingredientsRaw = document.getElementById('mealIngredients').value.toLowerCase().trim();
 if (!ingredientsRaw) { alert('Please enter your ingredients first'); return; }
 const mealType = document.getElementById('mealType').value;
 const dietPref = document.getElementById('mealDietPref').value;
 const goals = document.getElementById('mealGoals').value.toLowerCase();
 const ingredients = ingredientsRaw.split(/[,\s]+/).filter(Boolean);

 const scored = recipeDB.map(r => {
 let score = 0;
 const hasAll = r.needs.every(n => ingredients.some(i => i.includes(n) || n.includes(i)));
 if (!hasAll) return { r, score: -1 };
 if (r.type.includes(mealType)) score += 3;
 if (dietPref === 'Vegan' && r.diet.includes('Vegan')) score += 4;
 else if (dietPref === 'Non-vegetarian' && r.diet.includes('Non-vegetarian')) score += 4;
 else if (dietPref === 'Vegetarian' && r.diet.includes('Vegetarian')) score += 4;
 r.any.forEach(a => { if (ingredients.some(i => i.includes(a) || a.includes(i))) score++; });
 if (goals.includes('weight loss') && r.cal < 300) score += 2;
 if (goals.includes('protein') && parseInt(r.protein) > 15) score += 2;
 if (goals.includes('diabetic') && r.fibre >= '5g') score += 2;
 return { r, score };
 }).filter(x => x.score >= 0).sort((a, b) => b.score - a.score);

 const resultDiv = document.getElementById('mealResult');
 const contentDiv = document.getElementById('mealRecipeContent');
 resultDiv.style.display = 'block';

 if (scored.length === 0) {
 contentDiv.innerHTML = `
 <div class="tip-box"> No exact recipe match found for your ingredients. Try adding more common ingredients like onion, tomato, rice, dal, egg, or paneer.</div>
 <div style="font-size:13px;color:var(--t2);margin-top:.5rem">You have: <strong style="color:var(--t1)">${ingredientsRaw}</strong></div>`;
 return;
 }

 const best = scored[0].r;
 contentDiv.innerHTML = `
 <div style="font-size:18px;font-weight:800;color:var(--t1);margin-bottom:.25rem"> ${best.name}</div>
 <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:.875rem">
 <span class="badge blue"> ${best.cal} kcal</span>
 <span class="badge green"> Protein ${best.protein}</span>
 <span class="badge amber"> Carbs ${best.carbs}</span>
 </div>
 <div style="font-size:11px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px"> NUTRITION</div>
 <div style="display:flex;gap:16px;margin-bottom:.875rem;font-size:12px;color:var(--t2)">
 <span>Fat: ${best.fat}</span><span>Fibre: ${best.fibre}</span>
 </div>
 <div style="font-size:11px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">‍ COOKING STEPS</div>
 ${best.steps.map((s, i) => `<div style="display:flex;gap:10px;padding:6px 0;border-bottom:1px solid var(--border)">
 <span style="min-width:20px;height:20px;border-radius:50%;background:var(--navy);color:var(--blue);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i + 1}</span>
 <span style="font-size:13px;color:var(--t1);line-height:1.55">${s}</span>
 </div>`).join('')}
 <div style="font-size:11px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin:.875rem 0 8px"> HEALTHY TIPS</div>
 ${best.tips.map(t => `<div class="tip-box" style="margin-bottom:4px"> ${t}</div>`).join('')}
 <div style="font-size:11px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin:.875rem 0 6px"> BALANCE ADVICE</div>
 <div class="tip-box" style="border-left-color:var(--cyan);color:var(--cyan)">${best.balance}</div>
 ${scored.length > 1 ? `<div style="margin-top:.875rem;font-size:11px;color:var(--t3)">Also possible with your ingredients: ${scored.slice(1, 3).map(x => x.r.name).join(', ')}</div>` : ''}
 `;
}
