import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../Features/projectSlice";
import taskReducer from "../Features/taskSlice";
import singleReducer from "../Features/singleTasksSlice";
import kanbanReducer from "../Features/kanbanBoardSlice";

export default configureStore({
  reducer: {
    Project: projectReducer,
    Task: taskReducer,
    SingleTask: singleReducer,
    KanbanBoard:kanbanReducer
  },
});
