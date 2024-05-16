import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../Components/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSingleTask,
  removeSingleTask,
  taskChecked,
  createNote,
  orderSingleTaskList,
} from "../Features/singleTasksSlice";
import Notes from "../Components/Notes";

function SingleTask() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    id: "",
    checked: false,
  });
  const [active, setActive] = useState("");
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const singleTasks = useSelector((state) => state.SingleTask);
  const dispatch = useDispatch();

  //*****************Drag and Drop*****************

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, newIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    let newList = [...singleTasks.tasks];
    const [draggedItem] = newList.splice(draggedIndex, 1);
    newList.splice(newIndex, 0, draggedItem);
    dispatch(orderSingleTaskList(newList));
  };
  //***************** Handling SingleTask Here *****************

  const handleDeleteList = (id) => {
    dispatch(removeSingleTask(id));
  };
  const handleCheckBox = (id, checked) => {
    dispatch(taskChecked({ id, checked }));
  };

  const handleSingleTaskChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const taskWithId = { ...formData, id: Date.now() };
  const handleCreateSingleTask = (e) => {
    e.preventDefault();
    dispatch(createSingleTask(taskWithId));
  };

  //***************** Handling Notes Here *****************
  const handleNoteChange = (e) => {
    const { value, name } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const noteWithId = { ...noteData, id: Date.now() };

  const handleCreateNote = (e) => {
    e.preventDefault();
    dispatch(createNote(noteWithId));
  };
  return (
    <section className="w-full bg-gray-50 overflow-x-hidden ">
      <h2 className="text-3xl font-extrabold text-slate-600 text-center my-4">
        Single Tasks
      </h2>
      <div className="w-3/4 mx-auto mb-8 ">
        <div className="w-full h-[3.5rem] bg-gray-200 flex justify-evenly gap-3  text-center px-2 py-2  rounded-md">
          <button className="w-1/2 bg-white text-blue-500 hover:text-blue-500 font-semibold text-sm  rounded-md ">
            Tasks
          </button>
          <button className="w-1/2 text-gray-500 hover:text-blue-500 font-semibold text-sm rounded-md ">
            Files
          </button>
        </div>
        <div className="my-6 flex justify-between">
          <div className="flex items-center gap-3 ">
            <h3 className="text-3xl font-semibold ">Checklist</h3>
            <PlusCircleIcon
              onClick={() => {
                setOpen(!open);
              }}
              className="w-[2.5rem] fill-slate-300 stroke-1 stroke-slate-500 hover:cursor-pointer"
            />
            <Modal
              Open={open}
              setOpen={setOpen}
              height={100}
              header={
                <div className=" inline text-white pt-1  ">New Checklist</div>
              }
              footer={
                <button
                  onClick={handleCreateSingleTask}
                  className="bg-blue-600 px-2 py-2 font-semibold rounded text-white"
                >
                  Create List
                </button>
              }
            >
              <div className="p-4">
                <p className="font-semibold text-slate-500">Check List</p>
                <div className=" flex   flex-col  mt-3 ">
                  <label
                    htmlFor="description"
                    className="text-lg text-slate-800 font-semibold mb-4"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    className="border p-2 w-full h-[8rem] outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 focus:blue rounded-md  "
                    placeholder="List description"
                    onChange={handleSingleTaskChange}
                  />
                </div>
              </div>
              <hr />
            </Modal>
          </div>
          <input
            type="text"
            className="float-right mt-1 rounded-full w-1/3 px-6 py-[0.4rem] border outline-none  ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 "
            placeholder="Filter checklist"
          />
        </div>
        <div className="w-full">
          <div className="w-full h-full flex flex-col gap-3 ">
            <p className=" text-center text-sm text-slate-400 font-mono animate-pulse  ">
              {singleTasks.tasks.length > 0
                ? "Try To Drag and Drop "
                : "Create checklist "}
              📃
            </p>
            {singleTasks.tasks.map((singleTask, idx) => (
              <div
                key={singleTask.id}
                className={`w-full flex justify-between bg-slate-100 py-3 rounded px-4 hover:cursor-grab border wrap `}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, idx)}
              >
                <div className="flex gap-10 ">
                  <input
                    className="w-4"
                    type="checkbox"
                    onChange={() =>
                      handleCheckBox(singleTask.id, singleTask.checked)
                    }
                  />
                  <p
                    className={` font-semibold ${
                      singleTask.checked ? "line-through bg-purple-600/30 transition ease-linear text-slate-700 " : "  "
                    }`}
                  >
                    {singleTask.description}
                  </p>
                </div>
                <div
                  onClick={() => handleDeleteList(singleTask.id)}
                  className="w-7 h-7 p-1 bg-red-500 hover:bg-red-600 shadow-neutral-600 shadow-sm rounded-md hover:cursor-pointer"
                >
                  <TrashIcon className="stroke-1 stroke-white " />
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="mt-10">
          <div className="inline-flex items-center gap-3 ">
            <h1 className="text-3xl font-semibold">Notes</h1>
            <PlusCircleIcon
              onClick={() => {
                setShow(!show);
              }}
              className="w-[2.5rem] fill-slate-300 stroke-1 stroke-slate-500 hover:cursor-pointer"
            />
            <Modal
              Open={show}
              setOpen={setShow}
              height={"5rem"}
              header={<div className=" inline text-white pt-1">New Note</div>}
              footer={
                <button
                  onClick={handleCreateNote}
                  className="bg-blue-600  px-2 py-2 font-semibold rounded text-white"
                >
                  Create Note
                </button>
              }
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-8 ">
                  <label  htmlFor="title" className="text-slate-600 font-semibold ">
                    Title
                  </label>
                  <input
                    onChange={handleNoteChange}
                    type="text"
                    name="title"
                    id="title"
                    className="border px-1 py-[0.4rem]  w-3/4 outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 rounded-md  "
                    placeholder="Note title "
                  />
                </div>

                <div className=" flex  justify-between mt-3 ">
                  <label className="text-slate-600 font-semibold" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    onChange={handleNoteChange}
                    type="text"
                    name="description"
                    id="description"
                    className="border p-2 w-3/4 h-[8rem] outline-none ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 focus:blue rounded-md  "
                    placeholder="Note description"
                  />
                </div>
              </div>
            </Modal>
          </div>
          <input
            type="text"
            className="float-right mt-1 rounded-full w-1/3 px-6 py-[0.4rem] border outline-none  ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 "
            placeholder="Filter Notes "
          />
          {singleTasks.notes.map((note) => (
            <Notes note={note} key={note.id}/>
          ))}
        </section>
      </div>
    </section>
  );
}

export default SingleTask;
