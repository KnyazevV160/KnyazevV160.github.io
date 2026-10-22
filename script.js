const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

const noButton = document.getElementById("no-button");
const errorMessage = document.getElementById("error-message");
noButton.addEventListener("click", () => {
  errorMessage.hidden = false;
  // Небольшая пауза перед возвратом к тому же вопросу, чтобы сообщение успели заметить.
  window.setTimeout(() => {
    errorMessage.hidden = true;
    showScreen("love");
  }, 1100);
});

const katyaButton = document.getElementById("katya-button");
const choiceArea = document.querySelector(".choice-area");
const tinyHint = document.getElementById("tiny-hint");
let escapes = 0;

katyaButton.addEventListener("click", () => {
  escapes += 1;
  const area = choiceArea.getBoundingClientRect();
  const button = katyaButton.getBoundingClientRect();
  const maxX = Math.max(0, area.width - button.width);
  const maxY = Math.max(0, Math.min(95, area.height - button.height));

  // Каждый клик действительно регистрируется, после чего кнопка переезжает.
  katyaButton.style.position = "relative";
  katyaButton.style.left = `${Math.round(Math.random() * maxX - maxX / 2)}px`;
  katyaButton.style.top = `${Math.round(Math.random() * maxY - maxY / 2)}px`;
  katyaButton.style.transform = `rotate(${Math.round(Math.random() * 12 - 6)}deg)`;

  const messages = [
    "Хи-хи, не поймала 😇",
    "Попробуй ещё раз, принцесса 💗",
    "Я же говорила, что убегаю 🙈",
    "Ну ладно, ещё попытка! ♡"
  ];
  tinyHint.textContent = messages[(escapes - 1) % messages.length];
});
