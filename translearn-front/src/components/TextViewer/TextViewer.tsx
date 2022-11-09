import React from "react";

import classes from './TextViewer.module.css'


interface translatedText {
    text: string
}

export default function TextViewer({text}: translatedText) {

    return(
        <div className={classes.TextViewer}>
            <textarea
                readOnly
                placeholder="..."
                value={text}
                className={classes.TextArea}>
            </textarea>
        </div>
    );
}