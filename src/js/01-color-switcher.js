const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let colorInterval;

stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
    colorInterval = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000)
    startBtn.disabled = true;
    stopBtn.disabled = false;
})

stopBtn.addEventListener('click', () => {
    clearInterval(colorInterval);
    stopBtn.disabled = true;
    startBtn.disabled = false;
})
