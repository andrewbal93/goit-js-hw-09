import flatpickr from "flatpickr";
require("flatpickr/dist/themes/dark.css");
// import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]')
const resetBtn = document.querySelector('button[data-reset]')
const daysSpan = document.querySelector('.value[data-days]');
const hoursSpan = document.querySelector('.value[data-hours]');
const minutesSpan = document.querySelector('.value[data-minutes]');
const secondsSpan = document.querySelector('.value[data-seconds]');
let countDownInterval;

startBtn.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function renewSpans(countData) {
    daysSpan.textContent = addZero(countData.days);
    hoursSpan.textContent = addZero(countData.hours);
    minutesSpan.textContent = addZero(countData.minutes);
    secondsSpan.textContent = addZero(countData.seconds);
}
function addZero(count) {
    if (count < 10) {
        return `0${count}`
    }
    else {return count}
}

const fp = flatpickr('#datetime-picker', {
    // minDate: "today",
    dateFormat: "d.m.Y",
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= new Date().getTime()) {
            window.alert("Please, choose date in future.");
            selectedDates[0] = new Date();
        } else {
            startBtn.disabled = false
            console.log(selectedDates[0]);
        };

        startBtn.addEventListener('click', () => {
            countDownInterval = setInterval(() => {
                const msCount = selectedDates[0].getTime() - new Date().getTime();
                const countDown = convertMs(msCount)
                startBtn.disabled = true;
                // console.log(countDown);
                if (msCount > 0) renewSpans(countDown);
                else alert();
            }, 1000)    
        });

        resetBtn.addEventListener('click', () => {
            startBtn.disabled = true;
            clearInterval(countDownInterval);
            renewSpans({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            selectedDates[0] = new Date();
            fp.setDate(new Date())
        });
    },

    "locale": {
        "firstDayOfWeek": 1 // start week on Monday
    }
});

