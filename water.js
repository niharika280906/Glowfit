/* water.js — Water tracker, steps tracker, hydration reminders */

const waterTimes = ["7:00 AM", "9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM", "9:00 PM"];

// Internal: convert "7:00 AM" → { h: 7, m: 0 }
function parseTime(str) {
 const [time, period] = str.split(' ');
 let [h, m] = time.split(':').map(Number);
 if (period === 'PM' && h !== 12) h += 12;
 if (period === 'AM' && h === 12) h = 0;
 return { h, m };
}

/* NOTIFICATION PERMISSION */
let notifPermission = 'default';

async function requestNotifPermission() {
 if (!('Notification' in window)) {
 showPermissionStatus(' Your browser does not support notifications.', 'red');
 return;
 }
 if (Notification.permission === 'granted') {
 notifPermission = 'granted';
 showPermissionStatus(' Notifications enabled! Reminders will ring at the times you turn on.', 'green');
 startReminderClock();
 return;
 }
 const result = await Notification.requestPermission();
 notifPermission = result;
 if (result === 'granted') {
 showPermissionStatus(' Notifications enabled! Reminders will ring at the times you turn on.', 'green');
 startReminderClock();
 // send a test notification immediately
 new Notification('💧 GlowFit Hydration', {
 body: 'Reminders are ON! You\'ll get notified at each water break you enable.',
 icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/droplet.svg'
 });
 } else if (result === 'denied') {
 showPermissionStatus(' Permission denied. Go to browser Settings → Notifications → Allow for this site.', 'red');
 } else {
 showPermissionStatus(' Permission dismissed. Tap "Enable" again to allow reminders.', 'amber');
 }
}

function showPermissionStatus(msg, color) {
 const el = document.getElementById('notifStatus');
 if (!el) return;
 const colors = { green: '#22c55e', red: '#f05252', amber: '#f5c842' };
 el.textContent = msg;
 el.style.color = colors[color] || 'var(--t2)';
 el.style.display = 'block';
}

/* REMINDER CLOCK */
// Runs every 30 seconds, fires a notification when the current time
// matches an enabled reminder (within a 30-second window).
let reminderClockInterval = null;
let firedToday = new Set(); // track which times already fired today

function startReminderClock() {
 if (reminderClockInterval) return; // already running
 reminderClockInterval = setInterval(checkReminders, 30000);
 checkReminders(); // run immediately on start
}

function checkReminders() {
 if (Notification.permission !== 'granted') return;

 const saved = JSON.parse(localStorage.getItem('gf_waterReminders') || '[]');
 const now = new Date();
 const nowH = now.getHours();
 const nowM = now.getMinutes();
 const todayKey = now.toDateString();

 // Reset fired set on a new day
 const lastFiredDay = localStorage.getItem('gf_reminderDay');
 if (lastFiredDay !== todayKey) {
 firedToday = new Set();
 localStorage.setItem('gf_reminderDay', todayKey);
 }

 waterTimes.forEach((timeStr, i) => {
 if (!saved[i]) return; // reminder not enabled
 if (firedToday.has(i)) return; // already fired today

 const { h, m } = parseTime(timeStr);

 // Fire if current time is within ±1 minute of reminder time
 const reminderMins = h * 60 + m;
 const nowMins = nowH * 60 + nowM;
 const diff = Math.abs(nowMins - reminderMins);

 if (diff <= 1) {
 firedToday.add(i);
 fireWaterNotification(timeStr, i);
 }
 });
}

function fireWaterNotification(timeStr, index) {
 const glassNum = index + 1;
 const remaining = 8 - waterGlasses;
 const messages = [
 `Good morning! Start your day with a glass of water `,
 `Time for glass #${glassNum}! ${remaining} glasses to go today `,
 `Halfway through your water goal! Keep it up `,
 `Afternoon hydration check — your skin will thank you `,
 `${remaining} glasses remaining. You\'ve got this! 💧`,
 `Evening water break — almost at your goal! `,
 `One more glass after this to hit 8! Almost there `,
 `Final reminder! Finish strong with your last glass tonight `,
 ];

 const body = messages[index] || `Time to drink water! (${timeStr})`;

 const notif = new Notification('💧 GlowFit — Drink Water!', {
 body,
 icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/droplet.svg',
 badge: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/droplet.svg',
 tag: 'glowfit-water-' + index, // replaces previous notification of same tag
 requireInteraction: false,
 silent: false // lets the OS play its default notification sound
 });

 // Auto-close after 8 seconds
 setTimeout(() => notif.close(), 8000);

 // Clicking the notification opens/focuses the app
 notif.onclick = () => {
 window.focus();
 showPage('water');
 notif.close();
 };
}

/* RENDER REMINDERS UI */
function renderWaterReminders() {
 const saved = JSON.parse(localStorage.getItem('gf_waterReminders') || '[]');
 const alreadyGranted = Notification.permission === 'granted';

 document.getElementById('waterReminders').innerHTML = `
 <div style="margin-bottom:.875rem">
 <button class="btn primary" style="width:100%;margin-bottom:.5rem" onclick="requestNotifPermission()">
 <i class="ti ti-bell"></i> ${alreadyGranted ? ' Notifications enabled' : 'Enable notifications'}
 </button>
 <div id="notifStatus" style="display:${alreadyGranted ? 'block' : 'none'};font-size:11px;color:#22c55e;text-align:center;padding:.25rem 0">
 ${alreadyGranted ? ' Notifications enabled! Reminders will ring at the times you turn on.' : ''}
 </div>
 </div>
 <div class="divider" style="margin:.5rem 0 .875rem"></div>
 ${waterTimes.map((t, i) => `
 <div class="habit-row">
 <div>
 <span style="font-size:13px;font-weight:500;color:var(--t1)">${t}</span>
 <div style="font-size:10px;color:var(--t3);margin-top:2px">Glass ${i + 1} of 8</div>
 </div>
 <button class="toggle ${saved[i] ? 'on' : ''}" id="wrem-${i}" onclick="toggleReminder(${i})" aria-label="reminder ${t}"></button>
 </div>`).join('')}
 <div style="margin-top:.875rem;padding:.6rem .9rem;background:rgba(77,124,244,.06);border:1px solid rgba(77,124,244,.15);border-radius:8px;font-size:11px;color:var(--t3);line-height:1.6">
 Notifications only work while the browser tab is open. For all-day reminders, keep GlowFit pinned in your browser.
 </div>
 `;

 // If already granted, start the clock right away
 if (alreadyGranted) {
 notifPermission = 'granted';
 startReminderClock();
 }
}

function toggleReminder(i) {
 const saved = JSON.parse(localStorage.getItem('gf_waterReminders') || '[]');
 saved[i] = !saved[i];
 localStorage.setItem('gf_waterReminders', JSON.stringify(saved));

 const btn = document.getElementById('wrem-' + i);
 if (btn) btn.classList.toggle('on', saved[i]);

 // If enabling a reminder but notifications not yet permitted, ask
 if (saved[i] && Notification.permission !== 'granted') {
 requestNotifPermission();
 }
}

/* WATER */
function renderWaterDrops() {
 const c = document.getElementById('waterDrops');
 c.innerHTML = '';
 for (let i = 0; i < 8; i++) {
 const d = document.createElement('span');
 d.className = 'water-drop ' + (i < waterGlasses ? 'filled' : 'empty');
 d.textContent = '💧';
 d.onclick = () => { waterGlasses = i + 1; updateWater(); saveData(); };
 c.appendChild(d);
 }
}

function addWater() { if (waterGlasses < 8) { waterGlasses++; updateWater(); saveData(); } }
function removeWater() { if (waterGlasses > 0) { waterGlasses--; updateWater(); saveData(); } }

function updateWater() {
 document.getElementById('waterCount').textContent = waterGlasses + ' / 8';
 document.getElementById('waterProgBar').style.width = (waterGlasses / 8 * 100) + '%';
 document.getElementById('statWater').textContent = waterGlasses + '/8';
 renderWaterDrops();
 if (waterGlasses >= 8) checkAndIncrementStreak();
}

/* STEPS */
function addSteps(n) {
 steps = Math.max(0, steps + n);
 updateSteps();
 saveData();
}

function updateSteps() {
 document.getElementById('stepsDisplay').textContent = steps.toLocaleString();
 document.getElementById('statSteps').textContent = steps.toLocaleString();
 const pct = Math.min(steps / 8000, 1);
 document.getElementById('stepsCircle').style.strokeDashoffset = Math.round(427 * (1 - pct));
 const kcal = Math.round(steps * 0.04);
 const dist = (steps * 0.0008).toFixed(1);
 document.getElementById('stepsCal').textContent = kcal + ' kcal';
 document.getElementById('stepsDist').textContent = dist + ' km';
}
