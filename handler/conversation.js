
import debug from "../comm/debug.js";
import Message from "../comm/message.js";
import TextChat from "../chat/text.js";

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
        const msgType = xml?.MsgType[0];
        debug.log(msgType,xml);

        if(msgType === "text") {
            chat = new TextChat(msgType,xml);
        }

        debug.log(!!chat);
        if(!!chat) {
            const answer = chat.process(xml, res);
            
            //comm.response(answer,res)
            return;
        }

        //debug.log("Not support msgtype []");
    }

    
}