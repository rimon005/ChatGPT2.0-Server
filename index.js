import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import {Configuration , OpenAIApi} from 'openai';


const app = express();

env.config();

app.use(cors());

app.use(bodyParser.json());

const configuration = new Configuration({
    organization: "org-Axfy8VAUuiGXQcFZjWINk5m1",
    apiKey: process.env.API_KEY
});

console.log(configuration);



const openai = new OpenAIApi(configuration)

app.listen('3080' , () => {
    console.log('listening on port 3080');
})


app.get('/' , (req ,res) => {
    res.send('Hello world !')
});



// post route for making requests


app.post('/' , async(req , res ) => {
    const {massage} = req.body

    try{

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${massage}`,
            max_tokens: 100,
            temperature : .5
        })
        res.json({massage : response.data.choices[0].text})

    }catch(e){
        console.log(e);
        res.send(e).status(400)
    }
})