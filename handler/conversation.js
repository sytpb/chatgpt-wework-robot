
import debug from "../comm/debug.js";
import Message from "../comm/message.js";

export default class Conversation {
  
    constructor() {
    }

    urlconfig(req, res) {
        const message = new Message();
        message.urlSetting(req, res);
    }

    async process(body, res) {
        
        let chat = null;
        const data = body;
        const message = new Message();
        const xml = await message.decode(data);        
        const msgType = xml.MsgType;
        debug.log(msgType);
        
        if(msgType === "text") {
            chat = new textChat(msgType,xml);
        }
        else if (msgType === "image") {
            chat = new imageChat(msgType,xml);
        }
        else if (msgType === "voice") {
            chat = new audioChat(msgType,xml);
        }

        if(!!chat) {
            const answer = chat.process(xml);
            
            //comm.response(answer,res)
            return;
        }

        //debug.log("Not support msgtype []");
    }

    
}