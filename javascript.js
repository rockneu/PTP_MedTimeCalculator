document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    
    calculateBtn.addEventListener('click', calculateTimes);
    
    function showLoading() {
    const timesDiv = document.getElementById('times');
    timesDiv.innerHTML = '<div class="loading">⏳ Calculating optimal medication schedule...</div>';
}

function showResults(times) {
    const timesDiv = document.getElementById('times');
    const timeItems = times.map((time, index) => 
        `<li class="time-item" style="animation-delay: ${index * 0.1}s">${time}</li>`
    ).join('');
    
    timesDiv.innerHTML = `
        <div class="results-header">
            <span>💡 Based on your schedule, recommended medication times:</span>
        </div>
        <ul class="time-list">
            ${timeItems}
        </ul>
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
                const delta = 60;

                if (doses === 1) {
                    times.push(addMinutes(wakeUp, delta));
                } else {
                    const firstDoseTime = addMinutes(wakeUp, delta);
                    const lastDoseTime = addMinutes(bed, -delta);
                    
                    if (lastDoseTime - firstDoseTime < 30 * (doses - 1)) {
                        showError('Too many doses for this schedule. Reduce doses or adjust times');
                        return;
                    }
                    
                    if (doses === 2) {
                        times.push(firstDoseTime, lastDoseTime);
                    } else {
                        const interval = (lastDoseTime - firstDoseTime) / (doses - 1);
                        for (let i = 0; i < doses; i++) {
                            times.push(addMinutes(firstDoseTime, Math.round(i * interval)));
                        }
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