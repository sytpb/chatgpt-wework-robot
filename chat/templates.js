export function MDUserMsg(toUser, agentid, content) {

  return `{
    "touser": ${toUser},
    "msgtype": "markdown",
    "agentid": ${agentid},
    "markdown": {
      "content": "${content}"
    },
    "enable_duplicate_check": 0,
    "duplicate_check_interval": 1800
  }`
};


export function XMLUserMsg(toUser, fromUser, timeStamp, content) {

  return `<xml>
            <ToUserName><![CDATA[${toUser}]]></ToUserName>
            <FromUserName><![CDATA[${fromUser}]]></FromUserName>
            <CreateTime>${timeStamp}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${content}]]></Content>
          </xml>`;
};
