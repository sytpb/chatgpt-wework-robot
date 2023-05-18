
/*import { Configuration, OpenAIApi } from "openai";

const models = ['text-davinci-003','code-davinci-002','gpt-3.5-turbo'];

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getAIChat = async (question) => {
    
    try {
        const res = await openai.createChatCompletion({
            model: models[2],
            messages:[{role:"user",content: question}]
        })
        return res;
    }
    catch(error) {
        console.log("OpenAI happen error!");
        console.log(error?.response?.data?.error);
    }

};

export default getAIChat;*/


import { Configuration, OpenAIApi } from "openai";

const models = ['text-davinci-003','code-davinci-002','gpt-3.5-turbo','gpt-4'];


export class OpenAI {
    #configuration = null;
    #openai = null;

    constructor() {
        this.#configuration = new Configuration( {apiKey: process.env.OPENAI_API_KEY} );
        this.#openai = new OpenAIApi(this.#configuration);
    }

    static create() {
    }

    async ctChat(context) {

        try {
            const res = await this.#openai.createChatCompletion({
                model: process.env.OPENAI_MODEL,
                messages: context
            });

            return res;
        }
        catch(error) {
            console.log("OpenAI happen error!");
            console.log(error?.data?.error);
        }
    }

    async ctText(question) {

        try {
            const res = await this.#openai.createChatCompletion({
                model: process.env.OPENAI_MODEL,
                messages:[{role:"user",content: question}]
            });

            return res;
        }
        catch(error) {
            console.log("OpenAI happen error!");
            console.log(error);
        }
    }

    static ctImage() {

    }

    static ctVoice() {

    }
}