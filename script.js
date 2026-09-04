// 10-Stage Progression System
function nextStage(currentStage, targetStage) {
    // Hide active stage
    const activeStage = document.getElementById(`stage${currentStage}`);
    if (activeStage) {
        activeStage.classList.remove('active');
    }

    // Show target stage
    const nextStageEl = document.getElementById(`stage${targetStage}`);
    if (nextStageEl) {
        nextStageEl.classList.add('active');
    }

    // Update Progress Bar (1 to 10 Stages)
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const percentage = (targetStage / 10) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    // Trigger Confetti Celebration on Stage 9 & 10
    if (targetStage === 9 || targetStage === 10) {
        triggerConfetti();
    }
}

// Stage 4: Map Compass Calibrator (100% Sync)
function handleSlider(val) {
    const sliderValDisplay = document.getElementById('sliderVal');
    const stage4Btn = document.getElementById('stage4Btn');

    if (sliderValDisplay) {
        sliderValDisplay.innerText = `${val}%`;
    }

    if (parseInt(val) === 100) {
        if (stage4Btn) stage4Btn.classList.remove('locked');
        if (sliderValDisplay) sliderValDisplay.innerText = `100% 🧭 MAP FULLY SYNCED!`;
    } else {
        if (stage4Btn) stage4Btn.classList.add('locked');
    }
}

// Stage 5: Dodgy NO Button & 3-Attempt Secret Override Hack
let noAttempts = 0;
const historyHints = [
    "Opposing territory detected! Try YES! 😉",
    "Royal Law: NO button moves away instantly! 😜",
    "By Royal Decree, option redirects to YES! 😂"
];

function dodgeNoBtn() {
    const noBtn = document.getElementById('noBtn');
    const dodgyHint = document.getElementById('dodgyHint');

    noAttempts++;

    // 3 attempts ke baad auto override logic
    if (noAttempts >= 3) {
        if (dodgyHint) {
            dodgyHint.innerHTML = "<b>Nice try Tajpreet Ma'am!</b><br>Par History rule kehta hai aap 'NO' choose hi nahi kar sakti! Auto-switching to YES! ✨";
        }
        if (noBtn) noBtn.style.display = 'none';

        setTimeout(() => {
            nextStage(5, 6);
        }, 4500);
        return;
    }

    // Random dodge coordinates
    const x = (Math.random() * 140) - 70;
    const y = (Math.random() * 80) - 40;

    if (noBtn) {
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }
    if (dodgyHint) {
        dodgyHint.innerText = historyHints[noAttempts - 1];
    }
}

// Stage 6: Quiz Option Handling
function wrongQuizChoice(btn) {
    const quizError = document.getElementById('quizError');
    if (quizError) {
        quizError.innerText = "Wrong era! Real empire and magical influence Tajpreet Ma'am ki SST class me hai! 😉";
    }
    if (btn) {
        btn.style.opacity = '0.4';
        btn.style.pointerEvents = 'none';
    }
}

// Confetti Celebration Engine
function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
        // Center Royal Gold Burst
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#c59b27', '#e2b742', '#8b261d', '#ffffff']
        });

        // Left Burst
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.7 },
                colors: ['#c59b27', '#e2b742', '#8b261d']
            });
        }, 250);

        // Right Burst
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.7 },
                colors: ['#c59b27', '#8b261d', '#ffffff']
            });
        }, 450);
    }
}

// Reset Entire Manuscript Journey
function restartExperience() {
    noAttempts = 0;
    const noBtn = document.getElementById('noBtn');
    const dodgyHint = document.getElementById('dodgyHint');
    const quizError = document.getElementById('quizError');

    if (noBtn) {
        noBtn.style.display = 'inline-flex';
        noBtn.style.transform = 'translate(0, 0)';
    }
    if (dodgyHint) dodgyHint.innerText = '';
    if (quizError) quizError.innerText = '';

    const slider = document.getElementById('energyRange');
    if (slider) {
        slider.value = 50;
        handleSlider(50);
    }

    nextStage(10, 1);
}
