// frontend에 backend랑 연결해달라고 요청
// socket : 서버로의 연결을 뜻한다. connection to server
const FrontSocket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const makeMessage = (type, payload) => {
  const jobject = { type, payload };
  return JSON.stringify(jobject);
};

FrontSocket.addEventListener("open", () => {
  console.log("connected from Front");
});
FrontSocket.addEventListener("message", (message) => {
  console.log("New message : ", message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

FrontSocket.addEventListener("close", () => {
  console.log("Disconnected from server X");
});

setTimeout(() => {
  FrontSocket.send("hello Server!  I am the browser!");
}, 5000);

const handleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  FrontSocket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const handleNickSubmit = (e) => {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  FrontSocket.send(makeMessage("new_nickname", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);

nickForm.addEventListener("submit", handleNickSubmit);
