import React, { useState } from "react";
import {
  BarsArrowUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { removeTask } from "../Features/taskSlice";
import { useSelector, useDispatch } from "react-redux";

function Lists({
  listName,
  Days,
  remainingTasks,
  totalTasks,
  block,
  actions,
  taskID,
}) {
  const [open, setOpen] = useState(false);
  const project = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const progress = (remainingTasks / totalTasks) * 100;

  const handleRemove = () => {
    dispatch(removeTask({ block, taskID }));
  };
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <ul className="px-4 py-2  relative" onClick={() => setOpen(false)}>
        <li
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className=" flex justify-between items-center rounded-lg p-5 relative overflow-hidden bg-white "
        >
          <div>
            <div
              className={` w-full absolute top-0 left-0 h-[0.2rem] border-none `}
            >
              <div
                style={{ width: `${progress}%` }}
                className={
                  block === "Evalution"
                    ? "bg-red-500 h-full"
                    : block === "Ideation"
                    ? "bg-blue-500 h-full"
                    : "bg-green-600 h-full"
                }
              ></div>
            </div>
            <p className="font-semibold" htmlFor="">
              {listName}
            </p>
            <label htmlFor="" className="text-sm">
              {Days > 1 ? Days + " days" : Days + " day"}
            </label>
          </div>
          <div className="">
            <div className="flex  ">
              <div className="flex flex-row w-14">
                <BarsArrowUpIcon className="w-[1.5rem] stroke-black hover:cursor-pointer" />
                <p>
                  {remainingTasks}/{totalTasks}
                </p>
              </div>
              <EllipsisVerticalIcon
                onClick={handleOpen}
                className="w-[1.5rem] stroke-black hover:cursor-pointer"
              />
            </div>
          </div>
        </li>
        {actions ||
          (open && (
            <div
              className={`top-[4.5rem] right-[3rem] bg-white border absolute  rounded w-36 text-blue-600 font-semibold p-2 shadow-slate-200 shadow-md z-10`}
            >
              <button
                onClick={handleRemove}
                className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left text-red-500"
              >
                Remove
              </button>

              <button
                // onClick={addProject}
                className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left"
              >
                Mark as Done
              </button>
            </div>
          ))}
      </ul>
    </>
  );
}

export default Lists;
