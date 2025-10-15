const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const minimizeBtn = document.getElementById("minimizeBtn");
const chatWidget = document.getElementById("chatWidget");

// FAQ dictionary
const faqs = {
  "hello": "Hi there! 👋 How can I help you today?",
  "how are you": "I’m just a bot, but I’m doing great! 😄",
  "what is your name": "I’m your friendly FAQ chatbot 🤖",
  "how to contact support": "You can contact support via email at support@example.com 📧",
  "what is gssoc": "GSSoC stands for GirlScript Summer of Code 🌸 — a 3-month open-source program.",
  "bye": "Goodbye! 👋 Have a great day!"
};

// Add message to chat
function addMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Get bot response
function getBotResponse(input) {
  input = input.toLowerCase();
  return faqs[input] || "Sorry, I’m not sure about that. Try asking something else! 🤔";
}

// Send button click
sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (!message) return;
  addMessage(message, "user");
  setTimeout(() => {
    addMessage(getBotResponse(message), "bot");
  }, 500);
  userInput.value = "";
});

// Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// Minimize/Expand toggle
let minimized = false;
minimizeBtn.addEventListener("click", () => {
  minimized = !minimized;
  if (minimized) {
    chatWidget.style.height = "50px";
    chatWidget.querySelector(".chat-body").style.display = "none";
    minimizeBtn.textContent = "+";
  } else {
    chatWidget.style.height = "550px";
    chatWidget.querySelector(".chat-body").style.display = "flex";
    minimizeBtn.textContent = "−";
  }
});

// Example buttons
document.querySelectorAll(".example-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    userInput.value = btn.textContent;
    sendBtn.click();
  });
});
