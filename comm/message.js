import { config } from "dotenv";
//import request from "request";

import crypto from "crypto";
import { parseString }  from "xml2js";
//import { getAccessToken } from "./config.js";

config();

const base = {
  url: 'https://qyapi.weixin.qq.com/cgi-bin',
};

export default class Message {
    constructor() {

        this.secret =   process.env.SECRET;
        this.agentid =  process.env.AGENTID;

        /*验证 URL 所需参数*/
        this.token =    process.env.TOKEN;
        this.corpid =   process.env.CORPID;
        this.aeskey =   process.env.AESKEY;
        /*to check*/
        this.aeskey = new Buffer.from(this.aeskey + '=', 'base64');
        this.iv = this.aeskey.slice(0, 16);
    }

    /*for test*/
    log() {

        const xmlMsg = "<root>Hello xml2js 1111!</root>";
        parseString(xmlMsg, function (err, result) {
            console.log(result.root);
        });
    }

    timestamp(delay) {
        delay = Number(delay) || 0;
        return parseInt(new Date().valueOf() / 1000) + delay * 1000;
    }

    PKCS7Decoder(buff) {
        var pad = buff[buff.length - 1];
        if (pad < 1 || pad > 32) {
            pad = 0;
        }
        return buff.slice(0, buff.length - pad);
    }

    encrypt(xmlMsg) {
        var random16 = crypto.pseudoRandomBytes(16);
        var msg = new Buffer.from(xmlMsg);
        /*to check*/
        var msgLength = new Buffer.alloc(4);

        msgLength.writeUInt32BE(msg.length, 0);
        var corpid = new Buffer.from(this.corpid);
        var rawMsg = Buffer.concat([random16, msgLength, msg, corpid]);
        var cipher = crypto.createCipheriv('aes-256-cbc', this.aeskey, this.iv);
        var cipheredMsg = Buffer.concat([cipher.update(rawMsg), cipher.final()]);

        return cipheredMsg.toString('base64');
    }

    decrypt(echostr) {

        let aesCipher = crypto.createDecipheriv("aes-256-cbc", this.aeskey, this.iv);
        aesCipher.setAutoPadding(false);
        let decipheredBuff = Buffer.concat([aesCipher.update(echostr, 'base64'), aesCipher.final()]);
        decipheredBuff = this.PKCS7Decoder(decipheredBuff);
        let len_netOrder_corpid = decipheredBuff.subarray(16);
        let msg_len = len_netOrder_corpid.subarray(0, 4).readUInt32BE(0);
        let result = len_netOrder_corpid.subarray(4, msg_len + 4).toString();

        return result;
    }

    getSignature(token, timestamp, nonce, echostr) {
        var key = [token, timestamp, nonce, echostr].sort().join('');
        var sha1 = crypto.createHash('sha1');
        sha1.update(key);

        return sha1.digest('hex');
    }

    verifyURL(signature, token, timestamp, nonce, echostr) {
        return this.getSignature(token, timestamp, nonce, echostr) == signature;
    }

    // 消息加密
    encryptMsg(replyMsg, opts) {

        var result = {};
        var options = opts || {};

        var encrypt = this.encrypt(replyMsg);
        var nonce = options.nonce || parseInt((Math.random() * 10000000000), 10);
        var timestamp = options.timestamp || this.timestamp();
        var msgsignature = this.getSignature(this.token, timestamp, nonce, encrypt);

        var resXml = `
          <xml>
            <Encrypt><![CDATA[${encrypt}]]></Encrypt>
            <MsgSignature><![CDATA[${msgsignature}]]></MsgSignature>
            <TimeStamp>${timestamp}</TimeStamp>
            <Nonce><![CDATA[${nonce}]]></Nonce>
          </xml>
        `;

        return resXml;
    }
    // 消息解密
    decryptMsg(msgSignature, token, timestamp, nonce, echostr) {

        var msgEncrypt = echostr.Encrypt;
        if (this.getSignature(token, timestamp, nonce, msgEncrypt) != msgSignature) {
            console.log('消息签名不一致');
            return false;
        }
        var decryptedMsg = this.decrypt(msgEncrypt);
        return parseXML(decryptedMsg, { explicitArray: false });
    }

    getMsg(req) {

        const encrypt = req.body.xml.Encrypt[0];
        let msg = this.decrypt(encrypt);
        return msg.xml.Content[0];
    }

    async decode(data) {

        const xmlString = this.decrypt(data.xml.Encrypt[0]);
        const result = await new Promise((resolve, reject) => 
            parseString(xmlString,(err, res) => {
                if (err) 
                    reject(err);
                else 
                    resolve(res);
        }));

        return result.xml;
    }

    async getMsgObj(req) {

        const xmlString = this.decrypt(req.body.xml.Encrypt[0]);
        const result = await new Promise((resolve, reject) => 
            parseString(xmlString,(err, res) => {
                if (err) 
                    reject(err);
                else 
                    resolve(res);
        }));

        return result.xml;
    }

    /*response the server url verify*/
    urlSetting(req, res) {

        const msg = req.query;
        if (this.verifyURL(msg.msg_signature, this.token, msg.timestamp, msg.nonce, msg.echostr)) {
            res.send(this.decrypt(msg.echostr));
        } else {
            console.log('urlSetting Error!');
        }
    }

    /*passive message
    reply(res, options, toUser) {

        res.writeHead(200, { 'Content-Type': 'application/xml' });
        var resMsg = xmlmsg1(toUser, process.env.CORPID, this.timestamp(), options.content);

        const msgEncrypt = this.encryptMsg(resMsg);

        res.end(msgEncrypt);
    }*/

    /*active message
    async sendMsg(answer, toUser) {

        const token = await getAccessToken();
        const texts = {
            "touser": toUser,
            "msgtype": "text",
            "agentid": process.env.AGENTID,
            "text": {
                "content": answer
            }
        };

        const options = {
            url: base.url + '/message/send?access_token=' + token,
            form: JSON.stringify(texts)
        };

        request.post(options, function (err, res, body) {
            if (err) {
                console.log(err);
                console.log(res?.headers,"\n",body)
            }
        });
    }*/
}  