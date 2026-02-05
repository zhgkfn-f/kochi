let timerId = null;

const startBtn = document.getElementById("startBtn");
const timeInput = document.getElementById("departureTime");
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");

startBtn.addEventListener("click", () => {
  const timeValue = timeInput.value;

  if (!timeValue) {
    alert("出発時間を入力してね！");
    return;
  }

  const [hour, minute] = timeValue.split(":").map(Number);

  const now = new Date();
  const departure = new Date();

  departure.setHours(hour);
  departure.setMinutes(minute);
  departure.setSeconds(0);

  if (departure <= now) {
    departure.setDate(departure.getDate() + 1);
  }

  if (timerId) clearInterval(timerId);

  timerId = setInterval(() => {
    const current = new Date();
    const diff = departure - current;

    if (diff <= 0) {
      clearInterval(timerId);
      countdownEl.textContent = "00:00:00";
      messageEl.textContent = "出発時間です！🚀";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    messageEl.textContent = "準備してる？";
  }, 1000);
});
