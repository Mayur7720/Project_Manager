import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../Features/projectSlice";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Card from "../Components/Card";
import Modal from "../Components/Modal";

function RightSideBar() {
  const projects = useSelector((state) => state.Project);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    projectID: "",
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [memberQuery, setMemberQuery] = useState("");
  const [active, setActive] = useState("projects");
  const [fieldActive, setFieldActive] = useState("details");

  const findProject = async (data) => {
    setQuery(data);
  };

  const findMember = async (data) => {
    setMemberQuery(data);
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMemberChange = (id) => {
    const updatedMembers = selectedMembers.includes(id)
      ? selectedMembers.filter((memberID) => memberID !== id)
      : [...selectedMembers, id];
    setSelectedMembers(updatedMembers);
  };

  const handleAddProject = () => {
    const projectID = Date.now();
    const start_Date = new Date(`${projectData.startDate}`);
    const due_Date = new Date(`${projectData.dueDate}`);
    const date_Diff = start_Date.getTime() - due_Date.getTime();
    const finalDays = Math.abs(Math.round(date_Diff / (1000 * 3600 * 24)));

    const newProject = {
      ...projectData,
      projectID,
      finalDays,
      selectedMembers,
    };
    console.log(newProject);
    dispatch(addProject(newProject));
    setProjectData({
      projectID: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
    });
    setSelectedMembers([]);
  };

  return (
    <>
      <section className="w-full bg-gray-50 h-full overflow-x-hidden">
        <div className="w-3/4 mb-8  mx-auto">
          <h2 className="text-3xl text-gray-600 font-extrabold text-center m-3">
            Team Overview
          </h2>
          <hr className="h-1 my-4 " />
          <div className="w-full h-[3.5rem] bg-gray-200 flex justify-evenly gap-3  text-center px-2 py-2  rounded-md">
            <button
              onClick={() => setActive("projects")}
              className={`w-1/2 ${
                active === "projects"
                  ? "bg-white text-blue-500"
                  : "text-gray-500"
              } } hover:text-blue-500 font-semibold text-sm  rounded-md`}
            >
              Projects
            </button>
            <button
              onClick={() => setActive("members")}
              className={`w-1/2 ${
                active === "members"
                  ? "bg-white text-blue-500"
                  : "text-gray-500 "
              } font-semibold hover:text-blue-500 text-sm rounded-md`}
            >
              Members
            </button>
          </div>
          {active === "projects" && (
            <div className=" ">
              <div className="my-6 ">
                <div className="inline-flex items-center gap-3 ">
                  <h3 className="text-3xl font-semibold">Projects</h3>
                  <PlusCircleIcon
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="w-[2.5rem] fill-slate-300 stroke-1 stroke-slate-500 hover:cursor-pointer"
                  />
                  <Modal
                    Open={open}
                    setOpen={setOpen}
                    header={
                      <div className=" inline text-white pt-1  ">
                        New Project
                      </div>
                    }
                    footer={
                      <button
                        onClick={handleAddProject}
                        className="bg-blue-600 px-2 py-2 font-semibold rounded text-white"
                      >
                        Create Project
                      </button>
                    }
                  >
                    <div className="w-full h-16 px-4 py-2 bg-slate-200 flex justify-evenly gap-5 items-center  ">
                      <button
                        onClick={() => setFieldActive("details")}
                        className={`w-1/2 h-3/4 rounded-md text-sm font-semibold  ${
                          fieldActive === "details"
                            ? "bg-white text-blue-500 "
                            : "text-gray-500"
                        }`}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setFieldActive("members")}
                        className={`w-1/2 h-3/4 rounded-md text-sm font-semibold  ${
                          fieldActive === "members"
                            ? "bg-white text-blue-500 "
                            : "text-gray-500"
                        }`}
                      >
                        Members
                      </button>
                    </div>
                    {fieldActive === "details" && (
                      <div className="w-full">
                        <div className="p-4">
                          <p className="font-semibold">General Details</p>
                          <div className="flex justify-between mt-4 ">
                            <label
                              className=" text-zinc-500 font-semibold text-sm"
                              htmlFor="name"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="border p-[0.4rem] w-3/4 outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 text-zinc-600 font-semibold text-sm rounded-md  "
                              placeholder="Project name"
                              value={projectData.name}
                              onChange={handleProjectChange}
                            />
                          </div>

                          <div className=" flex justify-between mt-4 ">
                            <label
                              className="text-zinc-500 font-semibold text-sm"
                              htmlFor="description"
                            >
                              Description
                            </label>
                            <textarea
                              type="text"
                              id="description"
                              name="description"
                              className="border px-2 pt-2 pb-6 w-3/4 outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 focus:blue rounded-md text-zinc-600 font-semibold text-sm "
                              placeholder="Project description"
                              value={projectData.description}
                              onChange={handleProjectChange}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="p-4">
                          <p className="font-semibold">Timeline</p>
                          <div className="flex items-center justify-between mt-3">
                            <label
                              htmlFor="startDate"
                              className="mt-2 text-zinc-500 font-semibold text-sm font-sans"
                            >
                              Start Date
                            </label>
                            <input
                              id="startDate"
                              name="startDate"
                              className="border ml-4 mt-4 bg-gray-200 w-3/4 p-2 text-zinc-500 font-semibold text-sm rounded-md outline-none ring-1 ring-transparent  focus:ring-blue-500"
                              type="date"
                              value={projectData.startDate}
                              onChange={handleProjectChange}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <label
                              htmlFor="dueDate"
                              className="mt-2 text-zinc-500 font-semibold text-sm font-sans"
                            >
                              Due Date
                            </label>
                            <input
                              name="dueDate"
                              id="dueDate"
                              className="border ml-4 mt-4 bg-gray-200 w-3/4 p-2  text-zinc-500 font-semibold text-sm rounded-md outline-none ring-1 ring-transparent  focus:ring-blue-500"
                              type="date"
                              value={projectData.dueDate}
                              onChange={handleProjectChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {fieldActive === "members" && (
                      <div className="w-full h-[24rem] ">
                        <div className="w-full text-center ">
                          <input
                            placeholder="Filter members"
                            type="text"
                            onChange={(e) => findMember(e.target.value)}
                            className="rounded-full px-3 border py-2 w-5/6 m-4 bg-slate-100  outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 duration-200 "
                          />
                        </div>
                        {projects.members
                          .filter((val) =>
                            val.name.toLowerCase().includes(`${memberQuery}`)
                          )
                          .map((member) => (
                            <li
                              key={member.memberID}
                              className="flex justify-evenly  mx-6 my-5 "
                            >
                              <div className=" w-full flex items-center ">
                                <div className=" w-10 h-10 rounded-full overflow-hidden border mr-2 ">
                                  <img
                                    src={member.memberImg}
                                    alt=""
                                    className="w-full"
                                  />
                                </div>
                                <label className="font-semibold" htmlFor="">
                                  {member.name}
                                </label>
                              </div>
                              <input
                                type="checkbox"
                                checked={selectedMembers.includes(
                                  member.memberID
                                )}
                                onChange={() =>
                                  handleMemberChange(member.memberID)
                                }
                                name=""
                                id=""
                              />
                            </li>
                          ))}
                      </div>
                    )}
                  </Modal>
                </div>
                <input
                  type="text"
                  className="float-right mt-1 rounded-full w-1/3 px-6 py-[0.4rem] border outline-none  ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 duration-200 "
                  placeholder="Filter projects "
                  onChange={(e) => findProject(e.target.value)}
                  value={query}
                />
              </div>
              <div className="w-full  grid grid-cols-2 gap-7  ">
                {projects.project
                  .filter((val) => val.name.toLowerCase().includes(`${query}`))
                  .map((val) => (
                    <Card
                      key={val.projectID}
                      name={val.name}
                      detail={val.description}
                      startDate={val.startDate}
                      endDate={val.endDate}
                      projectID={val.projectID}
                      projects={projects}
                      finalDays={val.finalDays}
                      totalTask={val.totalTask}
                      taskDone={val.taskDone}
                    />
                  ))}
              </div>
            </div>
          )}
          {active === "members" && (
            <div className="">
              <div className="my-6  ">
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold inline">Members</h2>
                  <input
                    type="text"
                    className="float-right mt-1 rounded-full w-1/3 px-6 py-[0.4rem] border outline-none  ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 duration-200 "
                    placeholder="Filter members "
                    onChange={(e) => findMember(e.target.value)}
                    value={memberQuery}
                  />
                </div>
                <ul className="grid gap-4 grid-cols-2  ">
                  {projects.members
                    .filter((val) =>
                      val.name.toLowerCase().includes(`${memberQuery}`)
                    )
                    .map((val) => (
                      <li
                        key={val.memberID}
                        className="  flex items-center gap-3 mb-5"
                      >
                        <div className="border w-12 h-12 rounded-full text-center  overflow-hidden ">
                          <img
                            className=" w-full object-fill "
                            src={`${val.memberImg}`}
                            alt="team member"
                          />
                        </div>
                        <div className=" ">
                          <p
                            className="my-auto h-full font-semibold"
                            htmlFor=""
                          >
                            {val.name}
                          </p>
                          <p
                            className="my-auto h-full  text-gray-500 "
                            htmlFor=""
                          >
                            {val.position}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RightSideBar;
