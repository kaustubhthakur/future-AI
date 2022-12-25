const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {OpenAIApi, Configuration} = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  const app = express()
  app.use(cors())
  app.use(express.json())
  
  app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello Humans!'
    })
  })
  
  app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0, 
        max_tokens: 3000, 
        top_p: 1, 
        frequency_penalty: 0.5, 
        presence_penalty: 0, 
      });
  
      res.status(200).send({
        bot: response.data.choices[0].text
      });
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something went wrong');
    }
  })
  
  app.listen(5000, () => console.log(' server is started at port 5000'))