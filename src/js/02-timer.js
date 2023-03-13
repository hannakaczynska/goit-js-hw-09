import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let actualDate = new Date();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: actualDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= actualDate) {
      startButton.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      const onClick = () => {
        startButton.disabled = true;
        const msTime = selectedDates[0].getTime() - actualDate.getTime();
        const startTimerValue = convertMs(msTime);
        setClock(startTimerValue);
      };
      startButton.addEventListener('click', onClick);
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

function setClock({ days, hours, minutes, seconds }) {
  dataDays.innerText = days;
  dataHours.innerText = hours;
  dataMinutes.innerText = minutes;
  dataSeconds.innerText = seconds;
}

function startClock() {
  let updateClock = setInterval(() => {
    for (let i = 0; i < msTime; i++) {
      if (countTime > 0) {
        let countTime = msTime - 1;
        const timerValue = convertMs(countTime);
        setClock(timerValue);
      } else if (countTime === 0) {
        break;
      }
    }
  }, 1000);
}
