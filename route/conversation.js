
import debug from "../comm/debug.js";
import Conversation from "../handler/conversation.js";

import express from "express";
const router = express.Router();

router.use('/', function(req, res, next) {
	let method = req.method;
	if(method == 'GET') {
		debug.out(`------------------------ROUTER MSG [URL SETTING]-------------------------`);
		const conversation = new Conversation();
		conversation.urlconfig(req, res);
	}
	else if(method == 'POST') {
		debug.log(`------------------------ROUTER MSG [CONVERSATION]-------------------------`);
		const conversation = new Conversation();
		conversation.process(req.body, res);
	}
});

export default router;

