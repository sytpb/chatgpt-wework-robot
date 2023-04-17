export default function text(toUser, fromUser, timeStamp, content) {
  
    return `<xml>
              <ToUserName><![CDATA[${toUser}]]></ToUserName>
              <FromUserName><![CDATA[${fromUser}]]></FromUserName>
              <CreateTime>${timeStamp}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${content}]]></Content>
            </xml>`;
};
