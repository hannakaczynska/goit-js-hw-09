import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

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
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      const onClick = () => {
        startButton.disabled = true;
        updateClock(selectedDates[0]);
      };
      startButton.addEventListener('click', onClick);
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

function setClock({ days, hours, minutes, seconds }) {
  dataDays.innerText = addLeadingZero(days);
  dataHours.innerText = addLeadingZero(hours);
  dataMinutes.innerText = addLeadingZero(minutes);
  dataSeconds.innerText = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClock(dateYouPicked) {
  setInterval(() => {
    let msTime = dateYouPicked.getTime() - Date.now();
    if (msTime > 0) {
      let timerValue = convertMs(msTime);
      setClock(timerValue);
    } else {
      clearInterval(updateClock);
      const stopTimer = convertMs(0);
      setClock(stopTimer);
    }
  }, 1000);
}

// stylowanie
const timer = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');

timer.style.display = 'flex';
timer.style.gap = '10px';
timer.style.maxWidth = '200px';

timerField.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
});

values.forEach(value => {
  value.style.fontSize = '50px';
});
