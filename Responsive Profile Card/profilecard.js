// Cache DOM elements
const darkModeBtn = document.getElementById("dark-mode-btn");
const darkModeIcon = document.getElementById("dark-mode");
const messageBtn = document.getElementById("message");
const body = document.body;

// Utility: toggle dark mode
function toggleDarkMode() {
  body.classList.toggle("dark-mode-change");
  updateDarkModeIcons();
}

// Utility: update icons based on mode
function updateDarkModeIcons() {
  const isDark = body.classList.contains("dark-mode-change");
  const icon = isDark ? "bi bi-moon-stars" : "bi bi-brightness-high-fill";
  const color = isDark ? "white" : "yellow";

  [darkModeBtn, darkModeIcon].forEach(el => {
    el.innerHTML = `<i class="${icon}"></i>`;
    el.style.color = color;
    el.style.background = "none";
    el.style.fontSize = "2rem";
  });
}

// Event listeners for dark mode toggle
darkModeBtn.addEventListener("click", toggleDarkMode);
darkModeIcon.addEventListener("click", toggleDarkMode);

// Utility: create element with class and text
function createElement(tag, className, textContent = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

// Message modal logic
messageBtn.addEventListener("click", () => {
  const background = createElement("div", "background-dark-gray");
  const container = createElement("div", "message-container");

  const heading = createElement("h2", "heading", "Message Me");
  const textarea = createElement("textarea", "message");
  textarea.rows = 3;

  const submit = createElement("button", "send", "Send");
  submit.type = "button";

  const exitBtn = createElement("button", "exit", "❌");

  // Submit handler
  submit.addEventListener("click", () => {
    const indicator = createElement("div", "message-indicator");
    indicator.textContent = textarea.value
      ? "Your message has been sent!"
      : "Your message failed to send!";

    container.style.display = "none";
    setTimeout(() => {
      indicator.style.display = "none";
      background.style.display = "none";
    }, 2000);

    document.body.appendChild(indicator);
  });

  // Exit handler
  exitBtn.addEventListener("click", () => {
    container.style.display = "none";
    background.style.display = "none";
  });

  container.append(heading, textarea, submit, exitBtn);
  document.body.append(container, background);
});
