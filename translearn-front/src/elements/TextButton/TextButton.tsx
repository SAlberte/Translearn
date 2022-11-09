import React from 'react';

import classes from './TextButton.module.css'


interface TextButtonProps {
    text: string,
}

export default function TextButton(props: TextButtonProps) {
    return(
            <div className={classes.Text}>{props.text}</div>
    );
}