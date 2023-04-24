"use strict"

import Chat from "./chat.js";
import debug from "../comm/debug.js";

/*to do more soon...*/
import Message from "../comm/message.js";
import getAIChat from "../service/openai.js"

export default class TextChat extends Chat{
  
    constructor(name) {
        super(name);
    }

    process(xml, res) {

        debug.log("text chat...", xml);
        const question = xml?.Content[0];
        const toUser = xml?.FromUserName[0];

        debug.log(question);
        const message = new Message();
        message.reply(res, { type: 'text', content: '正在生成回答' }, toUser);

        getAIChat(question).then(result => {
            const content = result?.data?.choices[0]?.message?.content;
            if(!!content) {
                const answer = content;

                debug.log(answer);
                console.log(answer);
                message.sendMsg(answer, toUser);
            }
        })
    }

}