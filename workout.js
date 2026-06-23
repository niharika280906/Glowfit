/* workout.js — Workout data and render functions */

const workouts = [
 { name: "Jumping jacks", sets: "3 × 30 reps", cat: "fat", dur: "8 min", kcal: "80", icon: "ti-arrow-up" },
 { name: "Bodyweight squats", sets: "3 × 20 reps", cat: "strength", dur: "6 min", kcal: "60", icon: "ti-arrow-down" },
 { name: "Push-ups", sets: "3 × 15 reps", cat: "strength", dur: "5 min", kcal: "50", icon: "ti-wave-sine" },
 { name: "Mountain climbers", sets: "3 × 20 sec", cat: "fat", dur: "6 min", kcal: "70", icon: "ti-trending-up" },
 { name: "Plank hold", sets: "3 × 30 sec", cat: "strength", dur: "4 min", kcal: "30", icon: "ti-minus" },
 { name: "High knees", sets: "3 × 30 sec", cat: "cardio", dur: "5 min", kcal: "65", icon: "ti-chevrons-up" },
 { name: "Surya namaskar", sets: "5 rounds", cat: "yoga", dur: "15 min", kcal: "90", icon: "ti-sun" },
 { name: "Lunges", sets: "3 × 12 each leg", cat: "strength", dur: "8 min", kcal: "70", icon: "ti-chevron-right" },
 { name: "Burpees", sets: "3 × 10 reps", cat: "fat", dur: "6 min", kcal: "100", icon: "ti-refresh" },
 { name: "Skipping rope", sets: "3 × 2 min", cat: "cardio", dur: "8 min", kcal: "90", icon: "ti-wind" },
 { name: "Anulom vilom", sets: "10 min daily", cat: "yoga", dur: "10 min", kcal: "10", icon: "ti-air" },
 { name: "Glute bridges", sets: "3 × 20 reps", cat: "strength", dur: "5 min", kcal: "40", icon: "ti-circle" },
 { name: "Tricep dips", sets: "3 × 15 reps", cat: "strength", dur: "5 min", kcal: "45", icon: "ti-arrow-down-left" },
 { name: "Spot jogging", sets: "10 minutes", cat: "cardio", dur: "10 min", kcal: "80", icon: "ti-player-play" },
 { name: "Shavasana + breathing", sets: "5-10 min", cat: "yoga", dur: "10 min", kcal: "5", icon: "ti-moon" }
];

function renderWorkout(filter) {
 const list = filter === 'all' ? workouts : workouts.filter(w => w.cat === filter);
 document.getElementById('workoutList').innerHTML = list.map(w => `
 <div class="ex-card">
 <div class="ex-icon"><i class="ti ${w.icon}"></i></div>
 <div class="ex-info">
 <div class="ex-title">${w.name}</div>
 <div class="ex-sub">${w.sets}</div>
 <div class="ex-meta"><span>⏱ ${w.dur}</span><span> ${w.kcal} kcal</span></div>
 </div>
 </div>`).join('');
}

function filterWorkout(f, btn) {
 document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
 btn.classList.add('active');
 renderWorkout(f);
}

function startWorkoutTimer() {
 if (workoutRunning) {
 clearInterval(workoutInterval);
 workoutRunning = false;
 workoutSec = 0;
 document.querySelector('[onclick="startWorkoutTimer()"]').innerHTML = '<i class="ti ti-player-play"></i> Start timer';
 document.getElementById('workoutTimer').style.display = 'none';
 return;
 }
 workoutRunning = true;
 document.querySelector('[onclick="startWorkoutTimer()"]').innerHTML = '<i class="ti ti-player-pause"></i> Stop';
 document.getElementById('workoutTimer').style.display = 'inline';
 workoutInterval = setInterval(() => {
 workoutSec++;
 const m = String(Math.floor(workoutSec / 60)).padStart(2, '0');
 const s = String(workoutSec % 60).padStart(2, '0');
 document.getElementById('workoutTimer').textContent = m + ':' + s;
 }, 1000);
}
