import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeNote } from "../Features/singleTasksSlice";
function Notes({ note }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveNote = (id) => {
    dispatch(removeNote(id));
  };

  return (
    <>
      <article
        key={note.id}
        className="bg-[#fdf1cb] p-4 rounded-lg drop-shadow-md mt-8 border"
        onClick={() => {
          setOpen(false);
        }}
      >
        <div className="flex justify-between w-full mb-4">
          <h3 className="font-semibold">{note.title}</h3>
          <EllipsisVerticalIcon
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prevState) => !prevState);
            }}
            className=" w-[1.5rem] stroke-black hover:cursor-pointer "
          />
        </div>
        <p className="text-slate-700">{note.description}</p>
        {open && (
          <div
            className={`top-[2.3rem] right-[2rem] bg-white border absolute rounded w-36 text-blue-600 font-semibold px-2 py-1 shadow-black/10 shadow-md `}
          >
            <button
              onClick={() => handleRemoveNote(note.id)}
              className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left"
            >
              Remove
            </button>
            <button
              // onClick={addTask}
              className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left"
            >
              Edit
            </button>
          </div>
        )}
      </article>
    </>
  );
}

export default Notes;
