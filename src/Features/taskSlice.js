import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  evalution: [
    {
      taskID: 1,
      taskName: "Frontend",
      taskDescription: " Frontend Projects",
      taskStartDate: "24/2/4",
      taskEndDate: "24/2/5",
      taskImg: "https://picsum.photos/90/90",
      remainingTask: 1,
      totalTask: 4,
      remainingDays: 1,
    },
    {
      taskID: 2,
      taskName: "Backend",
      taskDescription: " Backend Projects",
      taskStartDate: "24/2/5",
      taskEndDate: "24/2/6",
      img: "https://picsum.photos/90/90",
      remainingTask: 2,
      totalTask: 4,
      remainingDays: 2,
    },
  ],
  ideation: [
    {
      taskID: 1,
      taskName: "Frontend ideation",
      taskDescription: " Frontend Projects",
      taskStartDate: "24/2/4",
      taskEndDate: "24/2/5",
      taskImg: "https://picsum.photos/90/90",
      remainingTask: 1,
      totalTask: 2,
      remainingDays: 2,
    },
    {
      taskID: 2,
      taskName: "Backend ideation",
      taskDescription: " Backend Projects",
      taskStartDate: "24/2/5",
      taskEndDate: "24/2/6",
      img: "https://picsum.photos/90/90",
      remainingTask: 2,
      totalTask: 8,
      remainingDays: 2,
    },
  ],
  design: [
    {
      taskID: 1,
      taskName: "Design Frontend ",
      taskDescription: " Frontend Projects",
      taskStartDate: "24/2/4",
      taskEndDate: "24/2/5",
      taskImg: "https://picsum.photos/90/90",
      remainingTask: 4,
      totalTask: 4,
      remainingDays: 2,
    },
    {
      taskID: 2,
      taskName: "Design Backend ",
      taskDescription: " Backend Projects",
      taskStartDate: "24/2/5",
      taskEndDate: "24/2/6",
      img: "https://picsum.photos/90/90",
      remainingTask: 3,
      totalTask: 4,
      remainingDays: 2,
    },
  ],
};

export const taskSlice = createSlice({
  name: "Task",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      switch (action.payload.taskSelectedBlock) {
        case "ideation":
          state.ideation.push(action.payload);
          break;

        case "evalution":
          state.evalution.push(action.payload);
          break;

        case "design":
          state.design.push(action.payload);
          break;
      }
      return state;
    },
    removeTask: (state, action) => {
      let ideation, evalution, design;
      switch (action.payload.block) {
        case "Ideation":
          evalution = state.evalution;
          design = state.design;
          state = state.ideation.filter(
            (val) => val.taskID !== action.payload.taskID
          );
          return { ideation: state, evalution: evalution, design: design };

        case "Evalution":
          ideation = state.ideation;
          design = state.design;
          state = state.evalution.filter(
            (val) => val.taskID !== action.payload.taskID
          );
          return { evalution: state, ideation: ideation, design: design };

        case "Design":
          ideation = state.ideation;
          evalution = state.evalution;
          state = state.design.filter(
            (val) => val.taskID !== action.payload.taskID
          );
          return { design: state, evalution: evalution, ideation: ideation };
      }

      return state;
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
