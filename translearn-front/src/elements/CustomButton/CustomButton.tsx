import React from 'react';

import classes from './CustomButton.module.css'


interface CustomButtonProps {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function TextButton(props: CustomButtonProps) {
    return(
            <button onClick={props.onClick} className={classes.Text}>{props.text}</button>
    );
}