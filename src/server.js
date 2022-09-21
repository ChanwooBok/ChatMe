import express from "express";
// SyntaxError: Cannot use import statement outside a module 에러발생
// 해결법 : package.json상단에 type:"module"적어주기.
// This will ensure that all .js and .mjs files are interpreted as ES modules
// 노드js의 기본모듈은 Common JS

const app = express(); // create a new server
console.log("test");
app.listen(3000); // port number
