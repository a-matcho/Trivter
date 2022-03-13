import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import ReactDOM from 'react-dom';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var count = 0;


function App() {

  return (
    <div className="App-header" id='root'>
      <div id='inner-root'></div>
    </div>
  );
}

async function newTwit() {
  const newdiv = document.createElement("div");
  var ids = "div" + count;
  newdiv.id = ids;
  count++;
  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: "Tell me a trivia fact about birds",
    temperature: 0.8,
  });
  var triv = completion.data.choices[0].text;
  const twit = (
    <div>{triv}
    </div>
  );
  const root = document.getElementById('inner-root');
  root.appendChild(newdiv);
  ReactDOM.render(twit, document.getElementById(ids));
}

setInterval(newTwit, 5000);

export default App;
