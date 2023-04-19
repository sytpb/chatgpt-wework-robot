
import { Configuration, OpenAIApi } from "openai";

const models = ['text-davinci-003','code-davinci-002','gpt-3.5-turbo'];

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getAIChat = async (question) => {
    
    console.log("111111111111111111111");
    try {
        const res = await openai.createChatCompletion({
            model: models[0],
            messages:[{role:"user",content: question}]
        })
    }
    catch(error) {
        console.log(error);
    }
    console.log("222222222222222222222");
    return res;
};

export default getAIChat;