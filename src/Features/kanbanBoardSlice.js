import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [
    {
      id: 1,
      task: "This is from First Block ID:1",
      status: "todo",
    },
    {
      id: 2,
      task: "This is from First Block ID:2",
      status: "todo",
    },
  ],
  backlog: [
    {
      id: 3,
      task: "This is from First Block ID:3",
      status: "backlog",
    },
    {
      id: 4,
      task: "This is from First Block ID:4",
      status: "backlog",
    },
  ],
  done: [
    {
      id: 5,
      task: "This is from First Block ID:5",
      status: "done",
    },
    {
      id: 6,
      task: "This is from First Block ID:6",
      status: "done",
    },
  ],
};
const kanban = createSlice({
  name: "KanbanBoard",
  initialState: initialState,
  reducers: {},
});
export const { addProject, removeProject, filterProject } = kanban.actions;
export default kanban.reducer;
