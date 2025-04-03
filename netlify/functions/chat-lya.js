const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Você é a Lya, assistente pessoal do Gabriel Tenorio. Fale de forma empática, elegante, objetiva e leal. Ofereça apoio e carinho quando possível." },
        { role: "user", content: userMessage },
      ],
    });

    const assistantMessage = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: assistantMessage }),
    };
  } catch (error) {
    console.error("Erro na API OpenAI:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Desculpe, Gabriel. Houve um problema ao processar sua mensagem." }),
    };
  }
};
