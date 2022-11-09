import React from 'react';
import {Draggable} from './Draggable'
import {Droppable} from './Droppable'
import {v4 as uuidv4} from 'uuid'
import classes from './LearnArea.module.css'


export default function Puzzle(props) {

    return( props.isDeleted ? <></> :
        <div className={classes.Puzzle}>
            <Droppable key={uuidv4()} id={props.id} dropType={props.dropType} >
                <Draggable key={uuidv4()} id={props.id} dragType={props.dragType}
                 color={props.color} dragFailed={props.dragFailed}
                  animEnd={props.animEnd}>{props.text}
                </Draggable>
            </Droppable>
        </div>
    );
}