export function MDUserMsg(toUser, agentid, content) {

  const markdown = JSON.stringify({ "content": content });
  return `{
    "touser": "${toUser}",
    "msgtype": "markdown",
    "agentid": ${agentid},
    "markdown": ${markdown},
    "enable_duplicate_check": 0,
    "duplicate_check_interval": 1800
  }`;
};

export function TextUserMsg(toUser, agentid, content) {

  const text = JSON.stringify({ "content": content });
  return `{
    "touser": "${toUser}",
    "msgtype": "text",
    "agentid": ${agentid},
    "text": ${text},
    "enable_duplicate_check": 0,
    "duplicate_check_interval": 1800
  }`;
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
