import express from "express";
import { config } from "dotenv";
import debug from "./comm/debug.js";
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';

import { initAccessToken } from "./comm/accesstoken.js";
import conversation from "./route/conversation.js";

config();
bodyParserXml(bodyParser);

const app = express();
const PORT = process.env.PORT;

/*message.log();*/

/*config parser for body*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.xml());

/*health check for render*/
app.get('/healthz', function (req, res, next) {
    res.status(200).end();
});

app.use('/message',conversation);

/*init access_token*/
initAccessToken();

app.listen(PORT, () => {
    debug.out(`Server Running on Port:${PORT}`);
});