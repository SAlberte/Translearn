import React from "react";

import classes from './Translator.module.css'
import refresh_icon from '../../assets/Refresh_icon.png'

interface TranslatorProps {
    changeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
    buttonHandler: () => void;
    isTranslating: boolean;
}

export const Translator = ({changeHandler, buttonHandler, isTranslating}: TranslatorProps) => {
    const maxTranslationLenght = 34;
    const translationPlaceholder = "enter word"
    return(
        <div className={classes.Translator}>
            <input
                onChange={(e) => changeHandler(e)}
                placeholder={translationPlaceholder}
                maxLength={maxTranslationLenght}
                type='text'
                className={classes.InputArea}>
            </input>
            <button
             onClick={buttonHandler}
             type="submit"
             className={classes.Button}>
                 <img alt="img" 
                    src={refresh_icon}
                    className={isTranslating?classes.Spin:classes.NotSpin}/>
            </button>
        </div>
    );
}

export default Translator