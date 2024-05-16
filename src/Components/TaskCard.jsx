import {
  EllipsisVerticalIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import "../App.css";
import Dropdown from "./Dropdown";
function TaskCard(props) {
  const [open, setOpen] = useState(false);

  //   const project = projects.project.find(
  //     (project) => project.projectID === projectId
  //   );

  //   if (!project) {
  //     return [];
  //   }

  //   const projectMemberIds = project.selectedMembers;

  //   const projectMembers = projects.members
  //     ? projects.members.filter((member) =>
  //         projectMemberIds.includes(member.memberID)
  //       )
  //     : projects.members;

  //   const memberImages = projectMembers
  //     ? projectMembers.map((member) => member.memberImg)
  //     : projectMembers;

  //   return memberImages;
  // };

  // const projectMemberImages = getMemberImagesForProject(projectID);
  // const progress = (taskDone / totalTask) * 100;
  const progress = 100 * 100;

  return (
    <>
      <article
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        className={`border border-gray-300 relative w-full h-23 bg-white p-4 rounded-md overflow-hidden drop-shadow-md mt-1 `}
      >
        <div className={`w-full absolute top-0 left-0 h-[0.2rem] border-none`}>
          <div
            style={{ width: `${progress}%` }}
            className={`bg-red-500 h-full`}
          ></div>
        </div>
        <div className="flex justify-between ">
          <p
            onClick={() => setNewPage(true)}
            className="text-xl font-semibold mb-2 cursor-pointer decoration-orange-600 de hover:underline underline-offset-2 transition ease-in-out "
          >
            {props.card?.title}
          </p>
          <EllipsisVerticalIcon
            onClick={() => setOpen(true)}
            className="w-[1.5rem] stroke-black hover:cursor-pointer"
          />
        </div>

        {/* *******Newly Added Started******* */}
        <div className=" w-full h-1/4">
          {props.card?.lables?.map((item, index) => (
            <p className="w-full h-full " key={index}>
              <span
                className={`border border-solid bg-${item.color}-500 rounded ml-3`}
              >
                {item.text}
              </span>
              <span
                className={`border border-solid bg-${item.color}-500 rounded ml-3`}
              >
                {item.color}
              </span>
            </p>
          ))}
        </div>
        {/* *******Newly Added Ended******* */}
        {/* <div className=" mt-4 ">
          <ul className="flex">
            {projectMemberImages
              ? projectMemberImages.map((val, idx) => (
            <li
              key={idx}
              className=" left-[20px] w-7 bg-slate-400 rounded-full   border"
            >
              <img
                src={val}
                alt=""
                className="rounded-full object-contain w-full h-full"
              />
            </li>
            ))
              : projectMemberImages}
          </ul>
        </div> */}
        <div className="flex justify-between mt-12 ">
          <div className="flex w-14">
            <BarsArrowUpIcon className="w-[1.5rem] stroke-black hover:cursor-pointer" />
            {/* <p>{taskDone}/{totalTask}</p> */}
          </div>
          {/* <p>Due {finalDays > 1 ? finalDays + " days" : finalDays + " day"} </p> */}
          <p>{props.card?.date}</p>
        </div>
        {open && (
          <Dropdown onClose={() => setOpen(false)}>
            <button
              onClick={() => props.removeCard(props.card?.id, props.boardId)}
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
          </Dropdown>
        )}
      </article>
      {/* {newPage && (
        <DetailPage
          setNewPage={setNewPage}
          project={projects}
          projectId={projectID}
        />
      )} */}
    </>
  );
}

export default TaskCard;
