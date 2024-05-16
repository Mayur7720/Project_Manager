import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      description: "Create boards in Matboard",
      id: 1,
      checked: false,
    },
    {
      description: "Invite team to boards",
      id: 2,
      checked: false,
    },
    {
      description: "Identify three distinct aesthetic styles for boards",
      id: 3,
      checked: false,
    },
  ],
  notes: [
    {
      title: "Title 1",
      id: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dicta perferendis, sint voluptatum molestiae fugiat atque voluptates magni temporibus numquam unde error tenetur nulla.Voluptates vel dignissimos eum vero modi quod pariatur, tenetur id.",
    },
    {
      title: "Title 2",
      id: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dicta perferendis, sint voluptatum molestiae fugiat atque voluptates magni temporibus numquam unde error tenetur nulla.Voluptates vel dignissimos eum vero modi quod pariatur, tenetur id.",
    },
    {
      title: "Title 3",
      id: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dicta perferendis, sint voluptatum molestiae fugiat atque voluptates magni temporibus numquam unde error tenetur nulla.Voluptates vel dignissimos eum vero modi quod pariatur, tenetur id.",
    },
  ],
};

export const singleTaskSlice = createSlice({
  name: "SingleTask",
  initialState: initialState,
  reducers: {
    createSingleTask: (state, action) => {
      state = state.tasks.push(action.payload);
    },
    removeSingleTask: (state, action) => {
      let notes = state.notes;
      state = state.tasks.filter((task) => task.id !== action.payload);
      return { tasks: state, notes: notes };
    },
    orderSingleTaskList: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    },
    taskChecked: (state, action) => {
      const notes = state.notes;
      state = state.tasks.map((task) =>
        task.id === action.payload.id
          ? action.payload.checked === true
            ? { ...task, checked: false }
            : { ...task, checked: true }
          : task
      );
      return { tasks: state, notes: notes };
    },
    createNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action) => {
      let tasks = state.tasks;
      state = state.notes.filter((note) => note.id !== action.payload);
      return { notes: state, tasks: tasks };
    },
  },
});

export const {
  createSingleTask,
  removeSingleTask,
  taskChecked,
  createNote,
  removeNote,
  orderSingleTaskList,
} = singleTaskSlice.actions;
export default singleTaskSlice.reducer;
