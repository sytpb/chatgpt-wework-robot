export function xmlmsg1(toUser, fromUser, timeStamp, content) {
  
  return `<xml>
            <ToUserName><![CDATA[${toUser}]]></ToUserName>
            <FromUserName><![CDATA[${fromUser}]]></FromUserName>
            <CreateTime>${timeStamp}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${content}]]></Content>
          </xml>`;
};


export function xmlmsg2(toUser, fromUser, timeStamp, content) {
  
  return `<xml>
            <ToUserName><![CDATA[${toUser}]]></ToUserName>
            <FromUserName><![CDATA[${fromUser}]]></FromUserName>
            <CreateTime>${timeStamp}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${content}]]></Content>
          </xml>`;
};
