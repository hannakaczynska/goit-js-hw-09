import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');

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
    if (selectedDates[0] > Date.now()) {
      startButton.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

// function onClick() {
//   refs.startBtn.setAttribute('disabled', true);

//   const timer = setInterval(() => {
//     const selectedDate = setFlatpickr.selectedDates[0].getTime() - Date.now();

//     if (selectedDate > 0) {
//       renderTimer(convertMs(selectedDate));
//       refs.seconds.classList.add('zero');
//     } else {
//       clearInterval(timer);
//       refs.timePicker.removeAttribute('disabled');
//       refs.seconds.classList.remove('zero');
//       window.alert('Time is up!');
//     }
//   }, 1000);
// }
