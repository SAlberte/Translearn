import {useDroppable} from '@dnd-kit/core';
import classes from './LearnArea.module.css'


export function Droppable(props) {
    const {setNodeRef} = useDroppable({
      id: props.id,
      data: {
        accepts: props.dropType
      },
    });
    
    return (
      <div ref={setNodeRef} className={classes.Droppable}>
        {props.children}
      </div>
    );
  }
  
