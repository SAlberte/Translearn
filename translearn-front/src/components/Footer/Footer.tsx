import React from 'react';

import classes from './Footer.module.css'

export default function Footer() {
    return(
        <footer className={classes.Footer}>
            <div className={classes.LogoText}>TRANSLEARN</div>
            <div className={classes.Separator}></div>
        </footer>
    );
}