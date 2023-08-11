import React from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Editable from "../Editabled/Editable";

import "./Board.css";

const Board = (props) => {
  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
        </p>
        <div
          className="board_header_title_more"
        >
          <MoreHorizontal onClick={() => props.removeBoard()} />
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
