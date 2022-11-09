import React, {FunctionComponent, useState} from 'react';

import classes from './App.module.css'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Translator from '../../components/Translator/Translator';
import TextViewer from '../../components/TextViewer/TextViewer';
import LearnArea from '../../components/LearnArea/LearnArea';

interface Language {
  confidence: number,
  language: string
}

export const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isUntranslatable, setIsUntranslatable] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  let handleInputTextChange = (e: React.FormEvent<HTMLInputElement>): void =>
  {
    setInputText((e.target as HTMLInputElement).value);
  }

  async function translate () {
      setIsTranslating(true);
      await fetch("http://192.168.0.129:8000/translate", {
      method: "POST",
      body: JSON.stringify({
        text: inputText,
      }),
      headers: {
        "Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then((response) => {
        setIsTranslating(false);
        setTranslatedText(response.text);
    })
    .catch((err) => {
      console.log(err)});
  }
    return (
      <div className={classes.AppWrapper}>
        <main className={classes.AppMain}>
          <Header/>
          <div>
          <Translator 
            changeHandler={handleInputTextChange}
            buttonHandler={translate}
            isTranslating={isTranslating}/>
          <TextViewer text={translatedText}/>
          <LearnArea/>
          </div>

          <Footer/>
        </main>
      </div>
  );
}

export default App;
