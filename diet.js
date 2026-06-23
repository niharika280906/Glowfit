/* diet.js — Diet data, render functions, health conditions */

const vegDiet = [
 { day: "Mon", meals: [{ t: "Breakfast 7:30am", items: "Upma + groundnuts + green tea / poha with peanuts", cal: 320, p: "12g", f: "6g", c: "52g" }, { t: "Mid-morning 10:30am", items: "1 banana + handful of almonds (8-10)", cal: 180, p: "4g", f: "8g", c: "22g" }, { t: "Lunch 1pm", items: "2 multigrain roti + dal tadka + sabzi + cucumber raita", cal: 480, p: "18g", f: "10g", c: "72g" }, { t: "Evening 4pm", items: "Roasted makhana + green tea / coconut water", cal: 120, p: "4g", f: "2g", c: "20g" }, { t: "Dinner 7:30pm", items: "Moong dal khichdi + steamed broccoli + chaas", cal: 380, p: "16g", f: "6g", c: "58g" }], cal: "~1480 kcal" },
 { day: "Tue", meals: [{ t: "Breakfast 7:30am", items: "Oats porridge with banana + almond milk + chia seeds", cal: 340, p: "10g", f: "8g", c: "56g" }, { t: "Mid-morning 10:30am", items: "Apple + 5 walnuts", cal: 160, p: "3g", f: "8g", c: "20g" }, { t: "Lunch 1pm", items: "Brown rice + rajma curry + palak sabzi + dahi", cal: 520, p: "20g", f: "8g", c: "84g" }, { t: "Evening 4pm", items: "Sprouts chaat + nimbu pani", cal: 140, p: "8g", f: "2g", c: "24g" }, { t: "Dinner 7:30pm", items: "Palak paneer (less oil) + 2 jowar roti + salad", cal: 460, p: "20g", f: "14g", c: "54g" }], cal: "~1620 kcal" },
 { day: "Wed", meals: [{ t: "Breakfast 7:30am", items: "Besan chilla (2) + mint chutney + green tea", cal: 300, p: "14g", f: "8g", c: "38g" }, { t: "Mid-morning 10:30am", items: "Mixed fruit bowl + handful of peanuts", cal: 180, p: "5g", f: "7g", c: "26g" }, { t: "Lunch 1pm", items: "2 roti + chole curry + beetroot salad + chaas", cal: 500, p: "16g", f: "10g", c: "80g" }, { t: "Evening 4pm", items: "Roasted chana + amla juice", cal: 130, p: "6g", f: "2g", c: "22g" }, { t: "Dinner 7:30pm", items: "Vegetable soup + 2 roti + dahi + sabzi", cal: 380, p: "14g", f: "8g", c: "56g" }], cal: "~1490 kcal" },
 { day: "Thu", meals: [{ t: "Breakfast 7:30am", items: "Idli (3) + sambar + coconut chutney", cal: 320, p: "10g", f: "4g", c: "58g" }, { t: "Mid-morning 10:30am", items: "Papaya + 8 almonds", cal: 130, p: "3g", f: "5g", c: "20g" }, { t: "Lunch 1pm", items: "Khichdi (dal+rice) + ghee (1 tsp) + pickle + papad + dahi", cal: 480, p: "16g", f: "10g", c: "74g" }, { t: "Evening 4pm", items: "Makhana + coconut water", cal: 130, p: "4g", f: "2g", c: "22g" }, { t: "Dinner 7:30pm", items: "Mixed veg curry + 2 roti + raita", cal: 400, p: "12g", f: "10g", c: "60g" }], cal: "~1460 kcal" },
 { day: "Fri", meals: [{ t: "Breakfast 7:30am", items: "Dosa (plain) + sambar + tomato chutney", cal: 300, p: "8g", f: "6g", c: "52g" }, { t: "Mid-morning 10:30am", items: "Orange + 5 cashews", cal: 120, p: "3g", f: "4g", c: "18g" }, { t: "Lunch 1pm", items: "2 roti + dal + aloo sabzi + salad + dahi", cal: 500, p: "16g", f: "10g", c: "78g" }, { t: "Evening 4pm", items: "Green tea + 2 rice cakes + peanut butter (1 tsp)", cal: 120, p: "4g", f: "4g", c: "18g" }, { t: "Dinner 7:30pm", items: "Tofu/paneer stir fry + brown rice + sabzi", cal: 420, p: "18g", f: "10g", c: "58g" }], cal: "~1460 kcal" },
 { day: "Sat", meals: [{ t: "Breakfast 7:30am", items: "Vegetable upma + boiled egg / protein shake", cal: 340, p: "14g", f: "8g", c: "48g" }, { t: "Mid-morning 10:30am", items: "Smoothie — banana + dahi + honey", cal: 200, p: "6g", f: "2g", c: "40g" }, { t: "Lunch 1pm", items: "Rajma chawal + cucumber raita + salad", cal: 520, p: "18g", f: "8g", c: "86g" }, { t: "Evening 4pm", items: "Sprouts + lemon water", cal: 100, p: "6g", f: "1g", c: "16g" }, { t: "Dinner 7:30pm", items: "Dal + 2 roti + steamed veg + dahi", cal: 400, p: "16g", f: "8g", c: "60g" }], cal: "~1560 kcal" },
 { day: "Sun", meals: [{ t: "Breakfast 7:30am", items: "Pesarattu (moong dosa) + ginger chutney + masala chai", cal: 340, p: "14g", f: "6g", c: "56g" }, { t: "Mid-morning 10:30am", items: "Seasonal fruit + roasted seeds mix", cal: 150, p: "4g", f: "6g", c: "20g" }, { t: "Lunch 1pm", items: "Veg biryani (brown rice) + raita + salad", cal: 500, p: "14g", f: "10g", c: "82g" }, { t: "Evening 4pm", items: "Makhana + coconut water", cal: 130, p: "4g", f: "2g", c: "22g" }, { t: "Dinner 7:30pm", items: "Palak dal + 2 roti + sabzi", cal: 400, p: "16g", f: "8g", c: "60g" }], cal: "~1520 kcal" }
];

const nonVegDiet = [
 { day: "Mon", meals: [{ t: "Breakfast 7:30am", items: "Egg bhurji (2 eggs) + whole wheat toast + green tea", cal: 360, p: "22g", f: "14g", c: "32g" }, { t: "Mid-morning 10:30am", items: "Boiled egg + banana + 8 almonds", cal: 220, p: "10g", f: "8g", c: "24g" }, { t: "Lunch 1pm", items: "Chicken curry (150g) + 2 roti + cucumber raita + salad", cal: 540, p: "38g", f: "14g", c: "48g" }, { t: "Evening 4pm", items: "Roasted chana + green tea", cal: 130, p: "7g", f: "2g", c: "22g" }, { t: "Dinner 7:30pm", items: "Grilled fish (150g) + brown rice + mixed sabzi + dahi", cal: 440, p: "32g", f: "8g", c: "50g" }], cal: "~1690 kcal" },
 { day: "Tue", meals: [{ t: "Breakfast 7:30am", items: "Omelette (3 eggs) + poha + ginger tea", cal: 380, p: "24g", f: "14g", c: "32g" }, { t: "Mid-morning 10:30am", items: "Chicken tikka bites or boiled eggs + fruit", cal: 200, p: "18g", f: "6g", c: "16g" }, { t: "Lunch 1pm", items: "Fish curry + 2 roti + palak dal + onion salad", cal: 560, p: "36g", f: "14g", c: "52g" }, { t: "Evening 4pm", items: "Boiled egg + apple + chai", cal: 180, p: "8g", f: "5g", c: "24g" }, { t: "Dinner 7:30pm", items: "Chicken soup + 2 roti + raita", cal: 400, p: "28g", f: "8g", c: "44g" }], cal: "~1720 kcal" },
 { day: "Wed", meals: [{ t: "Breakfast 7:30am", items: "Egg paratha (1) + dahi + mixed fruit", cal: 400, p: "16g", f: "14g", c: "50g" }, { t: "Mid-morning 10:30am", items: "Protein shake or buttermilk + nuts", cal: 190, p: "14g", f: "5g", c: "20g" }, { t: "Lunch 1pm", items: "Mutton (100g) + 2 roti + dal + salad", cal: 580, p: "34g", f: "18g", c: "52g" }, { t: "Evening 4pm", items: "Sprouts + 1 boiled egg + lemon water", cal: 160, p: "10g", f: "3g", c: "22g" }, { t: "Dinner 7:30pm", items: "Grilled chicken (100g) + khichdi + sabzi", cal: 420, p: "30g", f: "8g", c: "48g" }], cal: "~1750 kcal" },
 { day: "Thu", meals: [{ t: "Breakfast 7:30am", items: "Pesarattu + egg curry + green tea", cal: 360, p: "20g", f: "10g", c: "44g" }, { t: "Mid-morning 10:30am", items: "Dry fruits + coconut water", cal: 160, p: "3g", f: "6g", c: "22g" }, { t: "Lunch 1pm", items: "Prawn masala + brown rice + rasam + papad", cal: 500, p: "28g", f: "10g", c: "62g" }, { t: "Evening 4pm", items: "Chicken tikka (2 pieces) + mint chutney", cal: 200, p: "18g", f: "6g", c: "8g" }, { t: "Dinner 7:30pm", items: "Egg curry + 2 roti + dahi", cal: 420, p: "24g", f: "12g", c: "48g" }], cal: "~1640 kcal" },
 { day: "Fri", meals: [{ t: "Breakfast 7:30am", items: "Scrambled eggs (2) + multigrain toast + black coffee", cal: 320, p: "18g", f: "12g", c: "28g" }, { t: "Mid-morning 10:30am", items: "Yogurt + granola + mixed berries", cal: 200, p: "8g", f: "4g", c: "34g" }, { t: "Lunch 1pm", items: "Fish tikka + quinoa + green salad + raita", cal: 500, p: "32g", f: "10g", c: "56g" }, { t: "Evening 4pm", items: "Boiled eggs (2) + green tea", cal: 160, p: "12g", f: "10g", c: "2g" }, { t: "Dinner 7:30pm", items: "Chicken soup + 2 roti + palak sabzi", cal: 400, p: "28g", f: "8g", c: "46g" }], cal: "~1580 kcal" },
 { day: "Sat", meals: [{ t: "Breakfast 7:30am", items: "Egg dosa + sambar + coconut chutney", cal: 380, p: "20g", f: "10g", c: "50g" }, { t: "Mid-morning 10:30am", items: "Smoothie — banana + milk + chia seeds", cal: 240, p: "8g", f: "4g", c: "44g" }, { t: "Lunch 1pm", items: "Butter chicken (less oil) + 2 roti + raita + salad", cal: 580, p: "36g", f: "16g", c: "52g" }, { t: "Evening 4pm", items: "Handful chana + amla juice", cal: 130, p: "6g", f: "2g", c: "22g" }, { t: "Dinner 7:30pm", items: "Grilled fish (130g) + veg soup + salad", cal: 320, p: "28g", f: "6g", c: "24g" }], cal: "~1650 kcal" },
 { day: "Sun", meals: [{ t: "Breakfast 7:30am", items: "2 eggs + toast + fruit + masala chai", cal: 420, p: "22g", f: "14g", c: "52g" }, { t: "Mid-morning 10:30am", items: "Protein bar or dry fruits + coconut water", cal: 200, p: "10g", f: "6g", c: "26g" }, { t: "Lunch 1pm", items: "Chicken biryani (1 cup) + raita + salad", cal: 620, p: "32g", f: "18g", c: "76g" }, { t: "Evening 4pm", items: "Rice cakes + peanut butter", cal: 160, p: "5g", f: "6g", c: "22g" }, { t: "Dinner 7:30pm", items: "Egg soup + 1 roti + mixed veg", cal: 300, p: "16g", f: "6g", c: "38g" }], cal: "~1700 kcal" }
];

/* DIET RENDER */
function renderDiet() {
 const diet = isVeg ? vegDiet : nonVegDiet;
 const tabs = document.getElementById('dietDayTabs');
 tabs.innerHTML = diet.map((d, i) => `<button class="day-pill ${i === currentDietDay ? 'active' : ''}" onclick="setDietDay(${i})">${d.day}</button>`).join('');
 renderDietDay();
}

function setDietDay(i) { currentDietDay = i; renderDiet(); saveData(); }

function renderDietDay() {
 const diet = isVeg ? vegDiet : nonVegDiet;
 const d = diet[currentDietDay];
 document.getElementById('dietDayTitle').innerHTML = `<i class="ti ti-sun"></i>Day ${currentDietDay + 1} — ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][currentDietDay]}`;
 document.getElementById('dietMealList').innerHTML = d.meals.map(m => `
 <div class="meal-item">
 <div style="flex:1">
 <div class="meal-time">${m.t}</div>
 <div class="meal-name" style="margin:2px 0">${m.items}</div>
 <div class="meal-macro">Protein: ${m.p} · Fat: ${m.f} · Carbs: ${m.c}</div>
 </div>
 <div class="meal-cal">${m.cal} kcal</div>
 </div>`).join('');
 document.getElementById('dietTotalCal').textContent = d.cal;
 document.getElementById('macroTags').innerHTML = `
 <span class="tag"> High protein</span>
 <span class="tag"> Balanced carbs</span>
 <span class="tag"> High fibre</span>`;

 let healthSection = '';
 if (activeConditions.size > 0) {
 const boostFoods = getBoostFoods();
 const avoidFoods = getAvoidFoods();
 const notes = [...activeConditions].map(k => {
 const h = window.healthDB[k];
 if (!h) return '';
 return `<div class="diet-boost" style="margin-bottom:6px"><strong>${h.emoji} ${h.label}:</strong> ${h.mealNote}</div>`;
 }).join('');
 healthSection = `
 <div style="margin-top:.75rem">
 <div class="card-title" style="margin-bottom:.5rem"><i class="ti ti-heart-plus" style="color:#f87171"></i>Personalised for your health</div>
 ${notes}
 <div style="margin-top:.5rem">
 <div class="section-label">Add to today's meals</div>
 <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">${boostFoods.slice(0, 12).map(f => `<span class="tag" style="color:var(--cyan);border-color:rgba(56,189,248,.25)">${f}</span>`).join('')}</div>
 </div>
 ${avoidFoods.length ? `<div style="margin-top:.75rem">
 <div class="section-label" style="color:var(--red)">Limit or avoid today</div>
 <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">${avoidFoods.slice(0, 8).map(f => `<span class="tag" style="color:var(--red);border-color:rgba(240,82,82,.25)">${f}</span>`).join('')}</div>
 </div>` : ''}
 </div>`;
 }

 let macroEl = document.getElementById('macroTags');
 let existing = document.getElementById('dietHealthBoost');
 if (existing) existing.remove();
 if (healthSection) {
 const div = document.createElement('div');
 div.id = 'dietHealthBoost';
 div.innerHTML = healthSection;
 macroEl.parentNode.insertBefore(div, macroEl.nextSibling);
 }

 document.getElementById('nutritionTips').innerHTML = `
 <div class="tip-box"> Eat 4-5 small meals rather than 2-3 large ones for better metabolism</div>
 <div class="tip-box"> Include Vitamin C (amla/nimbu) per meal to improve iron absorption</div>
 <div class="tip-box"> Avoid combining milk with citrus — causes digestive upset</div>
 <div class="tip-box"> Maintain at least 12-hour gap between dinner and next day's breakfast</div>`;
}

function toggleDiet() {
 isVeg = !isVeg;
 document.getElementById('dietTypeLabel').textContent = isVeg ? 'Veg' : 'Non-Veg';
 document.getElementById('dietTypeBadge').textContent = isVeg ? 'Vegetarian' : 'Non-Vegetarian';
 document.getElementById('dietTypeBadge').className = 'badge ' + (isVeg ? 'green' : 'amber');
 renderDiet();
 saveData();
}

/* HEALTH CONDITIONS */
function toggleCondition(key, btn) {
 if (activeConditions.has(key)) {
 activeConditions.delete(key);
 btn.classList.remove('active');
 } else {
 activeConditions.add(key);
 btn.classList.add('active');
 }
 renderHealthAdvice();
 renderDiet();
 saveData();
}

function renderHealthAdvice() {
 const box = document.getElementById('healthAdviceBox');
 const list = document.getElementById('healthAdviceList');
 if (activeConditions.size === 0) { box.style.display = 'none'; return; }
 box.style.display = 'block';
 list.innerHTML = [...activeConditions].map(key => {
 const h = window.healthDB[key];
 if (!h) return '';
 return `<div class="health-alert">
 <div class="health-alert-title">${h.emoji} ${h.label}</div>
 <div class="health-alert-body">${h.tip}</div>
 <div class="health-alert-foods">${h.add.map(f => `<span class="tag" style="color:var(--cyan);border-color:rgba(56,189,248,.3)">${f}</span>`).join('')}</div>
 </div>`;
 }).join('');
}

function getBoostFoods() {
 const all = new Set();
 activeConditions.forEach(k => {
 const h = window.healthDB[k];
 if (h) h.add.forEach(f => all.add(f));
 });
 return [...all];
}

function getAvoidFoods() {
 const all = new Set();
 activeConditions.forEach(k => {
 const h = window.healthDB[k];
 if (h) h.avoid.forEach(f => all.add(f));
 });
 return [...all];
}
