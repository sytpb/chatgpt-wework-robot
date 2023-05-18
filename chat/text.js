"use strict"

import Chat from "./chat.js";
import Session from "./session.js";
import debug from "../comm/debug.js";
import Parser from "../comm/message.js";
import { OpenAI } from "../service/openai.js";
import { XMLUserMsg, MDUserMsg } from "./templates.js";

export default class TextChat extends Chat{
  
    constructor(name) {
        super(name);
    }

    timestamp(delay = 0) {
        delay = Number(delay);
        return parseInt(new Date().valueOf() / 1000) + delay * 1000;
    }

    ack(info, message, res) {

        const toUser = info?.FromUserName[0];
        const msg = XMLUserMsg(toUser, process.env.CORPID, this.timestamp(), message);
        const parser = new Parser();
        const encrypt = parser.encryptMsg(msg);

        res.set({
            'Content-Type': 'application/xml',
        });
        res.send(encrypt);
    }

    reply(info, content, res) {

        const toUser = info?.FromUserName[0];
        const msg = MDUserMsg(toUser, process.env.AGENTID, content);
        const parser = new Parser();
        const encrypt = parser.encryptMsg(msg);

        res.set({
            'Content-Type': 'application/xml',
        });
        res.send(encrypt);
    }

    process(xml, res) {

        debug.out("text chat...", xml);
        const info = xml;

        const id = info?.FromUserName[0];
        const toUser = info?.FromUserName[0];
        const question = info?.Content[0];

        this.ack(info, { type: 'text', content: '正在生成回答' }, toUser);

        const openai = new OpenAI();
        const context = Session.update(id, {"role":"user" ,"content":question});
        
        openai.ctChat(context).then(result => {
            const message = result?.data?.choices[0]?.message;
            debug.log(message?.content);
            if (!message?.content)
                return;

            const content = message.content;
            this.reply(info, content, res);
            Session.update(id, message);
        });
    }

}