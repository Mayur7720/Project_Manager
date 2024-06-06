import { useState } from "react";
import Dropdown from "./Dropdown";
import TaskCard from "./TaskCard";
import Editable from "./Editable/Editable";
import "../App.css";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
// import Card from './Card'
// const initialState = {
//   todo: [
//     {
//       id: 1,
//       task: "This is from First Block ID:1",
//       status: "todo",
//     },
//     {
//       id: 2,
//       task: "This is from First Block ID:2",
//       status: "todo",
//     },
//   ],
//   backlog: [
//     {
//       id: 3,
//       task: "This is from First Block ID:3",
//       status: "backlog",
//     },
//     {
//       id: 4,
//       task: "This is from First Block ID:4",
//       status: "backlog",
//     },
//   ],
//   done: [
//     {
//       id: 5,
//       task: "This is from First Block ID:5",
//       status: "done",
//     },
//     {
//       id: 6,
//       task: "This is from First Block ID:6",
//       status: "done",
//     },
//   ],
// };
function TaskColumn(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div
        className={`relative bg-slate-100 p-3 text-center rounded-lg border border-1 border-slate-400 shadow-neutral-500 drop-shadow-md  w-[22.2rem]  overflow-y-auto custom-scroll `}
      >
        <div className="flex justify-between mb-2 ">
          <p>{props.board?.title}</p>
          <span className="font-semibold">{`${props.board?.cards?.length}`}</span>
          <div className="relative ">
            <EllipsisVerticalIcon
              className="w-6 h-6 hover:cursor-pointer hover:bg-slate-200 rounded-full"
              onClick={() => setShowDropdown(true)}
            />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <button
                  className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left"
                  onClick={() => props.removeBoard(props.board?.id)}
                >
                  Remove Board
                </button>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="p-1  rounded bg-slate-200 custom-scroll">
          {props.board?.cards?.map((item) => (
            <TaskCard
              key={item.id}
              card={item}
              removeCard={props.removeCard}
              boardId={props.board?.id}
              handleDragEnd={props.handleDragEnd}
              handleDragEnter={props.handleDragEnter}
            />
          ))}
          <Editable
            displayClass="board_cards_add"
            text="Add Card"
            placeholder="Enter Card Title"
            onSubmit={(value) => props.addCard(value, props.board?.id)}
          />
        </div>
      </div>
    </>
  );
}
export default TaskColumn;
