
import Conversation from "../handler/conversation.js";

import express from "express";
const router = express.Router();

router.use('/', function(req, res, next) {
	let method = req.method;
	if(method == 'GET') {
	}
	else if(method == 'POST') {
		console.log(`------------------------ROUTER MSG [CONVERSATION]-------------------------`);
		const conversation = new Conversation();
		conversation.process(req.body,'',res);
	}
});

export default router;

