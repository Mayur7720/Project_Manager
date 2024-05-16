import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
function DetailPage({ project, projectId, setNewPage }) {
  const data = project.project.filter((val) => val.projectID === projectId);

  return (
    <section
      className="backdrop-blur-0 bg-black/20 w-full h-full fixed top-0 left-0 z-10"
      onClick={() => setNewPage(false)}
    >
      <div
        className="bg-slate-50 overflow-hidden w-1/2 h-4/5 my-10 mx-auto rounded-lg "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3 className="bg-red-500 p-3 text-lg font-bold text-red-50 font-serif ">
          Project Details
        </h3>
        {data.map((val) => (
          <div key={val.projectID} className="p-4 h-full ">
            <p className="py-2 flex  justify-between">
              <label className="font-semibold text-slate-700" htmlFor="">
                Project Name
              </label>
              <input
                type="text"
                value={val.name}
                className="w-2/3 p-2 bg-slate-100 rounded border  focus:border-blue-400  pl-3  focus:ring-1 outline-none"
              />
            </p>
            <p className="py-2 flex  justify-between">
              <label className="font-semibold text-slate-700" htmlFor="">
                Description
              </label>
              <textarea
                value={val.description}
                type="text"
                className="w-2/3 p-2 bg-slate-100 rounded border  focus:border-blue-400  pl-3  focus:ring-1 outline-none"
              />
            </p>
            <p className="py-2 flex  justify-between">
              <label className="font-semibold text-slate-700" htmlFor="">
                Start Date
              </label>
              <input
                value={val.startDate}
                type="text"
                className="w-2/3 p-2 bg-slate-100 rounded border  focus:border-blue-400  pl-3  focus:ring-1 outline-none"
              />
            </p>
            <p className="py-2 flex  justify-between">
              <label className="font-semibold text-slate-700" htmlFor="">
                End Date
              </label>
              <input
                value={val.dueDate}
                type="text"
                className="w-2/3 p-2 bg-slate-100 rounded border  focus:border-blue-400  pl-3  focus:ring-1 outline-none"
              />
            </p>
            <p className="py-2 flex  justify-between">
              <label className="font-semibold text-slate-700" htmlFor="">
                Total Task
              </label>
              <input
                value={val.totalTask}
                type="text"
                className="w-2/3 p-2 bg-slate-100 rounded border  focus:border-blue-400  pl-3  focus:ring-1 outline-none"
              />
            </p>
            <p className="py-2 flex  justify-between">
              <label className="font-semibold text-slate-700" htmlFor="">
                Total Done
              </label>
              <input
                value={val.taskDone}
                type="text"
                className="w-2/3 p-2 bg-slate-100 rounded border  focus:border-blue-400  pl-3  focus:ring-1 outline-none"
              />
            </p>
            <p className="">
              <button className=" bg-blue-500 float-right  border px-2 py-1 mt-4 mr-4 rounded-md  hover:bg-blue-600 ">
                <PencilSquareIcon className="stroke-slate-50 w-6 h-6 " />
              </button>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailPage;
