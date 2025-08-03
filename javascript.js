document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    
    calculateBtn.addEventListener('click', calculateTimes);
    
    function showLoading() {
    const timesDiv = document.getElementById('times');
    timesDiv.innerHTML = '<div class="loading">⏳ Calculating optimal medication schedule...</div>';
}

function showResults(times) {
    const timesDiv = document.getElementById('times');
    
    // Store times globally for editing
    window.currentTimes = times.map(time => parseTime(time.split(': ')[1]));
    
    const timeInputs = window.currentTimes.map((time, index) => {
        const formattedTime = formatTime(time);
        return `
            <div class="direct-edit-group">
                <label>Dose ${index + 1}</label>
                <input type="time" id="direct-time-${index}" value="${formattedTime}" class="direct-time-input" onchange="updateTime(${index})">
            </div>
        `;
    }).join('');
    
    timesDiv.innerHTML = `
        <div class="results-header">
            <span>💡 Based on your schedule, recommended medication times:</span>
            <small class="edit-hint">✏️ Click on any time to adjust</small>
        </div>
        <div class="direct-edit-container">
            ${timeInputs}
        </div>
        <div class="results-footer">
            <small>⚠️ Always follow medical advice. Consult your doctor if you have questions</small>
        </div>
    `;
}

function showError(message) {
    const timesDiv = document.getElementById('times');
    timesDiv.innerHTML = `
        <div class="error">
            <div class="error-icon">⚠️</div>
            <p>${message}</p>
        </div>
    `;
}
    
    function calculateTimes() {
        showLoading();
        
        setTimeout(() => {
            try {
                const wakeUpTime = document.getElementById('wake-up').value;
                const bedtime = document.getElementById('bedtime').value;
                const doses = parseInt(document.getElementById('doses-select').value);
                
                if (!wakeUpTime || !bedtime) {
                    showError('Please enter both wake-up and bedtime');
                    return;
                }
                
                const wakeUp = parseTime(wakeUpTime);
                const bed = parseTime(bedtime);
                
                if (wakeUp >= bed) {
                    showError('Wake-up time must be before bedtime');
                    return;
                }
                
                if ((bed - wakeUp) < 120) {
                    showError('Schedule interval too short. Please ensure adequate waking hours');
                    return;
                }
                
                let times = [];
                
                if (doses <= 3) {
                    // For 1-3 doses: schedule around meal times (30-60 min after meals)
                    const mealTimes = [];
                    
                    // Calculate typical meal times based on wake-up and bedtime
                    const breakfastTime = addMinutes(wakeUp, 60); // 1 hour after waking
                    const lunchTime = addMinutes(wakeUp, 300); // 5 hours after waking (around noon)
                    const dinnerTime = addMinutes(bed, -180); // 3 hours before bedtime
                    
                    mealTimes.push(breakfastTime, lunchTime, dinnerTime);
                    
                    // Filter meal times to ensure they're within waking hours
                    const validMealTimes = mealTimes.filter(time => 
                        time >= addMinutes(wakeUp, 30) && time <= addMinutes(bed, -30)
                    );
                    
                    if (doses === 1) {
                        // Single dose: prefer lunch time
                        // times.push(validMealTimes[1] || validMealTimes[0]);
                        // Single dose: prefer breakfast time
                        times.push(validMealTimes[0])
                    } else if (doses === 2) {
                        // Two doses: breakfast and dinner times
                        times.push(validMealTimes[0], validMealTimes[2] || validMealTimes[1]);
                    } else if (doses === 3) {
                        // Three doses: breakfast, lunch, dinner
                        times = validMealTimes.slice(0, 3);
                    }
                    
                    // Ensure all times are 30-60 minutes after meals
                    times = times.map(time => addMinutes(time, 45)); // 45 min after meals
                    
                } else {
                    // For 4+ doses: use original interval-based scheduling
                    const firstDoseTime = addMinutes(wakeUp, 30);
                    const lastDoseTime = addMinutes(bed, -30);
                    
                    if (lastDoseTime - firstDoseTime < 30 * (doses - 1)) {
                        showError('Too many doses for this schedule. Reduce doses or adjust times');
                        return;
                    }
                    
                    const interval = (lastDoseTime - firstDoseTime) / (doses - 1);
                    for (let i = 0; i < doses; i++) {
                        times.push(addMinutes(firstDoseTime, Math.round(i * interval)));
                    }
                }
                
                times = times.map(time => roundToNearestHalfHour(time));
                const formattedTimes = times.map((time, index) => `Dose ${index + 1}: ${formatTime(time)}`);
                showResults(formattedTimes);
                
            } catch (error) {
                showError('Calculation error. Please check your inputs');
            }
        }, 500);
    }
    
    function parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }
    
    function addMinutes(baseMinutes, minutesToAdd) {
        return baseMinutes + minutesToAdd;
    }
    
    function roundToNearestHalfHour(minutes) {
        const remainder = minutes % 30;
        return remainder < 15 ? minutes - remainder : minutes + (30 - remainder);
    }
    
    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60) % 24;
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
    
    function updateTime(index) {
        const newTime = document.getElementById(`direct-time-${index}`).value;
        if (newTime) {
            window.currentTimes[index] = parseTime(newTime);
            console.log(`Dose ${index + 1} updated to: ${newTime}`);
        }
    }
    
    // Add keyboard event listeners
    const inputs = document.querySelectorAll('input[type="time"], select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
    
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateTimes();
        }
    });
});