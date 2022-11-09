import React from 'react';

import classes from './Header.module.css'
import TextButton from '../../elements/TextButton/TextButton'

export default function Header() {
    return(
        <header className={classes.Header}>
                <TextButton text='Translate'></TextButton>
                <TextButton text='Practice'></TextButton>
        </header>
    );
}