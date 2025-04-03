const chatbox = document.getElementById("chatbox");
const sendButton = document.getElementById("send-btn");
const chatLog = document.getElementById("chat-log");

sendButton.addEventListener("click", async () => {
  const userInput = chatbox.value;
  appendMessage("Você", userInput);
  chatbox.value = "";

  const response = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userInput
    })
  });

  const data = await response.json();
  appendMessage("Lya", data.reply);
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}
