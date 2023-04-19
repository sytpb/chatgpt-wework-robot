import fs from "fs";
import { config } from "dotenv";
import request from "request";

import crypto from "crypto";
import {parseString}  from "xml2js";
import templates from "./templates.js";


config();





var base = {
  url: 'https://qyapi.weixin.qq.com/cgi-bin',
};

export class Message {
    constructor(options) {
        this.options = options;
        this.res = null;
        this.secret = options.secret;
        this.agentid = options.agentid;

        // 验证 URL 所需参数
        this.token = options.token;
        this.corpid = options.corpid;
        this.aeskey = options.aeskey;
        /*to check*/
        this.aeskey = new Buffer.from(options.aeskey + '=', 'base64');
        this.iv = this.aeskey.slice(0, 16);
    }

    log() {
        //console.log(this.options, this.iv, this.aeskey);
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

        return result; // 返回一个解密后的明文
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
        // 标准回包
        var resXml = `
          <xml>
            <Encrypt><![CDATA[${encrypt}]]></Encrypt>
            <MsgSignature><![CDATA[${msgsignature}]]></MsgSignature>
            <TimeStamp>${timestamp}</TimeStamp>
            <Nonce><![CDATA[${nonce}]]></Nonce>
          </xml>
        `;

        return resXml;
        // result.Encrypt = this.encrypt(replyMsg);
        // result.Nonce = options.nonce || parseInt((Math.random() * 10000000000), 10);
        // result.TimeStamp = options.timestamp || this.timestamp();
        // result.MsgSignature = this.getSignature(this.token, result.TimeStamp, result.Nonce, result.Encrypt);
        // return buildXML.buildObject(result);
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
    /**
     * 解析请求中的文字信息
     * eg.
     * <xml>
     *   ...
     *   <Content>hello world</Content>
     * </xml>
     * 
     * return hello world
     */
    async getMsg(req) {
        console.log("111111111111111111111111");
        console.log(req.body.xml);
        console.log("22222222222222222222222222");
        console.log(req.body.xml.ToUserName,"\n",req.body.xml.Encrypt);
        const encrypt = req.body.xml.Encrypt[0];
        console.log(typeof encrypt);

        let msg = this.decrypt(encrypt);

        console.log(msg);
        return msg.xml.Content[0];
    }

    async getMsgObj(req) {
        const xmlMsg = this.decrypt(req.body.xml.encrypt);

        const data = await parseString(xmlMsg);
        console.log(data)

        return data.xml;
    }
    // 获取 access_token
    getAccessToken() {
        var url = `${base.url}/gettoken?corpid=${this.corpid}&corpsecret=${this.secret}`;
        var options = {
            method: 'GET',
            url: url
        };
        return new Promise((resolve, reject) => {
            request(options, function (err, res, body) {
                if (res) {
                    resolve(JSON.parse(body));
                } else {
                    reject(err);
                }
            });
        });
    }

    saveToken() {
        this.getAccessToken().then(res => {
            var token = res['access_token'];
            fs.writeFile('./token', token, function (err) {
                console.log('token saved.');
            });
        });
    }

    updateToken() {
        this.saveToken();
        setInterval(function () {
            this.saveToken();
        }, 7000 * 1000); // ≈ 2h
    }
    /**
     * 接收消息服务器配置
     */
    urlSetting(req, res) {
        const msg = req.query;
        if (this.verifyURL(msg.msg_signature, this.token, msg.timestamp, msg.nonce, msg.echostr)) {
            res.send(this.decrypt(msg.echostr));
        } else {
            console.log('urlSetting Error!');
        }
    }
    /**
     * 被动回复消息
     * @param {Object} options - 配置对象{type:[text|image|...], content: ['hello'|'hi, <a>...</a>']}
     */
    reply(res, options, user) {
        var config = {
            toUser: user,
        };
        console.log(options)
        this.res = res;
        this.res.writeHead(200, { 'Content-Type': 'application/xml' });
        var resMsg = templates[options.type](config.toUser, this.corpid, this.timestamp(), options.content);
        console.log('resMsg')
        console.log(resMsg)
        var msgEncrypt = this.encryptMsg(resMsg);
        console.log(msgEncrypt)
        this.res.end(msgEncrypt);
    }
    /**
     * 主动发送消息 (可继续封装完善)
     */
    sendMsg(msg) {
        var token = fs.readFileSync('./token').toString();
        var texts = {
            "touser": this.userId,
            "msgtype": "text",
            "agentid": this.agentid,
            "text": {
                "content": msg
            }
        };

        var options = {
            url: base.url + '/message/send?access_token=' + token,
            form: JSON.stringify(texts)
        };

        request.post(options, function (err, res, body) {
            if (err) {
                console.log(err);
            }
        });
    }
}  