import express from "express";
import { config } from "dotenv";
import { Message } from "./message.js";

config();

const app = express();
const PORT = process.env.PORT;

const options = {
    secret:    process.env.SECRET,
    agentid:   process.env.AGENTID,
    token:     process.env.TOKEN,
    corpid:    process.env.CORPID,
    aeskey:    process.env.AESKEY
}


const message = new Message(options,"touser");
message.log();
//var wxcpt = new WorkWechat(config);

// 接收消息服务器配置
app.get('/message', function (req, res, next) {
    console.log("abbbbbbbbbbbbbb");
    message.connectServer(req, res);
});

// 被动回复消息
app.post('/message', function (req, res, next) {
    message.reply(res, {
    type: 'text',
    content: 'hello!'
  });
});

// 获取access_token
message.updateToken();

// 主动推送消息
message.sendMsg('what is up !');


app.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});