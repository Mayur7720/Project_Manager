import {
  EllipsisVerticalIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeProject } from "../Features/projectSlice";
import DetailPage from "../Pages/DetailPage";

function Card({ name, finalDays, projectID, projects, totalTask, taskDone }) {
  const [width, setWidth] = useState(10);
  const [open, setOpen] = useState(false);
  const [newPage, setNewPage] = useState(false);
  const dispatch = useDispatch();

  const addTask = () => {
    setWidth(width + 10);
  };

  const handleRemoveCard = () => {
    dispatch(removeProject(projectID));
  };

  const getMemberImagesForProject = (projectId) => {
    const project = projects.project.find(
      (project) => project.projectID === projectId
    );

    if (!project) {
      return [];
    }

    const projectMemberIds = project.selectedMembers;

    const projectMembers = projects.members
      ? projects.members.filter((member) =>
          projectMemberIds.includes(member.memberID)
        )
      : projects.members;

    const memberImages = projectMembers
      ? projectMembers.map((member) => member.memberImg)
      : projectMembers;

    return memberImages;
  };

  const projectMemberImages = getMemberImagesForProject(projectID);
  const progress = (taskDone / totalTask) * 100;

  return (
    <>
      <div
        onClick={() => {
          setOpen(false);
        }}
        className="border border-gray-300 relative w-full h-48 bg-white p-4 rounded-md overflow-hidden drop-shadow-md "
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
            {name}
          </p>
          <EllipsisVerticalIcon
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prevState) => !prevState);
            }}
            className="w-[1.5rem] stroke-black hover:cursor-pointer"
          />
        </div>
        <div className=" mt-4 ">
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
        </div>
        <div className="flex justify-between mt-12 ">
          <div className="flex w-14">
            <BarsArrowUpIcon className="w-[1.5rem] stroke-black hover:cursor-pointer" />
            <p>
              {taskDone}/{totalTask}
            </p>
          </div>
          <p>Due {finalDays > 1 ? finalDays + " days" : finalDays + " day"} </p>
        </div>
        {open && (
          <div
            className={`top-[2.3rem] right-[2rem] bg-white border absolute rounded w-36 text-blue-600 font-semibold p-2 shadow-slate-200 shadow-md `}
          >
            <button
              onClick={handleRemoveCard}
              className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left"
            >
              Remove
            </button>
            <button
              onClick={addTask}
              className="px-2 mt-1 py-1 text-left hover:bg-slate-200 rounded text-sm w-full float-left"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {newPage && (
        <DetailPage
          setNewPage={setNewPage}
          project={projects}
          projectId={projectID}
        />
      )}
    </>
  );
}

export default Card;
