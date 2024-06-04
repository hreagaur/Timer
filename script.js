const timerDisplay = document.getElementById('timer');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');

let workDuration = workDurationInput.value * 60; // in seconds
let breakDuration = breakDurationInput.value * 60; // in seconds
let timerInterval;
let isPaused = false;

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            if (duration === workDuration) {
                timerDisplay.textContent = "Break!";
                startTimer(breakDuration);
            } else {
                timerDisplay.textContent = "Work!";
                startTimer(workDuration);
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

function resumeTimer() {
    isPaused = false;
    startTimer(parseInt(timerDisplay.textContent.split(':')[0]) * 60 + parseInt(timerDisplay.textContent.split(':')[1]));
}

startButton.addEventListener('click', function() {
    if (!isPaused) {
        workDuration = workDurationInput.value * 60;
        breakDuration = breakDurationInput.value * 60;
    }
    startTimer(workDuration);
});

pauseButton.addEventListener('click', pauseTimer);
