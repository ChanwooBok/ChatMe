const socket = io(); // backend socket.io와 Front를 연결해주는 Function
// 알아서 socket.io를 실행하고 있는 서버를 찾는다.

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

const backendDone = (msg) => {
  console.log(`The backend says : ${msg}`);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, () => {
    console.log("server is done! this will pop up in frontend !");
  }); // socket.emit으로 1. 내가 원하는 event를 첫번째 인자로 보낼 수 있음.
  // 2. object를 그대로 보낼 수 있음 (string변환 할 필요 없음)
  // 3. object뿐 아니라, string, int 등등 무제한으로 얼마든지 보낼 수 있음.
  // 4. 맨 마지막 인자로 callback function 보낼 수 있음,반드시 맨 마지막 인자로 보내야 함. : 함수 호출은 backend에서 되나, 코드는 frontend에서 실행됨.
  // + backend에서 인자도 보낼 수 있음.
};

form.addEventListener("submit", handleSubmit);
