document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    
    calculateBtn.addEventListener('click', calculateTimes);
    
    function calculateTimes() {
        const wakeUpTime = document.getElementById('wake-up').value;
        const bedtime = document.getElementById('bedtime').value;
        const doses = parseInt(document.getElementById('doses-select').value);
        
        if (!wakeUpTime || !bedtime) {
            alert('Please enter both wake-up time and bedtime');
            return;
        }
        
        const wakeUp = parseTime(wakeUpTime);
        const bed = parseTime(bedtime);
        
        if (wakeUp >= bed) {
            alert('Wake-up time must be before bedtime');
            return;
        }
        
        const totalMinutes = bed - wakeUp;
        const timesContainer = document.getElementById('times');
        timesContainer.innerHTML = '';
        
        let times = [];
        
        if (doses === 1) {
            // After breakfast (1 hour after wake-up)
            times.push(addMinutes(wakeUp, 60));
        } else {
            // For 2+ doses, distribute evenly
            const interval = totalMinutes / (doses - 1);
            for (let i = 0; i < doses; i++) {
                times.push(addMinutes(wakeUp, Math.floor(i * interval)));
            }
        }
        
        // Round times to nearest half hour
        times = times.map(time => roundToNearestHalfHour(time));
        
        // Display results
        times.forEach((time, index) => {
            const timeElement = document.createElement('div');
            timeElement.className = 'time-slot';
            timeElement.textContent = `Dose ${index + 1}: ${formatTime(time)}`;
            timesContainer.appendChild(timeElement);
        });
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
});