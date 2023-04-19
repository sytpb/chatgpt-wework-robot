import express from "express";
import { config } from "dotenv";
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';

import getAIChat from "./openai.js";
import { Message } from "./message.js";


config();
bodyParserXml(bodyParser);

const app = express();
const PORT = process.env.PORT;

const options = {
    secret:    process.env.SECRET,
    agentid:   process.env.AGENTID,
    token:     process.env.TOKEN,
    corpid:    process.env.CORPID,
    aeskey:    process.env.AESKEY
}


const message = new Message(options);

message.log();

/*config parser for body*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.xml());

/*receive server url setting*/
app.get('/message', function (req, res, next) {
    message.urlSetting(req, res);
});

/*被动回复消息*/
app.post('/message', function (req, res, next) {
    
    const msgObj = message.getMsgObj(req);
    //const question = msgObj.Content;
    const question = "what is day today?";
    message.reply(res, {type: 'text',content: '正在等待回答'}, msgObj.FromUserName);
    
    console.log("------" + question + "------");
    getAIChat(question).then(result => {
        const answer = result?.data?.choices[0]?.message?.content;
        console.log(answer);
        message.sendMsg(answer,msgObj.FromUserName);
    })

});

// 获取access_token
//message.updateToken();

// 主动推送消息
//message.sendMsg('what is up !','songyantao');


app.listen(PORT, () => {
    console.log(`Server Running on Port:${PORT}`);
});