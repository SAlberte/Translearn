import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import classes from "./LearnArea.module.css";
import Puzzle from "./Puzzle";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../elements/CustomButton/CustomButton";

const translations = {
  translations: [
    { orig: "xdd", trans: "_xdd_" },
    { orig: "lol", trans: "_lol_" },
    { orig: "420", trans: "_420_" },
    { orig: "69", trans: "_69_" },
    { orig: "shit", trans: "_shit_" },
    { orig: "noice", trans: "_noice_" },
    { orig: "one bigger than other", trans: "_one bigger than other_" },
  ],
};

function shuffle(array) {
  const newArray = [...array];
  const length = newArray.length;

  for (let start = 0; start < length; start++) {
    const randomPosition = Math.floor(
      (newArray.length - start) * Math.random()
    );
    const randomItem = newArray.splice(randomPosition, 1);

    newArray.push(...randomItem);
  }

  return newArray;
}

export default function LearnArea() {
  const [ids, setIds] = useState([]);
  const [puzzleFields, setPuzzleFields] = useState([]);

  useEffect(() => {
    let pairsNum = translations["translations"].length;
    let texts_ = [];
    for (let i = 0; i < pairsNum; i++) {
      texts_.push(translations["translations"][i]["orig"]);
      texts_.push(translations["translations"][i]["trans"]);
    }
    setPuzzleFields(
      shuffle(ids.map((id) => {
        return {
          key: uuidv4(),
          id: id,
          dropType: id,
          dragType: (Number(id % 2)
            ? Number(id) - 1
            : Number(id) + 1
          ).toString(),
          isDeleted: false,
          text: texts_[id],
          dragFailed: 0,
        };
      }))
    );
  }, [ids]);

  const createPuzzles = () => {
    let pairsNum = translations["translations"].length;
    setIds(
      Array(pairsNum * 2)
        .fill()
        .map((_, i) => i.toString())
    );
  }

  function updateAnimEnd(id) {
    setPuzzleFields((puzzleFields) =>
      puzzleFields.map((puzzle) =>
        puzzle.id === id
          ? {
              ...puzzle,
              dragFailed: 0,
            }
          : puzzle
      )
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && over.data.current.accepts.includes(active.data.current.type)) {
      console.log(active.id)
      console.log(over.id)
      console.log(puzzleFields)
      setPuzzleFields((puzzleFields) =>
        puzzleFields.map((puzzle) =>
          puzzle.id === active.id || puzzle.id === over.id
            ? {
                ...puzzle,
                isDeleted: true,
                dragFailed: 1,
              }
            : puzzle
        )
      );

    } else {
      let id = active.id;
      setPuzzleFields((puzzleFields) =>
        puzzleFields.map((puzzle) =>
          puzzle.id === id
            ? {
                ...puzzle,
                isDeleted: false,
                dragFailed: 1,
              }
            : {
              ...puzzle,
              dragFailed: 0,
            }
        )
      );
    }
  }

  const getPuzzles = () => {
    return puzzleFields.map((puzzle) => {
      return (
        <Puzzle
          key={puzzle.key}
          id={puzzle.id}
          dropType={puzzle.id}
          dragType={(Number(puzzle.id % 2)
            ? Number(puzzle.id) - 1
            : Number(puzzle.id) + 1
          ).toString()}
          isDeleted={puzzle.isDeleted}
          text={puzzle.text}
          dragFailed={puzzle.dragFailed}
          animEnd={updateAnimEnd}
        />
      );
    })
  }

  return (
    <div className={classes.LearnArea}>
      <CustomButton onClick={createPuzzles} text="Restart" />
      <DndContext onDragEnd={handleDragEnd}>
        <div className={classes.DnDContext}>
          {getPuzzles()}
        </div>
      </DndContext>
    </div>
  );
}
