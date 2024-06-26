import { useState } from "react";
import TaskColumn from "../Components/TaskColumn";
import Editable from "../Components/Editable/Editable";
import "../App.css";

function KanbanBoard() {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "Todo",
      cards: [
        {
          id: Date.now() + Math.random() * 2,
          title: "Todo Card 1",
          tasks: [],
          lables: [{ text: "frontend", color: "blue" }],
        },
        {
          id: Date.now() + Math.random() * 2,
          title: "Todo Card 1",
          tasks: [],
          lables: [{ text: "frontend", color: "blue" }],
        },
      ],
      desc: "This is a todo description",
      date: new Date(),
    },
  ]);
  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });
  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };
  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;
    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      { id: Date.now() + Math.random(), title, cards: [] },
    ]);
  };
  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid);
    setBoards(tempBoards);
  };
  const handleDragEnter = (cid, bid) => {
    setTarget({ cid, bid });
  };
  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];
    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
    setBoards(tempBoards)
  };
  return (
    <section className=" bg-gray-50 w-full overflow-x-auto ">
      <h1 className="text-slate-700 font-extrabold text-2xl text-center">
        Kanban Board
      </h1>
      <section className="w-full h-full px-2 bg-slate-100 my-3 pt-2 ">
        <div className="w-full h-full flex justify-center gap-8">
          {boards.map((item) => (
            <TaskColumn
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
            />
          ))}

          <div className="app_boards_board">
            <Editable
              displayClass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter board title"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default KanbanBoard;
