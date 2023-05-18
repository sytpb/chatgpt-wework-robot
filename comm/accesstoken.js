import axios from "axios";

let accessToken = { token: 'NO_TICKET', expire: 0 };

const baseURL = 'https://qyapi.weixin.qq.com/cgi-bin';


function newAccessToken() {

    const corpid = process.env.CORPID;
    const secret = process.env.SECRET;

    const url = `${baseURL}/gettoken?corpid=${corpid}&corpsecret=${secret}`;


    const config  = { 
        headers:{
            'Accept': "application/json",
            'Content-Type': "application/json"
        }
    };

    return axios.get(url,config);


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
        const result = await newAccessToken();
        const token = result?.data?.access_token;
        setAccessToken(token);
        return token;
    }
}

async function initAccessToken() {

    const result = await newAccessToken();
    const token = result?.data?.access_token;
    console.log("TOKEN:",token);
    setAccessToken(token);  
}

export {
    initAccessToken,
    getAccessToken
};
