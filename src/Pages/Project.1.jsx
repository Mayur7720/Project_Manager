import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../Features/taskSlice";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../Components/Modal";
import Lists from "../Components/Lists";

export function Project() {
  const tasks = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [actions, setActions] = useState(false);
  const [query, setQuery] = useState("");

  const EnteredName = useRef();
  const EnteredDescription = useRef();
  const EnteredStartDate = useRef();
  const EnteredEndDate = useRef();
  const selectedBlock = useRef();

  const changeInput = (value) => {
    setQuery(value);
  };

  const handleAddTask = () => {
    const taskID = Date.now();
    let taskName = EnteredName.current.value;
    let taskDescription = EnteredDescription.current.value;
    let taskStartDate = EnteredStartDate.current.value;
    let taskEndDate = EnteredEndDate.current.value;
    let taskSelectedBlock = selectedBlock.current.value;
    const start_Date = new Date(`${taskStartDate}`);
    const end_Date = new Date(`${taskEndDate}`);
    const date_Diff = start_Date.getTime() - end_Date.getTime();
    const remainingDays = Math.abs(Math.round(date_Diff / (1000 * 3600 * 24)));
    const newTask = {
      taskID,
      taskName,
      taskDescription,
      taskEndDate,
      taskStartDate,
      taskSelectedBlock,
      remainingDays,
    };

    dispatch(addTask(newTask));
  };
  return (
    <section
      className="w-full bg-gray-50 overflow-x-hidden "
      onClick={() => setActions(false)}
    >
      <h2 className="text-3xl font-extrabold text-slate-600 text-center my-4">
        Your Projects
      </h2>
      <div className="w-3/4 h-full mx-auto">
        <div className="w-full h-[3.5rem] bg-gray-200 flex justify-evenly gap-3  text-center px-2 py-2  rounded-md">
          <button className="w-1/2 bg-white text-blue-500 hover:text-blue-500 font-semibold text-sm  rounded-md ">
            Tasks
          </button>
          <button className="w-1/2 text-gray-500 hover:text-blue-500 font-semibold text-sm rounded-md ">
            Files
          </button>
        </div>
        <div className="my-6 ">
          <div className="inline-flex items-center gap-3 ">
            <h3 className="text-3xl font-semibold">Tasks</h3>
            <PlusCircleIcon
              onClick={() => {
                setOpen(!open);
              }}
              className="w-[2.5rem] fill-slate-300 stroke-1 stroke-slate-500 hover:cursor-pointer"
            />
            <Modal
              Open={open}
              setOpen={setOpen}
              header={<div className=" inline text-white pt-1  ">New Task</div>}
              footer={
                <button
                  onClick={handleAddTask}
                  className="bg-blue-600 px-2 py-2 font-semibold rounded text-white"
                >
                  Create Task
                </button>
              }
            >
              <div className="w-full p-4  ">
                <p className="font-semibold ">Task Blocks</p>
                <div className="flex items-center justify-between mt-3">
                  <label htmlFor="taskBlock " className="mt-0">
                    Block
                  </label>
                  <select
                    ref={selectedBlock}
                    className="p-1 w-3/4 outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 rounded-md border text-slate-400"
                    name="taskBlock"
                    id="taskBlock"
                  >
                    <option className="text-black bg-slate-100" value="select">
                      Select block
                    </option>
                    <option
                      className="text-black bg-slate-100"
                      value="evalution"
                    >
                      Evalution
                    </option>
                    <option
                      className="text-black bg-slate-100"
                      value="ideation"
                    >
                      Ideation
                    </option>
                    <option className="text-black bg-slate-100" value="design">
                      Design
                    </option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="p-4">
                <p className="font-semibold">General Details</p>
                <div className="flex items-center justify-between mt-3 ">
                  <label htmlFor="name">Name</label>
                  <input
                    ref={EnteredName}
                    type="text"
                    name="name"
                    id="name"
                    className="border p-1 w-3/4 outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 rounded-md  "
                    placeholder="Task name"
                  />
                </div>

                <div className=" flex items-center justify-between mt-3 ">
                  <label htmlFor="description">Description</label>
                  <textarea
                    ref={EnteredDescription}
                    type="text"
                    name="description"
                    id="description"
                    className="border p-2 w-3/4 outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 focus:blue rounded-md  "
                    placeholder="Task description"
                  />
                </div>
              </div>
              <hr />
              <div className="p-4">
                <p className="font-semibold">Timeline</p>
                <div className="flex items-center justify-between mt-3">
                  <label
                    htmlFor="name"
                    className="mt-2 text-gray-500 font-sans"
                  >
                    Start Date
                  </label>
                  <input
                    ref={EnteredStartDate}
                    className="border ml-4 mt-4 bg-gray-200 w-3/4 p-1 text-gray-700 rounded-md outline-none ring-1 ring-transparent  focus:ring-blue-500"
                    type="date"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <label
                    htmlFor="name"
                    className="mt-2 text-gray-500 font-sans"
                  >
                    Due Date
                  </label>
                  <input
                    ref={EnteredEndDate}
                    className="border ml-4 mt-4 bg-gray-200 w-3/4 p-1  text-gray-700 rounded-md outline-none ring-1 ring-transparent  focus:ring-blue-500"
                    type="date"
                    name="name"
                    id="name"
                  />
                </div>
              </div>
            </Modal>
          </div>
          <input
            type="text"
            className="float-right mt-1 rounded-full w-1/3 px-6 py-[0.4rem] border outline-none  ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 "
            placeholder="Filter tasks "
            onChange={(e) => changeInput(e.target.value)}
            value={query}
          />
        </div>
        <div className="w-full">
          <div className="w-full h-full flex flex-col gap-3 ">
            <div className="bg-gray-200 w-full h-full rounded-lg">
              <div className="px-4 pt-4 text-lg text-gray-700 font-semibold ">
                {"Evalution"}
              </div>
              {console.log(tasks.evalution.length)}
              {tasks.evalution.length > 0 ? (
                tasks.evalution
                  .filter((val) =>
                    val.taskName.toLowerCase().includes(`${query}`)
                  )
                  .map((val) => (
                    <Lists
                      key={val.taskID}
                      taskID={val.taskID}
                      listName={val.taskName}
                      Days={val.remainingDays}
                      remainingTasks={val.remainingTask}
                      totalTasks={val.totalTask}
                      block="Evalution"
                      actions={actions}
                    />
                  ))
              ) : (
                <div className=" py-6 rounded-lg bg-slate-200 text-center font-mono text-slate-500 font-semibold ">
                  not
                </div>
              )}
            </div>
            <div className="bg-gray-200 w-full h-full rounded-lg">
              <div className="px-4 pt-4 text-lg text-gray-700 font-semibold ">
                {"Ideation"}
              </div>
              {tasks.ideation
                .filter((val) =>
                  val.taskName.toLowerCase().includes(`${query}`)
                )
                .map((val) => (
                  <Lists
                    key={val.taskID}
                    taskID={val.taskID}
                    listName={val.taskName}
                    Days={val.remainingDays}
                    remainingTasks={val.remainingTask}
                    totalTasks={val.totalTask}
                    block="Ideation"
                    actions={actions}
                  />
                ))}
            </div>
            <div className="bg-gray-200 w-full h-full rounded-lg mb-8">
              <div className="px-4 pt-4 text-lg text-gray-700 font-semibold ">
                {"Design"}
              </div>
              {tasks.design
                .filter((val) =>
                  val.taskName.toLowerCase().includes(`${query}`)
                )
                .map((val) => (
                  <Lists
                    taskID={val.taskID}
                    key={val.taskID}
                    listName={val.taskName}
                    Days={val.remainingDays}
                    remainingTasks={val.remainingTask}
                    totalTasks={val.totalTask}
                    block="Design"
                    actions={actions}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
