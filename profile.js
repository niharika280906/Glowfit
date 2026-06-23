/* profile.js — Profile, BMI, habits, timetable, skin */

/* HABITS */
function renderHabits() {
 document.getElementById('habitList').innerHTML = habits.map((h, i) => `
 <div class="habit-row">
 <span style="font-size:13px;font-weight:500;color:${h.done ? 'var(--t2)' : 'var(--t1)'};${h.done ? 'text-decoration:line-through' : ''}">${h.name}</span>
 <button class="toggle ${h.done ? 'on' : ''}" onclick="toggleHabit(${i})" aria-label="${h.name}"></button>
 </div>`).join('');
 const done = habits.filter(h => h.done).length;
 document.getElementById('habitScore').textContent = done + ' / ' + habits.length + ' today';
 document.getElementById('habitStreak').innerHTML = Array.from({ length: 7 }, (_, i) => `
 <div style="width:32px;height:32px;border-radius:8px;background:${i < done ? 'var(--blue)' : 'var(--bg3)'};border:1px solid ${i < done ? 'var(--blue)' : 'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:14px">${i < done ? '' : ''}</div>`).join('');
 updateStatBar();
 if (done === habits.length && habits.length > 0) checkAndIncrementStreak();
}

function toggleHabit(i) { habits[i].done = !habits[i].done; renderHabits(); saveData(); }

function addHabitPrompt() {
 const n = prompt('Enter a new habit:');
 if (n && n.trim()) { habits.push({ name: n.trim(), done: false }); renderHabits(); saveData(); }
}

/* PROFILE */
function saveProfile() {
 const name = document.getElementById('pName').value;
 if (name) document.getElementById('homeGreet').textContent = 'Namaste, ' + name.split(' ')[0] + '!';
 calcGoalAdvice();
 saveData();
}

function loadProfile() { calcBMI(); updateGoalProgress(); }

function calcBMI() {
 const h = parseFloat(document.getElementById('pHeight').value);
 const w = parseFloat(document.getElementById('pCurrentWeight').value);
 if (!h || !w) return;
 const bmi = w / ((h / 100) ** 2), bmiRound = Math.round(bmi * 10) / 10;
 document.getElementById('bmiVal').textContent = bmiRound;
 let cat, col;
 if (bmi < 18.5) { cat = 'Underweight'; col = '#60a5fa'; }
 else if (bmi < 25) { cat = 'Healthy '; col = '#4ade80'; }
 else if (bmi < 30) { cat = 'Overweight'; col = '#fbbf24'; }
 else { cat = 'Obese'; col = '#f87171'; }
 document.getElementById('bmiCat').textContent = cat;
 document.getElementById('bmiCat').style.color = col;
 const pct = Math.min(Math.max((bmi - 15) / 25, 0), 1);
 document.getElementById('bmiCircle').style.strokeDashoffset = Math.round(201 * (1 - pct));
 calcCalories(w, h);
}

function calcCalories(w, h) {
 const age = parseInt(document.getElementById('pAge').value) || 25;
 const gender = document.getElementById('pGender').value;
 let bmr = gender === 'male' ? 10 * w + 6.25 * h - 5 * age + 5 : 10 * w + 6.25 * h - 5 * age - 161;
 const tdee = Math.round(bmr * 1.375), target = Math.round(tdee - 500);
 document.getElementById('calTarget').textContent = target + ' kcal';
 document.getElementById('calAdvice').textContent = 'Based on moderate activity. 500 kcal deficit = ~0.5 kg/week loss';
 document.getElementById('statCal').textContent = target;
}

function updateGoalProgress() {
 const cw = parseFloat(document.getElementById('pCurrentWeight').value);
 const gw = parseFloat(document.getElementById('pGoalWeight').value);
 const weeks = parseInt(document.getElementById('pTimeline').value) || 12;
 if (!cw || !gw) return;
 const startWeight = cw + 5, lost = startWeight - cw, total = startWeight - gw;
 const pct = Math.max(0, Math.min(100, Math.round(lost / total * 100)));
 document.getElementById('homeGoalPct').textContent = pct + '%';
 document.getElementById('homeGoalBar').style.width = pct + '%';
 document.getElementById('homeGoalInfo').textContent = cw + 'kg → ' + gw + 'kg';
 document.getElementById('homeDaysLeft').textContent = weeks * 7 + ' days remaining in your journey';
 calcGoalAdvice();
}

function calcGoalAdvice() {
 const cw = parseFloat(document.getElementById('pCurrentWeight').value);
 const gw = parseFloat(document.getElementById('pGoalWeight').value);
 const weeks = parseInt(document.getElementById('pTimeline').value) || 12;
 if (!cw || !gw) return;
 const diff = cw - gw, perWeek = (diff / weeks).toFixed(1);
 document.getElementById('goalAdvice').textContent = diff > 0
 ? `Target: lose ${diff} kg in ${weeks} weeks (~${perWeek} kg/week). Requires ~${Math.round(perWeek * 1000)} kcal weekly deficit. Follow the diet plan and do 30-45 min of exercise daily.`
 : `You're already at or below your goal weight! Focus on maintaining through balanced diet and regular activity.`;
}

/* SKIN */
function renderSkinFoods() {
 const foods = ['Amla', 'Tomato', 'Papaya', 'Almonds', 'Walnuts', 'Avocado', 'Flaxseeds', 'Green tea', 'Turmeric', 'Cucumber', 'Pomegranate', 'Carrot', 'Sweet potato', 'Dark chocolate (70%+)', 'Coconut water'];
 document.getElementById('skinFoods').innerHTML = foods.map(f => `<span class="tag">${f}</span>`).join('');
}

/* TIMETABLE */
function generateTimetable() {
 const wake = document.getElementById('wakeTime').value || '06:00';
 const study = parseInt(document.getElementById('studyHours').value) || 6;
 const commute = parseFloat(document.getElementById('commuteHours').value) || 1;
 const [wh, wm] = wake.split(':').map(Number);
 const start = wh * 60 + wm;
 const schedule = [
 { t: mins(start), act: 'Wake up + brush + freshen up', cat: '' },
 { t: mins(start + 20), act: 'Warm lemon water + stretching', cat: '💧' },
 { t: mins(start + 40), act: 'Morning workout / yoga / walk', cat: '' },
 { t: mins(start + 100), act: 'Shower + get ready', cat: '' },
 { t: mins(start + 130), act: 'Healthy breakfast', cat: '' },
 { t: mins(start + 160), act: study > 0 ? `Study / work session 1 (${Math.ceil(study / 2)} hrs)` : 'Light morning activity', cat: '' },
 { t: mins(start + 160 + Math.ceil(study / 2) * 60 + 30), act: 'Healthy lunch + short walk', cat: '' },
 { t: mins(start + 160 + Math.ceil(study / 2) * 60 + 90), act: study > 0 ? `Study / work session 2 (${Math.floor(study / 2)} hrs)` : 'Afternoon focus', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 30), act: 'Evening snack + water + rest', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 90), act: 'Evening walk / light workout', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 150), act: commute > 0 ? `Commute / driving (${commute} hrs)` : 'Free time / hobbies', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 150 + commute * 60), act: 'Dinner (before 8 PM)', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 150 + commute * 60 + 60), act: 'Family time / relaxation / reading', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 150 + commute * 60 + 120), act: 'Skincare routine + no screens', cat: '' },
 { t: mins(start + 160 + study * 60 + 90 + 150 + commute * 60 + 150), act: 'Sleep', cat: '' },
 ];
 document.getElementById('timetableBody').innerHTML = schedule.map(s => `
 <tr><td style="width:72px;color:var(--blue);font-weight:700;white-space:nowrap">${s.t}</td><td style="color:var(--t1)">${s.cat} ${s.act}</td></tr>`).join('');
 saveData();
}

function mins(m) {
 const h = Math.floor((m % 1440) / 60), mn = m % 60, ampm = h >= 12 ? 'PM' : 'AM';
 return (h % 12 || 12) + ':' + (mn < 10 ? '0' : '') + mn + ' ' + ampm;
}
