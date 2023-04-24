"use strict"


import Chat from "./chat.js";
import debug from "../comm/debug.js";
import getAIChat from "../openai.js";

export default class TextChat extends Chat{
  
    constructor(name) {
        super(name);
    }

    process(xml) {

        debug.log("text chat...",xml);
        const question = xml.content;
        debug.log(question);
        getAIChat(question).then(result => {
            const content = result?.data?.choices[0]?.message?.content;
            if(!!content) {
                const answer = content;

                debug.log(answer);
                console.log(answer);
                //message.sendMsg(answer, toUser);
            }
        })
    }

}