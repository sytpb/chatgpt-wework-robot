import request from "request";

let accessToken = { token: 'NO_TICKET', expire: 0 };

const baseURL = 'https://qyapi.weixin.qq.com/cgi-bin';


function newAccessToken() {

    const corpid = process.env.CORPID;
    const secret = process.env.SECRET;

    const url = `${baseURL}/gettoken?corpid=${corpid}&corpsecret=${secret}`;
    const options = {
        method: 'GET',
        url: url
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (res) {
                const token = JSON.parse(body)['access_token'];
                resolve(token);
            } else {
                reject(err);
            }
        });
    });
}

function setAccessToken(token) {

    const expire = new Date().getTime() + 2 * 60 * 60 * 1000;
    accessToken = { ...accessToken, token, expire }
}

async function getAccessToken() {

    const current = new Date().getTime();
    if (accessToken.expire > current)           /*timeout*/
        return accessToken.token;
    else {
        console.log("access token expired , refresh...")
        const token = await newAccessToken();
        setAccessToken(token);
        return token;
    }
}

async function initAccessToken() {
    const token = await newAccessToken();
    console.log("TOKEN:",token);
    setAccessToken(token);  
}

export {
    initAccessToken,
    getAccessToken
};
