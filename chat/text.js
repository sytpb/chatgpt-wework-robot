"use strict"
import axios from "axios";
import Chat from "./chat.js";
import Session from "./session.js";
import debug from "../comm/debug.js";
import Parser from "../comm/message.js";
import { OpenAI } from "../service/openai.js";
import { getAccessToken } from "../comm/accesstoken.js";
import { XMLUserMsg, MDUserMsg, TextUserMsg } from "./templates.js";

const host = "https://qyapi.weixin.qq.com/cgi-bin";

export default class TextChat extends Chat{
  
    constructor(name) {
        super(name);
        
        this.censor = function(key,value) {
            if(typeof(value) == 'function'){
                return Function.prototype.toString.call(value)
            }   
            return value;
        };  
    }

    timestamp(delay = 0) {
        delay = Number(delay);
        return parseInt(new Date().valueOf() / 1000) + delay * 1000;
    }

    reply(info, message, res) {

        const toUser = info?.FromUserName[0];
        const msg = XMLUserMsg(toUser, process.env.CORPID, this.timestamp(), message);
        const parser = new Parser();
        const encrypt = parser.encryptMsg(msg);

        res.set({
            'Content-Type': 'application/xml',
        });
        res.end(encrypt);
    }

    async reponse(info, content, res) {

        const toUser = info?.FromUserName[0];

        const data = process.env.MSG_TYPE === "markdown" ? 
            MDUserMsg(toUser, process.env.AGENTID, content) : TextUserMsg(toUser,process.env.AGENTID, content)
        debug.log(data);

        const token = await getAccessToken();
        const url = host + '/message/send?access_token=' + token;
        /*const config = {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };*/

        axios.post(url, data).then((result) => {
            debug.log(result?.data);
        });
    }

    process(xml, res) {

        /*debug.out("text chat...", xml);*/
        const info = xml;

        const id = info?.FromUserName[0];
        const question = info?.Content[0];

        this.reply(info, '正在生成回答', res);

        const openai = new OpenAI();
        const context = Session.update(id, {"role":"user" ,"content":question});
        
        openai.ctChat(context).then(result => {
            const message = result?.data?.choices[0]?.message;
            debug.log(message?.content);
            if (!message?.content)
                return;

            const content = message.content;
            this.reponse(info, content, res);
            Session.update(id, message);
        });
    }

}