// frontend에 backend랑 연결해달라고 요청
// socket : 서버로의 연결을 뜻한다. connection to server
const FrontSocket = new WebSocket(`ws://${window.location.host}`);

FrontSocket.addEventListener("open", () => {
  console.log("connected from Front");
});
FrontSocket.addEventListener("message", (message) => {
  console.log("New message : ", message.data);
});

FrontSocket.addEventListener("close", () => {
  console.log("Disconnected from server X");
});

setTimeout(() => {
  FrontSocket.send("hello Server!  I am the browser!");
}, 5000);
