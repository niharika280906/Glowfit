/* app.js — Core state, navigation, persistence, Firebase, AI, PWA, theme */

/* GLOBAL STATE */
let isVeg = true;
let waterGlasses = 0;
let steps = 0;
let habits = [
 { name: "Wake up early (before 7am)", done: false },
 { name: "Morning stretching 10 min", done: false },
 { name: "No sugar / processed food today", done: false },
 { name: "Meditate 10 minutes", done: false },
 { name: "Sleep before 11 PM", done: false },
 { name: "No screen time 30 min before bed", done: false }
];
let workoutRunning = false, workoutSec = 0, workoutInterval;
let currentDietDay = 0;
let activeConditions = new Set();

/* BUILT-IN HEALTH DB */
window.healthDB = {
 iron_deficiency: { emoji: '', label: 'Iron deficiency', tip: 'Eat iron-rich foods with Vitamin C to boost absorption. Avoid tea/coffee with meals.', mealNote: 'Add palak, beetroot, or dates to every meal today.', add: ['Palak', 'Beetroot', 'Dates', 'Rajma', 'Til', 'Jaggery', 'Pomegranate'], avoid: ['Tea with meals', 'Coffee with meals', 'Excess calcium at same time'] },
 vitamin_d: { emoji: '', label: 'Vitamin D low', tip: 'Get 20 min of morning sun daily. Include eggs, mushrooms, and fortified milk.', mealNote: 'Include eggs or fortified milk today.', add: ['Eggs', 'Fortified milk', 'Mushrooms', 'Fish', 'Sunshine 20 min'], avoid: ['Processed foods', 'Excess sugar'] },
 vitamin_b12: { emoji: '', label: 'Vitamin B12 low', tip: 'B12 is mainly in animal products. Vegans should supplement. Include milk, curd, paneer daily.', mealNote: 'Have dahi and paneer today. Consider B12 supplement if vegetarian.', add: ['Dahi', 'Paneer', 'Milk', 'Eggs', 'Fortified nutritional yeast'], avoid: ['Alcohol', 'Excess coffee'] },
 calcium: { emoji: '', label: 'Low calcium', tip: 'Have 3 servings of dairy per day. Sesame seeds have more calcium than milk per gram.', mealNote: 'Add til (sesame), ragi, or dahi to your meals today.', add: ['Dahi', 'Milk', 'Ragi', 'Til', 'Paneer', 'Almonds', 'Figs'], avoid: ['Excess sodium', 'Excess oxalates (spinach with dairy)'] },
 vitamin_c: { emoji: '', label: 'Low Vitamin C', tip: 'Have amla daily — it has 20x more Vitamin C than oranges and withstands cooking.', mealNote: 'Add raw amla, lemon, or capsicum to every meal today.', add: ['Amla', 'Lemon', 'Capsicum', 'Guava', 'Orange', 'Tomato'], avoid: ['Boiling vegetables for long', 'Reheating Vitamin C foods'] },
 omega3: { emoji: '', label: 'Low Omega-3', tip: 'Include walnuts, flaxseeds, and chia seeds daily. Fish 2x/week if non-veg.', mealNote: 'Add flaxseed powder or chia seeds to your meals today.', add: ['Walnuts', 'Flaxseeds', 'Chia seeds', 'Fish', 'Mustard oil'], avoid: ['Excess omega-6 oils (sunflower, corn)'] },
 zinc: { emoji: '', label: 'Zinc deficiency', tip: 'Zinc boosts immunity and skin health. Pumpkin seeds are highest plant source.', mealNote: 'Add pumpkin seeds or sesame to your food today.', add: ['Pumpkin seeds', 'Til', 'Chickpeas', 'Cashews', 'Eggs', 'Mushrooms'], avoid: ['Excessive iron supplementation'] },
 magnesium: { emoji: '', label: 'Low magnesium', tip: 'Magnesium reduces stress, improves sleep, and prevents cramps. Dark greens are key.', mealNote: 'Have palak sabzi or banana today for magnesium boost.', add: ['Palak', 'Banana', 'Pumpkin seeds', 'Dark chocolate (small)', 'Almonds'], avoid: ['Excess alcohol', 'Excess coffee', 'Processed foods'] },
 protein: { emoji: '', label: 'Low protein', tip: 'Aim for 0.8-1g protein per kg bodyweight. Combine dal + roti for complete amino acids.', mealNote: 'Every meal should have a protein source — dal, egg, paneer, or curd.', add: ['Moong dal', 'Soya chunks', 'Eggs', 'Paneer', 'Dahi', 'Rajma', 'Chickpeas'], avoid: ['Refined carbs without protein', 'Skipping dal'] },
 folate: { emoji: '', label: 'Low folate', tip: 'Critical for cell growth. Especially important if pregnant. Dark greens are best source.', mealNote: 'Add palak or methi to a meal today.', add: ['Palak', 'Methi', 'Moong dal', 'Asparagus', 'Beetroot', 'Broccoli'], avoid: ['Boiling greens (destroys folate)', 'Alcohol'] },
 diabetes: { emoji: '', label: 'Diabetes/Pre-diabetes', tip: 'Focus on low-GI foods. Never skip meals. Walk 10 min after every meal to reduce sugar spikes.', mealNote: 'Choose brown rice, whole wheat roti over maida. Avoid sugar and juices.', add: ['Bitter gourd', 'Methi seeds', 'Oats', 'Cinnamon', 'Amla', 'Nuts'], avoid: ['White rice', 'Maida', 'Sugar', 'Fruit juices', 'Potatoes'] },
 thyroid: { emoji: '', label: 'Thyroid (Hypothyroid)', tip: 'Avoid cruciferous raw vegetables in excess. Include selenium and iodine-rich foods.', mealNote: 'Use iodised salt. Avoid raw cabbage and broccoli in excess.', add: ['Brazil nuts (selenium)', 'Iodised salt', 'Seafood', 'Coconut oil (small)', 'Pumpkin seeds'], avoid: ['Raw cabbage', 'Raw broccoli', 'Soy in excess', 'Gluten (some cases)'] },
 pcos: { emoji: '', label: 'PCOS', tip: 'PCOS responds well to low-GI diet, reducing sugar and stress. Spearmint tea daily helps.', mealNote: 'Avoid refined carbs today. Include cinnamon in meals.', add: ['Spearmint tea', 'Cinnamon', 'Flaxseeds', 'Methi', 'Berries', 'Leafy greens'], avoid: ['Sugar', 'Maida', 'Dairy in excess', 'Fried foods', 'Alcohol'] },
 bp_high: { emoji: '', label: 'High Blood Pressure', tip: 'Reduce sodium to under 2g/day. DASH diet (fruits, vegetables, whole grains) is proven effective.', mealNote: 'Reduce salt today. Use lemon and herbs instead for flavour.', add: ['Banana', 'Watermelon', 'Garlic', 'Flaxseeds', 'Beetroot juice', 'Oats'], avoid: ['Extra salt', 'Pickles', 'Papad', 'Packaged snacks', 'Caffeine'] },
 cholesterol: { emoji: '', label: 'High Cholesterol', tip: 'Replace saturated fats with unsaturated. Oats and flaxseed are clinically proven to lower LDL.', mealNote: 'Have oatmeal for breakfast and include garlic in cooking today.', add: ['Oats', 'Garlic', 'Flaxseeds', 'Walnuts', 'Avocado', 'Olive oil', 'Green tea'], avoid: ['Ghee in excess', 'Fried foods', 'Red meat', 'Full-fat dairy in excess'] },
 acidity: { emoji: '', label: 'Acidity / GERD', tip: 'Eat small frequent meals. Avoid lying down after eating. Cold milk can neutralise acid temporarily.', mealNote: 'Eat dinner before 7 PM. Avoid spicy food and fried items today.', add: ['Cold milk', 'Banana', 'Coconut water', 'Fennel seeds (saunf)', 'Buttermilk'], avoid: ['Spicy food', 'Fried food', 'Coffee on empty stomach', 'Tomatoes in excess', 'Citrus at night'] },
 constipation: { emoji: '', label: 'Constipation', tip: 'Increase fibre and water dramatically. Triphala at night with warm water is highly effective.', mealNote: 'Drink 3L water today. Add high-fibre foods to every meal.', add: ['Triphala (night)', 'Papaya', 'Prunes', 'Flaxseeds', 'Oats', 'Warm water with lemon'], avoid: ['Refined flour', 'White rice excess', 'Dairy excess', 'Bananas (ripe unripe matters)'] },
 anemia: { emoji: '', label: 'Anaemia', tip: 'Combine iron-rich foods with Vitamin C at every meal. Avoid tea/coffee within 1 hr of meals.', mealNote: 'Have rajma or palak with lemon today.', add: ['Rajma', 'Palak', 'Beetroot', 'Pomegranate', 'Dates', 'Jaggery', 'Moringa'], avoid: ['Tea with meals', 'Calcium with iron at same time'] },
 fatty_liver: { emoji: '', label: 'Fatty Liver', tip: 'Reduce fructose, alcohol and saturated fat completely. Coffee (black) is protective.', mealNote: 'Avoid fried foods and sugar completely today.', add: ['Black coffee', 'Garlic', 'Green tea', 'Broccoli', 'Turmeric', 'Walnuts', 'Olive oil'], avoid: ['Alcohol', 'Sugar', 'Maida', 'Fried foods', 'Red meat'] },
 kidney: { emoji: '💧', label: 'Kidney Stones', tip: 'Drink minimum 3 litres of water daily. Reduce oxalates if calcium oxalate stones.', mealNote: 'Drink extra water today. Avoid excess spinach and nuts.', add: ['Water 3L+', 'Lemon water', 'Coconut water', 'Low-fat dairy'], avoid: ['Excess spinach', 'Beet', 'Nuts in excess', 'Salt', 'Animal protein excess'] }
};

const tips = [
 "Eat dinner before 8 PM for better digestion and weight loss.",
 "Start your morning with warm lemon water to kickstart metabolism.",
 "Replace maida roti with multigrain or jowar roti for more fiber.",
 "Chew each bite 20-30 times — it signals satiety faster to your brain.",
 "Add haldi (turmeric) to your daily diet for anti-inflammatory benefits.",
 "Never skip breakfast — it keeps metabolism high throughout the day.",
 "Include protein in every meal to preserve muscle while losing fat.",
 "A 10-minute post-meal walk reduces blood sugar spikes by 30%.",
 "Stress increases cortisol which directly causes belly fat — meditate daily.",
 "Sleep 7-8 hours — poor sleep increases hunger hormones by 24%.",
 "Drink a glass of water before each meal to eat 13% fewer calories.",
 "Green tea with ginger before workouts burns 12% more fat."
];

/* THEME */
function toggleTheme() {
 const html = document.documentElement;
 const isDark = html.getAttribute('data-theme') === 'dark';
 const newTheme = isDark ? 'light' : 'dark';
 html.setAttribute('data-theme', newTheme);
 localStorage.setItem('gf_theme', newTheme);
 const themeBtn = document.getElementById('themeBtn');
 const darkToggle = document.getElementById('darkModeToggle');
 if (themeBtn) themeBtn.innerHTML = `<i class="ti ti-${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
 if (darkToggle) darkToggle.classList.toggle('on', newTheme === 'dark');
 if (mainChartInstance) setTimeout(renderMainChart, 100);
}

function loadTheme() {
 const saved = localStorage.getItem('gf_theme') || 'dark';
 document.documentElement.setAttribute('data-theme', saved);
 const themeBtn = document.getElementById('themeBtn');
 if (themeBtn) themeBtn.innerHTML = `<i class="ti ti-${saved === 'dark' ? 'sun' : 'moon'}"></i>`;
 const darkToggle = document.getElementById('darkModeToggle');
 if (darkToggle) darkToggle.classList.toggle('on', saved === 'dark');
}

/* NAV */
function showPage(page) {
 document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
 document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
 document.getElementById('page-' + page).classList.add('active');
 document.querySelector('[data-page=' + page + ']').classList.add('active');
 window.scrollTo(0, 0);
 if (page === 'dashboard') {
 setTimeout(() => { showChart(currentChartType || 'water', null); }, 100);
 }
}

/* SAVE / LOAD */
function saveData() {
 try {
 const profile = {
 name: document.getElementById('pName').value,
 age: document.getElementById('pAge').value,
 gender: document.getElementById('pGender').value,
 height: document.getElementById('pHeight').value,
 currentWeight: document.getElementById('pCurrentWeight').value,
 goalWeight: document.getElementById('pGoalWeight').value,
 timeline: document.getElementById('pTimeline').value,
 };
 const timetable = {
 wakeTime: document.getElementById('wakeTime').value,
 studyHours: document.getElementById('studyHours').value,
 commuteHours: document.getElementById('commuteHours').value
 };
 localStorage.setItem('gf_profile', JSON.stringify(profile));
 localStorage.setItem('gf_timetable', JSON.stringify(timetable));
 localStorage.setItem('gf_water', waterGlasses);
 localStorage.setItem('gf_steps', steps);
 localStorage.setItem('gf_habits', JSON.stringify(habits));
 localStorage.setItem('gf_isVeg', isVeg);
 localStorage.setItem('gf_conditions', JSON.stringify([...activeConditions]));
 localStorage.setItem('gf_dietDay', currentDietDay);
 localStorage.setItem('gf_savedDate', new Date().toDateString());
 const reminderStates = [];
 document.querySelectorAll('#waterReminders .toggle').forEach(t => reminderStates.push(t.classList.contains('on')));
 localStorage.setItem('gf_waterReminders', JSON.stringify(reminderStates));
 saveDailyProgress();
 } catch (e) { console.warn('Save failed', e); }
}

function loadData() {
 try {
 const savedDate = localStorage.getItem('gf_savedDate');
 const isNewDay = savedDate && savedDate !== new Date().toDateString();

 const p = JSON.parse(localStorage.getItem('gf_profile') || '{}');
 if (p.name) document.getElementById('pName').value = p.name;
 if (p.age) document.getElementById('pAge').value = p.age;
 if (p.gender) document.getElementById('pGender').value = p.gender;
 if (p.height) document.getElementById('pHeight').value = p.height;
 if (p.currentWeight) document.getElementById('pCurrentWeight').value = p.currentWeight;
 if (p.goalWeight) document.getElementById('pGoalWeight').value = p.goalWeight;
 if (p.timeline) document.getElementById('pTimeline').value = p.timeline;
 if (p.name) document.getElementById('homeGreet').textContent = 'Namaste, ' + p.name.split(' ')[0] + '!';

 const tt = JSON.parse(localStorage.getItem('gf_timetable') || '{}');
 if (tt.wakeTime) document.getElementById('wakeTime').value = tt.wakeTime;
 if (tt.studyHours) document.getElementById('studyHours').value = tt.studyHours;
 if (tt.commuteHours) document.getElementById('commuteHours').value = tt.commuteHours;

 waterGlasses = isNewDay ? 0 : parseInt(localStorage.getItem('gf_water') || '0');
 steps = isNewDay ? 0 : parseInt(localStorage.getItem('gf_steps') || '0');

 const savedHabits = JSON.parse(localStorage.getItem('gf_habits') || 'null');
 if (savedHabits) habits = isNewDay ? savedHabits.map(h => ({ ...h, done: false })) : savedHabits;

 isVeg = localStorage.getItem('gf_isVeg') === 'false' ? false : true;
 const conds = JSON.parse(localStorage.getItem('gf_conditions') || '[]');
 activeConditions = new Set(conds);
 currentDietDay = parseInt(localStorage.getItem('gf_dietDay') || '0');

 const vegToggle = document.getElementById('vegToggle');
 if (vegToggle) vegToggle.classList.toggle('on', isVeg);

 activeConditions.forEach(key => {
 const btn = document.querySelector(`[onclick*="toggleCondition('${key}'"]`);
 if (btn) btn.classList.add('active');
 });
 } catch (e) { console.warn('Load failed', e); }
}

/* STREAK */
function updateStreak() {
 const today = new Date().toDateString();
 const last = localStorage.getItem('gf_streakDate');
 let streak = parseInt(localStorage.getItem('gf_streak') || '0');
 if (last !== today) {
 const yesterday = new Date(Date.now() - 86400000).toDateString();
 streak = last === yesterday ? streak + 1 : (!last ? 1 : 1);
 localStorage.setItem('gf_streak', streak);
 localStorage.setItem('gf_streakDate', today);
 }
 document.getElementById('streakBadge').textContent = streak + ' day' + (streak !== 1 ? 's' : '');
}

function checkAndIncrementStreak() {
 const today = new Date().toDateString();
 if (localStorage.getItem('gf_streakDate') === today) return;
 const yesterday = new Date(Date.now() - 86400000).toDateString();
 let streak = parseInt(localStorage.getItem('gf_streak') || '0');
 streak = localStorage.getItem('gf_streakDate') === yesterday ? streak + 1 : 1;
 localStorage.setItem('gf_streak', streak);
 localStorage.setItem('gf_streakDate', today);
 document.getElementById('streakBadge').textContent = streak + ' day' + (streak !== 1 ? 's' : '');
}

/* DAILY PROGRESS HISTORY */
function saveDailyProgress() {
 const today = new Date().toDateString();
 let history = JSON.parse(localStorage.getItem('gf_history') || '{}');
 history[today] = {
 water: waterGlasses, steps, habits: habits.filter(h => h.done).length,
 habitTotal: habits.length, calories: getTodayCalories(), date: today
 };
 const keys = Object.keys(history).sort((a, b) => new Date(b) - new Date(a));
 if (keys.length > 30) keys.slice(30).forEach(k => delete history[k]);
 localStorage.setItem('gf_history', JSON.stringify(history));
}

/* HOME */
function updateHomeSchedule() {
 const items = [
 { t: '7:00 AM', a: 'Morning workout' }, { t: '8:00 AM', a: 'Healthy breakfast' },
 { t: '1:00 PM', a: 'Nutritious lunch' }, { t: '4:00 PM', a: 'Evening snack' }, { t: '7:30 PM', a: 'Dinner' }
 ];
 document.getElementById('todaySchedule').innerHTML = items.map(i => `
 <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)">
 <span style="font-size:11px;color:var(--blue);font-weight:700;min-width:58px">${i.t}</span>
 <span style="font-size:13px;color:var(--t1)">${i.a}</span>
 </div>`).join('');
}

function updateStatBar() {
 document.getElementById('statHabits').textContent = habits.filter(h => h.done).length + '/' + habits.length;
}

function updateWeeklyOverview() {
 const history = JSON.parse(localStorage.getItem('gf_history') || '{}');
 const keys = Object.keys(history).slice(-7);
 if (!keys.length) return;
 const avgWater = Math.round(keys.reduce((s, k) => s + (history[k].water || 0), 0) / keys.length * 10) / 10;
 const avgSteps = Math.round(keys.reduce((s, k) => s + (history[k].steps || 0), 0) / keys.length);
 document.getElementById('weekWater').textContent = avgWater + ' glasses/day';
 document.getElementById('weekWaterBar').style.width = Math.min(avgWater / 8 * 100, 100) + '%';
 document.getElementById('weekSteps').textContent = avgSteps.toLocaleString() + ' steps/day';
 document.getElementById('weekStepsBar').style.width = Math.min(avgSteps / 8000 * 100, 100) + '%';
}

/* FIREBASE + GOOGLE SIGN-IN */
/*
 Paste your Firebase project config below.
 Firebase Console → Project Settings → Your apps → Web app → Config
*/
const FIREBASE_CONFIG = {
 apiKey: "AIzaSyBWCiAWGRXzx6qjODg4KcokZuOqKbTAt8I",
 authDomain: "glowfit-76f13.firebaseapp.com",
 projectId: "glowfit-76f13",
 storageBucket: "glowfit-76f13.firebasestorage.app",
 messagingSenderId: "163686392585",
 appId: "1:163686392585:web:6600c32b08bfdec965e9d8",
 measurementId: "G-43PS9VC8LV"
};

let fbApp = null, fbAuth = null, fbDb = null, fbUser = null;

function initFirebase() {
 if (fbApp) return;
 if (!FIREBASE_CONFIG.apiKey) return;
 try {
 fbApp = firebase.initializeApp(FIREBASE_CONFIG);
 fbAuth = firebase.auth();
 fbDb = firebase.firestore();
 fbAuth.onAuthStateChanged(user => {
 fbUser = user;
 updateAuthUI();
 });
 } catch(e) { console.warn('Firebase init error:', e.message); }
}

async function signInWithGoogle() {
 const errEl = document.getElementById('authError');
 errEl.style.display = 'none';

 if (!FIREBASE_CONFIG.apiKey) {
 errEl.textContent = ' Paste your Firebase config into app.js (FIREBASE_CONFIG) to enable sign-in.';
 errEl.style.display = 'block';
 return;
 }

 if (!fbApp) initFirebase();

 try {
 const provider = new firebase.auth.GoogleAuthProvider();
 await fbAuth.signInWithPopup(provider);
 closeAuthModal();
 } catch(e) {
 if (e.code === 'auth/popup-closed-by-user') return;
 errEl.textContent = e.message.replace('Firebase: ','').replace(/\(.*?\)\./g,'').trim();
 errEl.style.display = 'block';
 }
}

function updateAuthUI() {
 const signedIn = document.getElementById('authSignedIn');
 const notIn = document.getElementById('authContent');
 const nameEl = document.getElementById('authDisplayName');
 const emailEl = document.getElementById('authDisplayEmail');
 const img = document.getElementById('authAvatarImg');
 const btn = document.getElementById('authBtn');

 if (fbUser) {
 const name = fbUser.displayName || fbUser.email?.split('@')[0] || 'User';
 const photo = fbUser.photoURL;

 if (notIn) notIn.style.display = 'none';
 if (signedIn) signedIn.style.display = 'block';
 if (nameEl) nameEl.textContent = name;
 if (emailEl) emailEl.textContent = fbUser.email || '';
 if (img) { img.src = photo || ''; img.style.display = photo ? 'block' : 'none'; }
 if (btn) btn.innerHTML = photo
 ? `<img src="${photo}" style="width:26px;height:26px;border-radius:50%;object-fit:cover">`
 : `<i class="ti ti-user-circle"></i>`;
 } else {
 if (notIn) notIn.style.display = 'block';
 if (signedIn) signedIn.style.display = 'none';
 if (btn) btn.innerHTML = '<i class="ti ti-user-circle"></i>';
 }
}

function showAuthModal() {
 const modal = document.getElementById('authModal');
 if (modal) modal.style.display = 'flex';
 if (!fbApp) initFirebase();
 updateAuthUI();
}

function closeAuthModal() {
 const modal = document.getElementById('authModal');
 if (modal) modal.style.display = 'none';
}

function signOutUser() {
 if (fbAuth) fbAuth.signOut();
 fbUser = null;
 updateAuthUI();
 closeAuthModal();
}

/* CLOUD SYNC (Firestore) */
async function syncToCloud() {
 if (!fbDb || !fbUser) { showToast('Please sign in first'); return; }
 try {
 const allData = {};
 for (let i = 0; i < localStorage.length; i++) {
 const k = localStorage.key(i);
 if (k?.startsWith('gf_')) allData[k] = localStorage.getItem(k);
 }
 await fbDb.collection('users').doc(fbUser.uid).set({
 data: JSON.stringify(allData), syncedAt: new Date().toISOString()
 });
 showToast(' Saved to cloud!');
 } catch(e) { showToast(' Sync failed: ' + e.message); }
}

async function loadFromCloud() {
 if (!fbDb || !fbUser) { showToast('Please sign in first'); return; }
 try {
 const doc = await fbDb.collection('users').doc(fbUser.uid).get();
 if (!doc.exists) { showToast('No cloud backup found.'); return; }
 const allData = JSON.parse(doc.data().data || '{}');
 Object.entries(allData).forEach(([k, v]) => localStorage.setItem(k, v));
 showToast(' Loaded! Refreshing...');
 setTimeout(() => location.reload(), 1200);
 } catch(e) { showToast(' Load failed: ' + e.message); }
}

/* TOAST */
function showToast(msg) {
 let t = document.getElementById('gfToast');
 if (!t) {
 t = document.createElement('div');
 t.id = 'gfToast';
 t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--bg2);color:var(--t1);border:1px solid var(--border2);border-radius:10px;padding:10px 18px;font-size:13px;font-weight:600;z-index:9999;box-shadow:var(--shadow);transition:opacity .3s;white-space:nowrap';
 document.body.appendChild(t);
 }
 t.textContent = msg;
 t.style.opacity = '1';
 clearTimeout(t._to);
 t._to = setTimeout(() => t.style.opacity = '0', 2800);
}

/* PUSH NOTIFICATIONS */
async function toggleNotifications(btn) {
 btn.classList.toggle('on');
 if (btn.classList.contains('on')) {
 await requestNotificationPermission();
 } else {
 localStorage.removeItem('gf_notifEnabled');
 }
}

async function requestNotificationPermission() {
 if (!('Notification' in window)) { alert('Notifications not supported in this browser'); return; }
 const perm = await Notification.requestPermission();
 if (perm === 'granted') {
 localStorage.setItem('gf_notifEnabled', '1');
 scheduleWaterReminders();
 new Notification('GlowFit 💧', { body: 'Water & habit reminders are now enabled!', icon: 'icon-192.png' });
 } else {
 document.getElementById('notifToggle').classList.remove('on');
 alert('Please allow notifications in your browser settings to enable reminders.');
 }
}

function scheduleWaterReminders() {
 if (!('Notification' in window) || Notification.permission !== 'granted') return;
 if (!localStorage.getItem('gf_notifEnabled')) return;

 const now = new Date();
 const reminderTimes = [7, 9, 11, 13, 15, 17, 19, 21];

 reminderTimes.forEach(hour => {
 const target = new Date();
 target.setHours(hour, 0, 0, 0);
 if (target > now) {
 const delay = target - now;
 setTimeout(() => {
 if (localStorage.getItem('gf_notifEnabled')) {
 const water = parseInt(localStorage.getItem('gf_water') || '0');
 new Notification('GlowFit 💧', {
 body: water < 8 ? `Time to drink water! You've had ${water}/8 glasses today.` : ' Water goal achieved! Great job!',
 icon: 'icon-192.png'
 });
 }
 }, delay);
 }
 });

 // Habit reminder at 9 PM
 const habitTarget = new Date();
 habitTarget.setHours(21, 0, 0, 0);
 if (habitTarget > now) {
 const delay = habitTarget - now;
 setTimeout(() => {
 if (localStorage.getItem('gf_notifEnabled')) {
 const done = habits.filter(h => h.done).length;
 if (done < habits.length) {
 new Notification('GlowFit ', {
 body: `You've completed ${done}/${habits.length} habits today. Keep going!`,
 icon: 'icon-192.png'
 });
 }
 }
 }, delay);
 }
}

/* PWA */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
 e.preventDefault();
 deferredPrompt = e;
 const banner = document.getElementById('pwaBanner');
 if (banner) banner.style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', () => {
 const installBtn = document.getElementById('pwaInstallBtn');
 if (installBtn) {
 installBtn.addEventListener('click', async () => {
 if (deferredPrompt) {
 deferredPrompt.prompt();
 const { outcome } = await deferredPrompt.userChoice;
 if (outcome === 'accepted') document.getElementById('pwaBanner').style.display = 'none';
 deferredPrompt = null;
 }
 });
 }
});

window.addEventListener('appinstalled', () => {
 const banner = document.getElementById('pwaBanner');
 if (banner) banner.style.display = 'none';
});

if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
 navigator.serviceWorker.register('./sw.js').catch(() => {});
 });
}

/* CLEAR ALL DATA */
function clearAllData() {
 if (!confirm(' This will delete ALL your data including history, profile, and progress. Are you sure?')) return;
 const keys = [];
 for (let i = 0; i < localStorage.length; i++) {
 if (localStorage.key(i)?.startsWith('gf_')) keys.push(localStorage.key(i));
 }
 keys.forEach(k => localStorage.removeItem(k));
 location.reload();
}

/* INIT */
async function init() {
 loadTheme();

 document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
 document.getElementById('dailyTip').textContent = tips[Math.floor(Math.random() * tips.length)];

 loadData();
 renderWaterDrops();
 renderWaterReminders();
 renderHabits();
 renderDiet();
 renderWorkout('all');
 renderSkinFoods();
 generateTimetable();
 loadProfile();
 updateHomeSchedule();
 updateWeeklyOverview();
 updateStatBar();
 document.getElementById('dietTypeLabel').textContent = isVeg ? 'Veg' : 'Non-Veg';
 document.getElementById('dietTypeBadge').textContent = isVeg ? 'Vegetarian' : 'Non-Vegetarian';
 document.getElementById('dietTypeBadge').className = 'badge ' + (isVeg ? 'green' : 'amber');
 renderHealthAdvice();
 updateStreak();
 renderCalorieLog();
 renderQuickFoods();
 renderHistory();

 // Restore notification toggle
 if (localStorage.getItem('gf_notifEnabled') === '1') {
 document.getElementById('notifToggle').classList.add('on');
 scheduleWaterReminders();
 }

 initFirebase();
}

document.addEventListener('DOMContentLoaded', init);
