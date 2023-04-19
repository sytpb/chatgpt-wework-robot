
import { Configuration, OpenAIApi } from "openai";

const models = ['text-davinci-003','code-davinci-002','gpt-3.5-turbo'];

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getAIChat = async (question) => {
    
    console.log(configuration);
    const res = await openai.createChatCompletion({
        model: models[0],
        messages:[{role:"user",content: question}]
    })

    return res;
};

export default getAIChat;