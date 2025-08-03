document.addEventListener('DOMContentLoaded', function() {
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const bedTimeInput = document.getElementById('bedTime');
    const medicationCountInput = document.getElementById('medicationCount');
    const calculateButton = document.getElementById('calculateButton');
    const medicationTimesList = document.getElementById('medicationTimes');

    calculateButton.addEventListener('click', function() {
        const wakeUpTime = wakeUpTimeInput.value;
        const bedTime = bedTimeInput.value;
        const medicationCount = parseInt(medicationCountInput.value);

        const medicationTimes = calculateMedicationTimes(wakeUpTime, bedTime, medicationCount);
        displayMedicationTimes(medicationTimes);
    });

    function calculateMedicationTimes(wakeUpTime, bedTime, medicationCount) {
        const wakeUp = new Date(`1970-01-01T${wakeUpTime}:00`);
        const bedTimeAdjusted = new Date(`1970-01-01T${bedTime}:00`);

        // Adjust bedTime to next day if it's earlier than wakeUpTime
        if (bedTimeAdjusted <= wakeUp) {
            bedTimeAdjusted.setDate(bedTimeAdjusted.getDate() + 1);
        }

        const totalTimeAvailable = bedTimeAdjusted.getTime() - wakeUp.getTime();
        const interval = totalTimeAvailable / (medicationCount + 1); // +1 to space out the doses

        const medicationTimes = [];
        for (let i = 1; i <= medicationCount; i++) {
            const medicationTime = new Date(wakeUp.getTime() + interval * i);
            medicationTimes.push(formatTime(medicationTime));
        }

        return medicationTimes;
    }

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    function displayMedicationTimes(times) {
        medicationTimesList.innerHTML = ''; // Clear previous times
        times.forEach(time => {
            const listItem = document.createElement('li');
            listItem.textContent = time;
            medicationTimesList.appendChild(listItem);
        });
    }
});document.addEventListener('DOMContentLoaded', function() {
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const bedTimeInput = document.getElementById('bedTime');
    const medicationCountInput = document.getElementById('medicationCount');
    const calculateButton = document.getElementById('calculateButton');
    const medicationTimesList = document.getElementById('medicationTimes');

    function calculateAndDisplay() {
        const wakeUpTime = wakeUpTimeInput.value;
        const bedTime = bedTimeInput.value;
        const medicationCount = parseInt(medicationCountInput.value);

        const medicationTimes = calculateMedicationTimes(wakeUpTime, bedTime, medicationCount);
        displayMedicationTimes(medicationTimes);
    }

    calculateButton.addEventListener('click', calculateAndDisplay);

    medicationCountInput.addEventListener('keydown', function(event) { // Changed to keydown
        if (event.key === 'Enter') {
            calculateAndDisplay();
            event.preventDefault(); // Prevent form submission
        }
    });

    function calculateMedicationTimes(wakeUpTime, bedTime, medicationCount) {
        const wakeUp = new Date(`1970-01-01T${wakeUpTime}:00`);
        const bedTimeAdjusted = new Date(`1970-01-01T${bedTime}:00`);

        // Adjust bedTime to next day if it's earlier than wakeUpTime
        if (bedTimeAdjusted <= wakeUp) {
            bedTimeAdjusted.setDate(bedTimeAdjusted.getDate() + 1);
        }

        const totalTimeAvailable = bedTimeAdjusted.getTime() - wakeUp.getTime();
        const interval = totalTimeAvailable / (medicationCount + 1); // +1 to space out the doses

        const medicationTimes = [];
        for (let i = 1; i <= medicationCount; i++) {
            const medicationTime = new Date(wakeUp.getTime() + interval * i);
            medicationTimes.push(formatTime(medicationTime));
        }

        return medicationTimes;
    }

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    function displayMedicationTimes(times) {
        medicationTimesList.innerHTML = ''; // Clear previous times
        times.forEach(time => {
            const listItem = document.createElement('li');
            listItem.textContent = time;
            medicationTimesList.appendChild(listItem);
        });
    }
});document.addEventListener('DOMContentLoaded', function() {
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const bedTimeInput = document.getElementById('bedTime');
    const medicationCountInput = document.getElementById('medicationCount');
    const calculateButton = document.getElementById('calculateButton');
    const medicationTimesList = document.getElementById('medicationTimes');

    function calculateAndDisplay() {
        const wakeUpTime = wakeUpTimeInput.value;
        const bedTime = bedTimeInput.value;
        const medicationCount = parseInt(medicationCountInput.value);

        const medicationTimes = calculateMedicationTimes(wakeUpTime, bedTime, medicationCount);
        displayMedicationTimes(medicationTimes);
    }

    calculateButton.addEventListener('click', calculateAndDisplay);

    medicationCountInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculateAndDisplay();
            event.preventDefault();
        }
    });

    function calculateMedicationTimes(wakeUpTime, bedTime, medicationCount) {
        const wakeUp = new Date(`1970-01-01T${wakeUpTime}:00`);
        const bedTimeAdjusted = new Date(`1970-01-01T${bedTime}:00`);

        if (bedTimeAdjusted <= wakeUp) {
            bedTimeAdjusted.setDate(bedTimeAdjusted.getDate() + 1);
        }

        const totalTimeAvailable = bedTimeAdjusted.getTime() - wakeUp.getTime();
        const interval = totalTimeAvailable / (medicationCount + 1);

        const medicationTimes = [];
        for (let i = 1; i <= medicationCount; i++) {
            let medicationTime = new Date(wakeUp.getTime() + interval * i);
            medicationTime = adjustToMealTime(medicationTime); // Adjust to after meal
            medicationTime = roundToNearestHalfHour(medicationTime); // Round to nearest half hour
            medicationTimes.push(formatTime(medicationTime));
        }

        return medicationTimes;
    }

    function adjustToMealTime(time) {
        // Define typical meal times (you can customize these)
        const breakfastTime = new Date(time);
        breakfastTime.setHours(8, 30, 0); // 8:30 AM
        const lunchTime = new Date(time);
        lunchTime.setHours(12, 30, 0); // 12:30 PM
        const dinnerTime = new Date(time);
        dinnerTime.setHours(18, 30, 0); // 6:30 PM

        let adjustedTime = new Date(time);

        if (time <= breakfastTime) {
            adjustedTime = new Date(breakfastTime.getTime() + 30 * 60000); // 30 minutes after breakfast
        } else if (time <= lunchTime) {
            adjustedTime = new Date(lunchTime.getTime() + 30 * 60000); // 30 minutes after lunch
        } else if (time <= dinnerTime) {
            adjustedTime = new Date(dinnerTime.getTime() + 30 * 60000); // 30 minutes after dinner
        } else {
            // If after dinner, use time + 30 minutes
            adjustedTime = new Date(time.getTime() + 30 * 60000);
        }

        return adjustedTime;
    }

    function roundToNearestHalfHour(time) {
        const minutes = time.getMinutes();
        const roundedMinutes = Math.round(minutes / 30) * 30; // Round to 0 or 30

        time.setMinutes(roundedMinutes);
        time.setSeconds(0); // Reset seconds for cleaner display

        return time;
    }

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    function displayMedicationTimes(times) {
        medicationTimesList.innerHTML = '';
        times.forEach(time => {
            const listItem = document.createElement('li');
            listItem.textContent = time;
            medicationTimesList.appendChild(listItem);
        });
    }
});document.addEventListener('DOMContentLoaded', function() {
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const bedTimeInput = document.getElementById('bedTime');
    const medicationCountInput = document.getElementById('medicationCount');
    const calculateButton = document.getElementById('calculateButton');
    const medicationTimesList = document.getElementById('medicationTimes');

    function calculateAndDisplay() {
        const wakeUpTime = wakeUpTimeInput.value;
        const bedTime = bedTimeInput.value;
        const medicationCount = parseInt(medicationCountInput.value);

        const medicationTimes = calculateMedicationTimes(wakeUpTime, bedTime, medicationCount);
        displayMedicationTimes(medicationTimes);
    }

    calculateButton.addEventListener('click', calculateAndDisplay);

    medicationCountInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculateAndDisplay();
            event.preventDefault();
        }
    });

    function calculateMedicationTimes(wakeUpTime, bedTime, medicationCount) {
        const wakeUp = new Date(`1970-01-01T${wakeUpTime}:00`);
        const bedTimeAdjusted = new Date(`1970-01-01T${bedTime}:00`);

        if (bedTimeAdjusted <= wakeUp) {
            bedTimeAdjusted.setDate(bedTimeAdjusted.getDate() + 1);
        }

        const totalTimeAvailable = bedTimeAdjusted.getTime() - wakeUp.getTime();
        const interval = totalTimeAvailable / (medicationCount + 1);

        const medicationTimes = [];
        let previousTime = new Date(wakeUp.getTime()); // Initialize with wakeUp time
        for (let i = 1; i <= medicationCount; i++) {
            let medicationTime = new Date(wakeUp.getTime() + interval * i);
            medicationTime = adjustToMealTime(medicationTime, previousTime); // Pass previous time
            medicationTime = roundToNearestHalfHour(medicationTime);
            medicationTimes.push(formatTime(medicationTime));
            previousTime = new Date(medicationTime.getTime()); // Update previousTime for next iteration
        }

        return medicationTimes;
    }

    function adjustToMealTime(time, previousTime) {
        // Define typical meal times
        const breakfastTime = new Date(time.getTime());
        breakfastTime.setHours(8, 30, 0);
        const lunchTime = new Date(time.getTime());
        lunchTime.setHours(12, 30, 0);
        const dinnerTime = new Date(time.getTime());
        dinnerTime.setHours(18, 30, 0);

        let adjustedTime = new Date(time);

        if (time <= breakfastTime && previousTime <= breakfastTime) {
            adjustedTime = new Date(breakfastTime.getTime() + 30 * 60000);
        } else if (time <= lunchTime && previousTime <= lunchTime) {
            adjustedTime = new Date(lunchTime.getTime() + 30 * 60000);
        } else if (time <= dinnerTime && previousTime <= dinnerTime) {
            adjustedTime = new Date(dinnerTime.getTime() + 30 * 60000);
        } else {
            // If after dinner, use time + 30 minutes
            adjustedTime = new Date(time.getTime() + 30 * 60000);
        }

  return adjustedTime;
    }

    function roundToNearestHalfHour(time) {
        const minutes = time.getMinutes();
        const roundedMinutes = Math.round(minutes / 30) * 30;

        time.setMinutes(roundedMinutes);
        time.setSeconds(0);

        return time;
    }

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    function displayMedicationTimes(times) {
        medicationTimesList.innerHTML = '';
        times.forEach(time => {
            const listItem = document.createElement('li');
            listItem.textContent = time;
            medicationTimesList.appendChild(listItem);
        });
    }
});