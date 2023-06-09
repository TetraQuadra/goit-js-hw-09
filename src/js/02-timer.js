import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const buttonStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;

buttonStart.addEventListener('click', () => {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  if (selectedDate < new Date()) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }
  buttonStart.disabled = true;
  startCountdown(selectedDate);
});

function startCountdown(selectedDate) {
  function updateCountdown() {
    const timeLeft = getTimeRemaining(selectedDate);
    daysValue.textContent = timeLeft.days;
    hoursValue.textContent = timeLeft.hours;
    minutesValue.textContent = timeLeft.minutes;
    secondsValue.textContent = timeLeft.seconds;
    if (timeLeft.total <= 1000) {
      clearInterval(countdownIntervalId);
      buttonStart.disabled = false;
      Notiflix.Notify.success('Ring-ring-ring-ring');
    }
  }

  updateCountdown();
  countdownIntervalId = setInterval(updateCountdown, 1000);
}

function getTimeRemaining(endDate) {
  const total = endDate.getTime() - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
