const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let changeBodyColor;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', () => {
  changeBodyColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
});

buttonStop.addEventListener('click', e => {
  clearInterval(changeBodyColor);
  buttonStop.disabled = true;
  buttonStart.disabled = false;
});
