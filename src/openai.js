const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey:"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",
  dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenAI(msg){
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: msg,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1
           
        });
        return response.choices[0].text;
    }