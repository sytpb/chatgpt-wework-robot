import express from "express";
import { config } from "dotenv";
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';

import getAIChat from "./openai.js";
import { Message } from "./message.js";
import { initAccessToken } from "./config.js";

config();
bodyParserXml(bodyParser);

const app = express();
const PORT = process.env.PORT;
const message = new Message();

/*message.log();*/

/*config parser for body*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.xml());

/*health check for render*/
app.get('/healthz', function (req, res, next) {
    res.status(200).end();
});

/*receive server url setting*/
app.get('/message', function (req, res, next) {
    message.urlSetting(req, res);
});

/*passive message response*/
app.post('/message', function (req, res, next) {

    message.getMsgObj(req).then(result => {
        const question = result.Content[0];
        //const question = "what's the day today?";
        console.log(question);
        const toUser = result.FromUserName[0];
        message.reply(res, { type: 'text', content: '正在生成回答' }, toUser);

        getAIChat(question).then(result => {
            const answer = result?.data?.choices[0]?.message?.content;
            /*decodeURIComponent(answer);*/
            console.log(answer);
            message.sendMsg(answer, toUser);
        })
    })

});

/*init access_token*/
initAccessToken();

app.listen(PORT, () => {
    console.log(`Server Running on Port:${PORT}`);
});